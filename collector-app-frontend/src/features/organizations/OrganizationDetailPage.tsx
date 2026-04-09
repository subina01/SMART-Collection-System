import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Building2, Eye, EyeOff } from 'lucide-react';
import { getOrganizationById } from '@/api/organization.api';
import type { OrganizationDetail } from '@/types/organization.types';
import { getInitials, getAvatarColor } from '@/utils/avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import PageLoader from '@/components/ui/PageLoader';

const OrganizationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const orgId = id ? parseInt(id, 10) : null;

  const [org,         setOrg]         = useState<OrganizationDetail | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!orgId) return;
    setLoading(true);
    getOrganizationById(orgId)
      .then(setOrg)
      .catch(() => setError('Failed to load organization details.'))
      .finally(() => setLoading(false));
  }, [orgId]);

  if (loading) return <PageLoader />;

  if (error || !org) return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-5">
        <Building2 className="h-10 w-10 text-gray-600" />
      </div>
      <p className="text-sm text-red-400">{error || 'Organization not found.'}</p>
      <Link to="/organizations"><Button variant="secondary" size="sm">Back to list</Button></Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl animate-fade-in space-y-5">
      <PageHeader
        title="Organization Details"
        subtitle="Read-only view of the organization record."
        action={
          <div className="flex items-center gap-2">
            <Link to="/organizations">
              <Button variant="secondary" size="sm"><ArrowLeft className="h-4 w-4" />Back</Button>
            </Link>
            <Button size="sm" onClick={() => navigate(`/organizations/${org.sn}/edit`)}>
              <Pencil className="h-4 w-4" />Edit
            </Button>
          </div>
        }
      />

      {/* Basic Info */}
      <Section accent="border-l-brand-500" icon="🏢" title="Basic Information">
        <div className="flex items-start gap-4 mb-6">
          <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white ${getAvatarColor(org.orgName)}`}>
            {getInitials(org.orgName)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{org.orgName}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              SN #{org.sn} · Registered {new Date(org.date).toLocaleDateString()}
            </p>
            <div className="mt-2"><Badge active={org.active} /></div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Database Name" value={org.dbName} mono />
          <Field label="Palika"        value={org.palika} />
          <Field label="Ward No"       value={org.wardNo?.toString()} />
          <Field label="Quantity"      value={org.qty?.toString()} />
        </div>
      </Section>

      {/* Contact */}
      <Section accent="border-l-emerald-500" icon="📞" title="Contact Details">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Email"       value={org.email} />
          <Field label="Mobile"      value={org.mobile} />
          <Field label="Phone (Tel)" value={org.telNo} />
        </div>
      </Section>

      {/* Access */}
      <Section accent="border-l-blue-500" icon="🔐" title="Access & Code">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Org Code" value={org.orgCode} mono />
          <div className="rounded-xl border border-slate-800 bg-slate-800/50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-600 mb-1">Org Password</p>
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-sm text-gray-200">
                {showPassword ? org.orgPassword : '••••••'}
              </p>
              <button
                onClick={() => setShowPassword((v) => !v)}
                className="text-gray-600 transition-colors hover:text-brand-400"
                title={showPassword ? 'Hide password' : 'Reveal password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

// ── Local sub-components ─────────────────────────────────────────────────────

const Section = ({ accent, icon, title, children }: { accent: string; icon: string; title: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
    <div className={`border-l-4 ${accent} flex items-center gap-2.5 border-b border-slate-800 bg-slate-800/50 px-6 py-4`}>
      <span className="text-lg">{icon}</span>
      <h2 className="text-sm font-semibold text-gray-300">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Field = ({ label, value, mono }: { label: string; value?: string | null; mono?: boolean }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-800/50 px-4 py-3">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-600 mb-1">{label}</p>
    <p className={`text-sm ${mono ? 'font-mono' : 'font-medium'} ${value ? 'text-gray-200' : 'italic text-gray-600'}`}>
      {value ?? 'Not set'}
    </p>
  </div>
);

export default OrganizationDetailPage;
