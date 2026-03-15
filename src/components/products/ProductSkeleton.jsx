const ProductSkeleton = () => {
  return (
    <div className="group animate-pulse">
      <div className="aspect-[3/4] bg-slate-200 rounded-[32px] mb-5 relative overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
      <div className="px-2">
        <div className="h-3 w-20 bg-slate-200 rounded mb-2"></div>
        <div className="h-5 w-full bg-slate-200 rounded mb-2"></div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
