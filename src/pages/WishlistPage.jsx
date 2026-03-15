import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/products/ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const WishlistPage = () => {
  const { wishlist } = useWishlistStore();

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50">
      <SEO 
        title="Danh sách yêu thích" 
        description="Lưu giữ những món đồ bạn yêu thích nhất tại VibeShop." 
      />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-secondary transition-colors mb-6 group">
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Tiếp tục mua sắm
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-red-500 shadow-sm border border-slate-100">
              <Heart size={32} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-primary tracking-tight">Danh sách yêu thích</h1>
              <p className="text-slate-500 font-medium">Bạn có {wishlist.length} sản phẩm trong danh sách</p>
            </div>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[48px] p-16 md:p-32 text-center border border-dashed border-slate-200"
          >
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart size={48} className="text-slate-200" />
            </div>
            <h2 className="text-3xl font-black text-primary mb-4">Chưa có gì ở đây cả...</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium leading-relaxed">
              Có vẻ như bạn chưa chọn được món đồ ưng ý nào. Hãy dạo quanh cửa hàng và chọn những bộ đồ "chất" nhất nhé!
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-primary-light transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              <ShoppingBag size={22} /> Khám phá ngay
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard 
                    product={{
                      ...product,
                      name: product.title,
                      isNew: false
                    }} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
