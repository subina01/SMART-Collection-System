import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  accent: string;
  icon: string;
  children: ReactNode;
}

const FormSection = ({ title, accent, icon, children }: FormSectionProps) => (
  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
    <div className={`border-l-4 ${accent} flex items-center gap-2.5 border-b border-slate-800 bg-slate-800/50 px-6 py-4`}>
      <span className="text-lg">{icon}</span>
      <h2 className="text-sm font-semibold text-gray-300">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default FormSection;
