import MainLayout from './components/layout/MainLayout';
import Hero from './components/home/Hero';
import FeaturedCategories from './components/home/FeaturedCategories';
import ProductCard from './components/products/ProductCard';

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Classic Navy Blazer",
    category: "Menswear",
    price: "$299.00",
    oldPrice: "$350.00",
    isNew: true
  },
  {
    id: 2,
    name: "Golden Silk Evening Dress",
    category: "Womenswear",
    price: "$450.00",
    isNew: true
  },
  {
    id: 3,
    name: "Premium Leather Timepiece",
    category: "Accessories",
    price: "$199.00",
    oldPrice: "$250.00",
    isNew: false
  },
  {
    id: 4,
    name: "Minimalist Wool Overcoat",
    category: "Menswear",
    price: "$399.00",
    isNew: false
  }
];

function App() {
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {SAMPLE_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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
