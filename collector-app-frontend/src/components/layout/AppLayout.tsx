import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AppLayout = () => (
  <div className="flex h-screen overflow-hidden bg-slate-950">
    {/* Subtle global grid */}
    <svg className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.025]" aria-hidden>
      <defs>
        <pattern id="app-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#app-grid)" />
    </svg>

    {/* Ambient glow */}
    <div className="pointer-events-none fixed -top-60 -left-60 z-0 h-[32rem] w-[32rem] rounded-full bg-brand-600/10 blur-[140px]" />
    <div className="pointer-events-none fixed -bottom-60 -right-40 z-0 h-[40rem] w-[40rem] rounded-full bg-blue-700/10 blur-[160px]" />

    <Sidebar />
    <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
      <Topbar />
      <main className="flex-1 overflow-y-auto p-7">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-7 py-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold tracking-wide text-gray-500">Iconsoft</span>
          <span>© 2026 &nbsp;·&nbsp; Powered by <span className="text-gray-400 font-medium">Overt Intl Pvt. Ltd.</span></span>
        </div>
      </footer>
    </div>
  </div>
);

export default AppLayout;
