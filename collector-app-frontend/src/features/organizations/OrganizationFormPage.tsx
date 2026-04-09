import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, ArrowLeft } from 'lucide-react';
import {
  getOrganizationById,
  createOrganization,
  updateOrganization,
  generateCredentials,
} from '@/api/organization.api';
import { getErrorMessage } from '@/utils/error';
import { getDatabases } from '@/api/system.api';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import FormSection from '@/components/ui/FormSection';
import PageLoader from '@/components/ui/PageLoader';

// ---------------------------------------------------------------------------
const schema = z.object({
  orgName:     z.string().min(1, 'Organization name is required').max(200),
  dbName:      z.string().min(1, 'Database name is required').max(60),
  palika:      z.string().max(100).optional().or(z.literal('')),
  wardNo:      z.coerce.number().int().positive().optional().or(z.literal('')),
  telNo:       z.string().regex(/^\d*$/, 'Only digits allowed').max(30).optional().or(z.literal('')),
  mobile:      z.string().regex(/^9[78]\d{8}$/, 'Must be a valid 10-digit mobile number (e.g. 9845070829)').optional().or(z.literal('')),
  email:       z.string().email('Invalid email').max(45).optional().or(z.literal('')),
  qty:         z.coerce.number().int().positive().optional().or(z.literal('')),
  orgCode:     z.string().min(1, 'OrgCode is required').max(30),
  orgPassword: z.string().min(1, 'Password is required').max(30),
  active:      z.boolean(),
});

type FormValues = z.infer<typeof schema>;

