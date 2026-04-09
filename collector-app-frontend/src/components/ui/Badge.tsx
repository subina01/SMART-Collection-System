interface BadgeProps {
  active: boolean;
}

const Badge = ({ active }: BadgeProps) => (
  <span
    className={[
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
      active
        ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
        : 'bg-slate-700 text-gray-400 ring-1 ring-slate-600',
    ].join(' ')}
  >
    <span className={['h-1.5 w-1.5 rounded-full', active ? 'bg-emerald-400' : 'bg-gray-500'].join(' ')} />
    {active ? 'Active' : 'Inactive'}
  </span>
);

export default Badge;
