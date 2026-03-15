import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useToastStore } from '../../store/toastStore';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const showToast = useToastStore((state) => state.showToast);
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
    showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (added) {
      showToast(`Đã thêm ${product.name} vào danh sách yêu thích! 💖`);
    } else {
      showToast(`Đã xóa ${product.name} khỏi danh sách yêu thích.`, 'info');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.id}`} className="group cursor-pointer">
        {/* Image Container */}
        <div className="aspect-[3/4] bg-white rounded-[32px] mb-5 overflow-hidden relative shadow-sm border border-slate-50 flex items-center justify-center p-8">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Badges */}
          {product.isNew && (
            <div className="absolute top-5 left-5 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              New Arrival
            </div>
          )}
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          
          <div className="absolute bottom-6 left-6 right-6 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:bg-primary-light flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} /> Thêm vào giỏ
            </button>
            <button 
              onClick={handleToggleWishlist}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-primary hover:bg-secondary'
              }`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2.5} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-2">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-secondary transition-colors leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <p className="font-black text-xl text-primary">${product.price}</p>
            {product.oldPrice && (
              <p className="text-slate-400 text-sm line-through font-medium">{product.oldPrice}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
