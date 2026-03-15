import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductCard from '../components/products/ProductCard';
import ProductSkeleton from '../components/products/ProductSkeleton';

const HomePage = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <>
      <Hero />
      <FeaturedCategories />

      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 block">Cửa hàng của chúng tôi</span>
              <h2 className="text-4xl font-black text-primary mb-2 tracking-tight">
                Sản Phẩm <span className="text-secondary text-stroke-primary">Nổi Bật</span>
              </h2>
              <p className="text-slate-500 max-w-md">Lựa chọn những thiết kế tinh xảo nhất cho phong cách của bạn.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : isError ? (
              <div className="text-center py-20 w-full col-span-full">
                <p className="text-red-500 font-bold">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
              </div>
            ) : (
              products?.slice(0, 8).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    name: product.title,
                    price: `$${product.price}`,
                    category: product.category,
                    isNew: product.id <= 4
                  }} 
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
