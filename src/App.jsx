import { useQuery } from '@tanstack/react-query';
import { getProducts } from './services/api';
import MainLayout from './components/layout/MainLayout';
import Hero from './components/home/Hero';
import FeaturedCategories from './components/home/FeaturedCategories';
import ProductCard from './components/products/ProductCard';
import { Loader2 } from 'lucide-react';

function App() {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <MainLayout>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories */}
      <FeaturedCategories />

      {/* 3. Featured Products Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4 text-center md:text-left">
            <div>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 block">Cửa hàng của chúng tôi</span>
              <h2 className="text-4xl font-black text-primary mb-2 tracking-tight">Sản Phẩm <span className="text-secondary text-stroke-primary">Nổi Bật</span></h2>
              <p className="text-slate-500 max-w-md">Lựa chọn những thiết kế tinh xảo nhất cho phong cách của bạn.</p>
            </div>
            <button className="text-primary font-bold hover:text-secondary transition-colors underline decoration-2 underline-offset-8 uppercase tracking-widest text-xs">
              Xem tất cả sản phẩm
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 w-full col-span-full">
              <Loader2 className="animate-spin text-secondary mb-4" size={48} />
              <p className="text-slate-400 font-bold animate-pulse">Đang tải bộ sưu tập mới...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-20 w-full col-span-full">
              <p className="text-red-500 font-bold">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {products?.slice(0, 8).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    name: product.title,
                    price: `$${product.price}`,
                    category: product.category,
                    isNew: product.id <= 4 // Mark first 4 as new
                  }} 
                />
              ))}
            </div>
          )}

          {/* Luxury Banner */}
          <div className="mt-24 p-12 md:p-20 rounded-[48px] bg-primary relative overflow-hidden text-center">
             <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-0"></div>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight">
               Summer Collection <br /> <span className="text-secondary tracking-[0.2em] text-2xl md:text-3xl">Coming Soon</span>
             </h2>
             <p className="text-slate-400 mb-10 relative z-10 max-w-lg mx-auto">Đăng ký nhận thông báo để trở thành người đầu tiên sở hữu những thiết kế độc quyền.</p>
             <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black relative z-10 hover:bg-secondary transition-all">
                Đăng ký ngay
             </button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default App
