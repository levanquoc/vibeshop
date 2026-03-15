import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative h-[70vh] flex items-center overflow-hidden">
      {/* Background with Generated Asset */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <img 
          src="/assets/hero-bg.png" 
          alt="Premium Fashion Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
      </motion.div>

      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1 bg-secondary/10 text-secondary-dark text-[10px] font-bold rounded-full mb-4 uppercase tracking-widest"
          >
            Bộ sưu tập Mùa Xuân 2026
          </motion.span>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-primary leading-tight mb-4 tracking-tight"
          >
            Nâng Tầm <br /> 
            <span className="text-secondary">Phong Cách</span> <br /> 
            Của Bạn
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 text-base mb-8 leading-relaxed font-medium"
          >
            Khám phá sự giao thoa giữa nghệ thuật và thời trang. Những thiết kế độc bản giúp bạn tự tin tỏa sáng mỗi ngày.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-light transition-all shadow-xl shadow-primary/20 group text-sm">
              Mua ngay <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 border-2 border-slate-200 bg-white/50 backdrop-blur-sm text-primary px-8 py-4 rounded-2xl font-bold hover:border-primary transition-all text-sm">
              Xem Catalog
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-2xl font-black text-primary">50k+</p>
              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Khách hàng</p>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div>
              <p className="text-2xl font-black text-primary">4.9/5</p>
              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Đánh giá</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
