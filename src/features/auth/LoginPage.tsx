import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, AlertCircle, Eye, EyeOff, Landmark, ShieldCheck } from 'lucide-react';
import { login } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/error';

const schema = z.object({
  userId:   z.string().min(1, 'User ID is required').max(50),
  password: z.string().min(1, 'Password is required').max(30),
});

type FormValues = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login: storeLogin } = useAuthStore();
  const [serverError,  setServerError]  = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    try {
      const res = await login(values);
      storeLogin(res.token, res.userId);
      navigate('/dashboard');
    } catch (err) {
      setServerError(getErrorMessage(err, 'Invalid credentials. Please try again.'));
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">

      {/* ── Grid line pattern ── */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden>
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* ── Ambient glow orbs ── */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-blue-700/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[100px]" />

      {/* ── Login card ── */}
      <div className="relative z-10 w-full max-w-sm">

        {/* Outer glow ring */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/30 via-transparent to-blue-500/30 blur-sm" />

        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-2xl backdrop-blur-2xl">

          {/* Logo */}
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/80 to-blue-600/80 shadow-lg shadow-brand-500/20">
              <Landmark className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              SMART Collection System
            </h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Revenue Management Platform
            </p>
          </div>

          {/* Divider */}
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-[10px] text-white/20">SECURE LOGIN</span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>

            {/* User ID */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                User ID
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  placeholder="Enter your user ID"
                  autoFocus
                  autoComplete="username"
                  className={[
                    'w-full rounded-xl border bg-white/[0.05] py-3 pl-10 pr-4 text-sm text-white placeholder-white/20',
                    'transition-all duration-150 focus:outline-none focus:ring-2',
                    errors.userId
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                      : 'border-white/[0.08] focus:border-brand-500/60 focus:ring-brand-500/20 hover:border-white/15',
                  ].join(' ')}
                  {...register('userId')}
                />
              </div>
              {errors.userId && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.userId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={[
                    'w-full rounded-xl border bg-white/[0.05] py-3 pl-10 pr-11 text-sm text-white placeholder-white/20',
                    'transition-all duration-150 focus:outline-none focus:ring-2',
                    errors.password
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                      : 'border-white/[0.08] focus:border-brand-500/60 focus:ring-brand-500/20 hover:border-white/15',
                  ].join(' ')}
                  {...register('password')}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-400 transition-colors hover:text-brand-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={[
                'relative mt-2 w-full overflow-hidden rounded-xl px-4 py-3 text-sm font-semibold text-white',
                'bg-gradient-to-r from-brand-600 to-blue-500',
                'shadow-lg shadow-brand-500/25',
                'transition-all duration-200 hover:shadow-brand-500/40 hover:brightness-110',
                'active:scale-[0.98]',
                'disabled:cursor-not-allowed disabled:opacity-60',
              ].join(' ')}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-white/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secured with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
