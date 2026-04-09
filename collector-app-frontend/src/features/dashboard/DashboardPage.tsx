import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { getOrganizations } from '@/api/organization.api';
import { useAuthStore } from '@/store/auth.store';
import Button from '@/components/ui/Button';

const DashboardPage = () => {
  const userId = useAuthStore((s) => s.userId);
  const [orgCount,      setOrgCount]      = useState<number | null>(null);
  const [activeCount,   setActiveCount]   = useState<number | null>(null);
  const [inactiveCount, setInactiveCount] = useState<number | null>(null);

  useEffect(() => {
    getOrganizations()
      .then((orgs) => {
        const active = orgs.filter((o) => o.active).length;
        setOrgCount(orgs.length);
        setActiveCount(active);
        setInactiveCount(orgs.length - active);
      })
      .catch(() => { setOrgCount(0); setActiveCount(0); setInactiveCount(0); });
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8">

      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-blue-700 p-7 text-white shadow-lg shadow-brand-500/20">
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-white/5 blur-xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">{greeting} 👋</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">{userId ?? 'User'}</h1>
            <p className="mt-1 text-sm text-white/60">
              Here's what's happening with your organizations today.
            </p>
          </div>
          <Link to="/organizations/new">
            <Button size="sm" className="!bg-white/20 hover:!bg-white/30 border border-white/30 !shadow-none backdrop-blur-sm">
              <Plus className="h-4 w-4" />
              New Organization
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard color="brand"   icon={<Building2   className="h-5 w-5" />} label="Total Organizations" value={orgCount}      />
        <StatCard color="emerald" icon={<TrendingUp  className="h-5 w-5" />} label="Active"              value={activeCount}   />
        <StatCard color="amber"   icon={<TrendingDown className="h-5 w-5" />} label="Inactive"            value={inactiveCount} />
      </div>

      {/* Quick actions */}
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">Quick Actions</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard to="/organizations"     emoji="🏢" label="View Organizations" description="Browse and manage all organizations" accent="brand"   />
          <QuickActionCard to="/organizations/new" emoji="➕" label="Add Organization"   description="Register a new organization record"  accent="emerald" />
        </div>
      </div>
    </div>
  );
};

// ── Sub-components ───────────────────────────────────────────────────────────

const colorMap = {
  brand:   { glow: 'bg-brand-500/10',   border: 'border-brand-500/20',   icon: 'bg-brand-500/15 text-brand-400',    num: 'text-white' },
  emerald: { glow: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'bg-emerald-500/15 text-emerald-400', num: 'text-white' },
  amber:   { glow: 'bg-amber-500/10',   border: 'border-amber-500/20',   icon: 'bg-amber-500/15 text-amber-400',    num: 'text-white' },
};

const StatCard = ({ color, icon, label, value }: { color: keyof typeof colorMap; icon: ReactNode; label: string; value: number | null }) => {
  const c = colorMap[color];
  return (
    <div className={`relative overflow-hidden rounded-xl border ${c.border} bg-slate-900 px-5 py-4`}>
      <div className={`absolute -top-4 -right-4 h-16 w-16 rounded-full ${c.glow} blur-xl`} />
      <div className="relative flex items-center gap-4">
        <div className={`flex-shrink-0 rounded-lg p-2 ${c.icon}`}>{icon}</div>
        <div>
          <p className={`text-2xl font-bold ${c.num}`}>
            {value === null
              ? <span className="inline-block h-7 w-8 animate-pulse rounded bg-slate-700" />
              : value}
          </p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
};

const accentMap = { brand: 'bg-brand-500/10 text-brand-400', emerald: 'bg-emerald-500/10 text-emerald-400' };

const QuickActionCard = ({ to, emoji, label, description, accent }: { to: string; emoji: string; label: string; description: string; accent: keyof typeof accentMap }) => (
  <Link
    to={to}
    className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800"
  >
    <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xl ${accentMap[accent]}`}>
      {emoji}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-100">{label}</p>
      <p className="mt-0.5 text-xs text-gray-500 truncate">{description}</p>
    </div>
    <ArrowRight className="h-4 w-4 text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-brand-400" />
  </Link>
);

export default DashboardPage;
