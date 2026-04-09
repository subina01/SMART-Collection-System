import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { getInitials } from '@/utils/avatar';

const Topbar = () => {
  const { userId, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div />
      <div className="flex items-center gap-3">
        {/* User chip */}
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-blue-500 text-xs font-bold text-white shadow-sm shadow-brand-500/30">
            {getInitials(userId ?? 'U')}
          </div>
          <span className="text-sm font-medium text-gray-300">{userId}</span>
        </div>

        <div className="h-5 w-px bg-slate-700" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-gray-500 transition-all duration-150 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
