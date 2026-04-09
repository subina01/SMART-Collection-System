import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Landmark } from 'lucide-react';

const navItems = [
  { to: '/dashboard',     label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/organizations', label: 'Organizations', icon: Building2 },
];

const Sidebar = () => (
  <aside className="relative z-10 flex w-64 flex-col border-r border-white/[0.06] bg-slate-950">

    {/* Logo */}
    <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-5">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-blue-500 shadow-lg shadow-brand-500/20">
        <Landmark className="h-5 w-5 text-white" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-semibold leading-none text-white">SMART Collection</p>
        <p className="mt-0.5 text-[10px] text-white/30">Management Portal</p>
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
      <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/20">
        Menu
      </p>
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                : 'text-gray-400 hover:bg-slate-800 hover:text-white',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Footer */}
    <div className="border-t border-white/[0.06] px-4 py-3">
      <p className="text-center text-[10px] text-white/15">v0.1.0 · SMART Collection System</p>
    </div>
  </aside>
);

export default Sidebar;
