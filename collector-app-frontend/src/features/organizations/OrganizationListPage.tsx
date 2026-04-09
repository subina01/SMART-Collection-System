import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Building2, X, Eye } from 'lucide-react';
import { getOrganizations, deleteOrganization } from '@/api/organization.api';
import type { OrganizationListItem } from '@/types/organization.types';
import { getInitials, getAvatarColor } from '@/utils/avatar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

const OrganizationListPage = () => {
  const navigate = useNavigate();
  const [orgs,     setOrgs]     = useState<OrganizationListItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [search,   setSearch]   = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchOrgs = () => {
    setLoading(true);
    setError('');
    getOrganizations()
      .then(setOrgs)
      .catch(() => setError('Failed to load organizations.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrgs(); }, []);

  const filtered = (() => {
    if (!search) return orgs;
    const q = search.toLowerCase();

    const score = (o: OrganizationListItem) => {
      const name = o.orgName.toLowerCase();
      if (name.startsWith(q))      return 0;
      if (name.includes(q))        return 1;
      return                              2; // matched on email / palika / mobile
    };

    return orgs
      .filter((o) =>
        o.orgName.toLowerCase().includes(q) ||
        (o.email  ?? '').toLowerCase().includes(q) ||
        (o.palika ?? '').toLowerCase().includes(q) ||
        (o.mobile ?? '').includes(q)
      )
      .sort((a, b) => score(a) - score(b));
  })();

  const handleDelete = async (sn: number) => {
    if (!window.confirm('Are you sure you want to delete this organization?')) return;
    setDeleting(sn);
    try {
      await deleteOrganization(sn);
      setOrgs((prev) => prev.filter((o) => o.sn !== sn));
    } catch {
      alert('Failed to delete organization.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Organizations"
        subtitle="Manage all registered organizations."
        action={
          <Link to="/organizations/new">
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Organization
            </Button>
          </Link>
        }
      />

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email, mobile…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-10 text-sm text-gray-100 placeholder-gray-600 transition-all hover:border-slate-600 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        {loading ? (
          <SkeletonRows />
        ) : error ? (
          <EmptyState icon={<Building2 className="h-10 w-10 text-red-400/50" />} message={error}>
            <Button variant="secondary" size="sm" onClick={fetchOrgs}>Retry</Button>
          </EmptyState>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Building2 className="h-10 w-10 text-gray-600" />}
            message={search ? `No results for "${search}"` : 'No organizations yet'}
          >
            {search ? (
              <Button variant="secondary" size="sm" onClick={() => setSearch('')}>Clear Search</Button>
            ) : (
              <Link to="/organizations/new">
                <Button size="sm"><Plus className="h-4 w-4" />Add First Organization</Button>
              </Link>
            )}
          </EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/60 text-left">
                  {['SN', 'Organization', 'Email', 'Mobile', 'Phone', 'Status', ''].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 ${h === '' ? 'text-right' : ''}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((org) => (
                  <tr key={org.sn} className="group transition-colors hover:bg-slate-800/50">
                    <td className="px-5 py-4 text-xs font-medium text-gray-600">#{org.sn}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${getAvatarColor(org.orgName)}`}>
                          {getInitials(org.orgName)}
                        </div>
                        <span className="font-semibold text-gray-100">{org.orgName}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-400">{org.email  ?? '—'}</td>
                    <td className="px-5 py-4 text-gray-400">{org.mobile ?? '—'}</td>
                    <td className="px-5 py-4 text-gray-400">{org.telNo  ?? '—'}</td>

                    <td className="px-5 py-4">
                      <Badge active={org.active} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <ActionBtn title="View"   onClick={() => navigate(`/organizations/${org.sn}`)}        className="hover:bg-sky-500/10 hover:text-sky-400">
                          <Eye     className="h-4 w-4" />
                        </ActionBtn>
                        <ActionBtn title="Edit"   onClick={() => navigate(`/organizations/${org.sn}/edit`)}   className="hover:bg-brand-500/10 hover:text-brand-400">
                          <Pencil  className="h-4 w-4" />
                        </ActionBtn>
                        <ActionBtn title="Delete" onClick={() => handleDelete(org.sn)} disabled={deleting === org.sn} className="hover:bg-red-500/10 hover:text-red-400">
                          <Trash2  className="h-4 w-4" />
                        </ActionBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !error && filtered.length > 0 && (
        <p className="text-xs text-gray-600">
          Showing <span className="font-medium text-gray-400">{filtered.length}</span> of{' '}
          <span className="font-medium text-gray-400">{orgs.length}</span> organizations
        </p>
      )}
    </div>
  );
};

// ── Local sub-components ─────────────────────────────────────────────────────

interface ActionBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  children: ReactNode;
}

const ActionBtn = ({ children, className = '', ...props }: ActionBtnProps) => (
  <button
    className={`rounded-lg p-1.5 text-gray-600 transition-colors duration-150 disabled:opacity-40 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const SkeletonRows = () => (
  <div className="divide-y divide-slate-800">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 px-5 py-4">
        <div className="h-3 w-6 animate-pulse rounded bg-slate-700" />
        <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-700" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-40 animate-pulse rounded bg-slate-700" />
          <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800" />
        </div>
        <div className="h-5 w-16 animate-pulse rounded-full bg-slate-700" />
      </div>
    ))}
  </div>
);

export default OrganizationListPage;