// ---------------------------------------------------------------------------
const OrganizationFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const orgId  = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();

  const [loadError,   setLoadError]   = useState('');
  const [serverError, setServerError] = useState('');
  const [loading,     setLoading]     = useState(isEdit);
  const [generating,  setGenerating]  = useState(false);
  const [databases,   setDatabases]   = useState<string[]>([]);
  const [dbLoading,   setDbLoading]   = useState(true);

  const {
    register, handleSubmit, setValue, watch, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { active: true },
  });

  const orgName     = watch('orgName');
  const orgCode     = watch('orgCode');
  const orgPassword = watch('orgPassword');

  useEffect(() => {
    getDatabases()
      .then(setDatabases)
      .catch(() => {})
      .finally(() => setDbLoading(false));
  }, []);

  useEffect(() => {
    if (!isEdit || !orgId) return;
    setLoading(true);
    getOrganizationById(orgId)
      .then((org) => {
        reset({
          orgName: org.orgName, dbName: org.dbName,
          palika:  org.palika   ?? '', wardNo: org.wardNo ?? '',
          telNo:   org.telNo    ?? '', mobile: org.mobile ?? '',
          email:   org.email    ?? '', qty:    org.qty    ?? '',
          orgCode: org.orgCode, orgPassword: org.orgPassword,
          active:  org.active,
        });
      })
      .catch(() => setLoadError('Failed to load organization details.'))
      .finally(() => setLoading(false));
  }, [isEdit, orgId, reset]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const creds = await generateCredentials(orgName || 'ORG');
      setValue('orgCode',     creds.orgCode,     { shouldValidate: true });
      setValue('orgPassword', creds.orgPassword, { shouldValidate: true });
    } catch {
      // silently ignore — user can retry
    } finally {
      setGenerating(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    const payload = {
      orgName:     values.orgName,
      dbName:      values.dbName,
      palika:      values.palika  || undefined,
      wardNo:      values.wardNo  !== '' && values.wardNo  !== undefined ? Number(values.wardNo)  : undefined,
      telNo:       values.telNo   || undefined,
      mobile:      values.mobile  || undefined,
      email:       values.email   || undefined,
      qty:         values.qty     !== '' && values.qty !== undefined ? Number(values.qty) : undefined,
      orgCode:     values.orgCode,
      orgPassword: values.orgPassword,
      active:      values.active,
    };
    try {
      if (isEdit && orgId) await updateOrganization(orgId, payload);
      else                  await createOrganization(payload);
      navigate('/organizations');
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  if (loading)   return <PageLoader />;
  if (loadError) return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <p className="text-sm text-red-600">{loadError}</p>
      <Link to="/organizations"><Button variant="secondary" size="sm">Back to list</Button></Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <PageHeader
        title={isEdit ? 'Edit Organization' : 'New Organization'}
        subtitle={isEdit ? 'Update the details below and save.' : 'Fill in the details to register a new organization.'}
        action={
          <Link to="/organizations">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

        {/* Basic Information */}
        <FormSection title="Basic Information" accent="border-brand-500" icon="🏢">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Organization Name"
                placeholder="e.g. Hetauda Sahakari"
                required
                error={errors.orgName?.message}
                {...register('orgName')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Database Name <span className="text-red-400">*</span>
              </label>
              <select
                className={[
                  'w-full rounded-xl border bg-slate-800 px-3.5 py-2.5 text-sm text-gray-100',
                  'transition-all focus:outline-none focus:ring-2',
                  errors.dbName
                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-700 hover:border-slate-600 focus:border-brand-500 focus:ring-brand-500/20',
                ].join(' ')}
                {...register('dbName')}
              >
                <option value="" className="bg-slate-800">{dbLoading ? 'Loading databases…' : 'Select a database…'}</option>
                {databases.map((db) => <option key={db} value={db} className="bg-slate-800">{db}</option>)}
              </select>
              {errors.dbName && <p className="mt-1 text-xs text-red-400">{errors.dbName.message}</p>}
            </div>

            <Input label="Palika"  placeholder="e.g. Hetauda" error={errors.palika?.message}  {...register('palika')} />
            <Input label="Ward No" placeholder="e.g. 5" type="number" min={1} error={errors.wardNo?.message} {...register('wardNo')} />
          </div>
        </FormSection>

        {/* Contact Details */}
        <FormSection title="Contact Details" accent="border-emerald-500" icon="📞">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Telephone"
              placeholder="e.g. 014XXXXXXX"
              inputMode="numeric"
              maxLength={30}
              error={errors.telNo?.message}
              onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''); }}
              {...register('telNo')}
            />
            <Input
              label="Mobile"
              placeholder="e.g. 9845070829"
              inputMode="numeric"
              maxLength={10}
              error={errors.mobile?.message}
              onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ''); }}
              {...register('mobile')}
            />
            <div className="sm:col-span-2">
              <Input label="Email" type="email" placeholder="e.g. info@org.com" error={errors.email?.message} {...register('email')} />
            </div>
            <Input label="Quantity" type="number" placeholder="e.g. 100" min={1} error={errors.qty?.message} {...register('qty')} />
          </div>
        </FormSection>

        {/* Access & Code */}
        <FormSection title="Access & Code" accent="border-blue-500" icon="🔐">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Org Code */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Org Code <span className="text-red-400">*</span>
              </label>
              <input
                placeholder="e.g. HETAUDA"
                className={[
                  'w-full rounded-xl border bg-slate-800 px-3.5 py-2.5 font-mono text-sm text-gray-100 placeholder-gray-600',
                  'transition-all focus:outline-none focus:ring-2',
                  errors.orgCode
                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                    : orgCode
                      ? 'border-brand-500/50 focus:border-brand-500 focus:ring-brand-500/20'
                      : 'border-slate-700 hover:border-slate-600 focus:border-brand-500 focus:ring-brand-500/20',
                ].join(' ')}
                {...register('orgCode')}
              />
              {errors.orgCode && <p className="mt-1 text-xs text-red-400">{errors.orgCode.message}</p>}
            </div>

            {/* Org Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">
                Org Password <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ab3Xy9"
                className={[
                  'w-full rounded-xl border bg-slate-800 px-3.5 py-2.5 font-mono text-sm text-gray-100 placeholder-gray-600',
                  'transition-all focus:outline-none focus:ring-2',
                  errors.orgPassword
                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                    : orgPassword
                      ? 'border-blue-500/50 focus:border-blue-500 focus:ring-blue-500/20'
                      : 'border-slate-700 hover:border-slate-600 focus:border-brand-500 focus:ring-brand-500/20',
                ].join(' ')}
                {...register('orgPassword')}
              />
              {errors.orgPassword && <p className="mt-1 text-xs text-red-400">{errors.orgPassword.message}</p>}
            </div>

            {/* Generate button */}
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-brand-500/30 bg-gradient-to-r from-brand-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-all duration-150 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                {generating ? 'Generating…' : 'Generate Org Code & Password'}
              </button>
              <p className="mt-2 text-center text-xs text-white/20">
                Auto-fills code from org name · checks DB for uniqueness · random 6-char password
              </p>
            </div>

            {/* Active toggle */}
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 transition-colors hover:bg-slate-800">
                <input
                  id="active"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-brand-500 focus:ring-brand-500/30"
                  {...register('active')}
                />
                <div>
                  <p className="text-sm font-medium text-gray-200">Active organization</p>
                  <p className="text-xs text-gray-500">Inactive organizations are hidden from collectors</p>
                </div>
              </label>
            </div>
          </div>
        </FormSection>

        {/* Server error */}
        {serverError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <span className="mt-0.5 flex-shrink-0">⚠️</span>
            {serverError}
          </div>
        )}

        {/* Action bar */}
        <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
          <Link to="/organizations">
            <Button variant="secondary" type="button">Cancel</Button>
          </Link>
          <Button type="submit" loading={isSubmitting}>
            {isEdit ? 'Save Changes' : 'Create Organization'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationFormPage;
