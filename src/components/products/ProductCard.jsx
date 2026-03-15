import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop navigation to detail page
    e.stopPropagation();
    addToCart(product);
  };

  return (
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
          <button className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center shadow-lg hover:bg-secondary transition-colors">
            <Heart size={20} />
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
          <p className="font-black text-xl text-primary">{product.price}</p>
          {product.oldPrice && (
            <p className="text-slate-400 text-sm line-through font-medium">{product.oldPrice}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
