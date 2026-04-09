import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
  children?: ReactNode;
}

const EmptyState = ({ icon, message, children }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
    <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-5">{icon}</div>
    <p className="text-sm font-medium text-gray-500">{message}</p>
    {children}
  </div>
);

export default EmptyState;
