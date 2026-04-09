import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, rightSlot, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-300">
            {label}
            {props.required && <span className="ml-0.5 text-red-400">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full rounded-xl border bg-slate-800 px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-600',
              'transition-all duration-150 focus:outline-none focus:ring-2',
              icon ? 'pl-10' : '',
              rightSlot ? 'pr-10' : '',
              error
                ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                : 'border-slate-700 hover:border-slate-600 focus:border-brand-500 focus:ring-brand-500/20',
              className,
            ].join(' ')}
            {...props}
          />
          {rightSlot && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {rightSlot}
            </div>
          )}
        </div>
        {error && <p className="flex items-center gap-1 text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
