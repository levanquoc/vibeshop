import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    title: 'Thời trang Nam',
    subtitle: 'Lịch lãm & Hiện đại',
    image: '/assets/cat-men.png',
    size: 'lg',
  },
  {
    id: 2,
    title: 'Thời trang Nữ',
    subtitle: 'Dịu dàng & Cá tính',
    image: '/assets/cat-women.png',
    size: 'sm',
  },
  {
    id: 3,
    title: 'Phụ kiện',
    subtitle: 'Hoàn hảo từng chi tiết',
    image: '/assets/cat-access.png',
    size: 'sm',
  }
];

const FeaturedCategories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-24 container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4"
      >
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
            Khám Phá <span className="text-secondary text-stroke-primary">Danh Mục</span>
          </h2>
          <p className="text-slate-500 font-medium">Lựa chọn phong cách phù hợp với cá tính của bạn từ những bộ sưu tập mới nhất.</p>
        </div>
        <button className="text-primary font-bold hover:text-secondary transition-colors underline decoration-2 underline-offset-8 uppercase tracking-widest text-xs">
          Xem tất cả danh mục
        </button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Large Category */}
        <div className="lg:col-span-1 h-[400px] md:h-[500px] lg:h-[700px]">
           <CategoryCard category={categories[0]} />
        </div>
        
        {/* Two Small Categories Stacked */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="h-[350px] md:h-[500px] lg:h-[700px]"><CategoryCard category={categories[1]} /></div>
           <div className="h-[350px] md:h-[500px] lg:h-[700px]"><CategoryCard category={categories[2]} /></div>
        </div>
      </motion.div>
    </section>
  );
};

const CategoryCard = ({ category }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
    }}
    className="group relative w-full h-full rounded-[40px] overflow-hidden cursor-pointer shadow-2xl shadow-slate-200"
  >
    <img 
      src={category.image} 
      alt={category.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
    
    <div className="absolute bottom-10 left-10 right-10">
      <p className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-2">{category.subtitle}</p>
      <h3 className="text-3xl font-black text-white mb-6">{category.title}</h3>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white hover:text-primary transition-all"
      >
        Khám phá ngay
      </motion.button>
    </div>
  </motion.div>
);

export default FeaturedCategories;
