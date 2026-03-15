import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden">
      {/* Background with Generated Asset */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="/assets/hero-bg.png" 
          alt="Premium Fashion Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary-dark text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
            Bộ sưu tập Mùa Xuân 2026
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-primary leading-[1.1] mb-6 tracking-tight">
            Nâng Tầm <br /> 
            <span className="text-secondary">Phong Cách</span> <br /> 
            Của Bạn
          </h1>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
            Khám phá sự giao thoa giữa nghệ thuật và thời trang. Những thiết kế độc bản giúp bạn tự tin tỏa sáng mỗi ngày.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-primary-light transition-all shadow-2xl shadow-primary/30 group">
              Mua ngay <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 border-2 border-slate-200 bg-white/50 backdrop-blur-sm text-primary px-10 py-5 rounded-2xl font-bold hover:border-primary transition-all">
              Xem Catalog
            </button>
          </div>

          <div className="mt-16 flex items-center gap-10">
            <div>
              <p className="text-3xl font-black text-primary">50k+</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Khách hàng</p>
            </div>
            <div className="h-12 w-px bg-slate-200"></div>
            <div>
              <p className="text-3xl font-black text-primary">4.9/5</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Đánh giá</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
