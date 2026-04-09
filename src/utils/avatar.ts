const COLORS = [
  'bg-blue-600',   'bg-blue-500',   'bg-sky-500',    'bg-emerald-500',
  'bg-amber-500',  'bg-slate-500',  'bg-cyan-500',   'bg-gray-500',
];

/** Returns 1–2 uppercase initials from a display name. */
export const getInitials = (name: string): string =>
  name
    .split(/[\s_-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

/** Returns a deterministic Tailwind bg-color class based on the first character. */
export const getAvatarColor = (name: string): string =>
  COLORS[name.charCodeAt(0) % COLORS.length];
