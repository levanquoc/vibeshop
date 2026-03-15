import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/api';
import { ShoppingBag, ArrowLeft, Heart, Star, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin text-secondary">
          <ShoppingBag size={48} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Ối! Không tìm thấy sản phẩm.</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Breadcrumbs / Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold mb-10 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="bg-white rounded-[40px] p-8 md:p-16 border border-slate-100 flex items-center justify-center shadow-2xl shadow-slate-100 relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-8 right-8">
            <button className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:text-red-500 transition-colors">
              <Heart size={24} />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-secondary/10 text-secondary-dark text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {product.category}
             </span>
             <div className="flex items-center gap-1 text-secondary">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold text-primary">{product.rating?.rate || 4.5}</span>
             </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-primary mb-6 leading-tight tracking-tight">
            {product.title}
          </h1>

          <p className="text-3xl font-black text-primary mb-8">
            ${product.price}
          </p>

          <p className="text-slate-500 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          {/* Policy */}
          <div className="grid grid-cols-2 gap-4 mb-10">
             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <Truck className="text-primary" size={20} />
                <p className="text-xs font-bold text-primary">Miễn phí giao hàng</p>
             </div>
             <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                <ShieldCheck className="text-primary" size={20} />
                <p className="text-xs font-bold text-primary">Bảo hành 12 tháng</p>
             </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-primary text-white px-10 py-5 rounded-2xl font-black hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" /> 
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
