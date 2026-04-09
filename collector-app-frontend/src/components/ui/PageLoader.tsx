const PageLoader = () => (
  <div className="flex h-64 flex-col items-center justify-center gap-3">
    <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-500 border-t-transparent" />
    <p className="text-sm text-gray-500">Loading…</p>
  </div>
);

export default PageLoader;
