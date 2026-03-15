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
    <section className="relative h-[85vh] flex items-center overflow-hidden">
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
            className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary-dark text-xs font-bold rounded-full mb-6 uppercase tracking-widest"
          >
            Bộ sưu tập Mùa Xuân 2026
          </motion.span>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black text-primary leading-[1.1] mb-6 tracking-tight"
          >
            Nâng Tầm <br /> 
            <span className="text-secondary">Phong Cách</span> <br /> 
            Của Bạn
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 text-lg mb-10 leading-relaxed font-medium"
          >
            Khám phá sự giao thoa giữa nghệ thuật và thời trang. Những thiết kế độc bản giúp bạn tự tin tỏa sáng mỗi ngày.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-primary-light transition-all shadow-2xl shadow-primary/30 group">
              Mua ngay <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 border-2 border-slate-200 bg-white/50 backdrop-blur-sm text-primary px-10 py-5 rounded-2xl font-bold hover:border-primary transition-all">
              Xem Catalog
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 flex items-center gap-10">
            <div>
              <p className="text-3xl font-black text-primary">50k+</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Khách hàng</p>
            </div>
            <div className="h-12 w-px bg-slate-200"></div>
            <div>
              <p className="text-3xl font-black text-primary">4.9/5</p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Đánh giá</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
