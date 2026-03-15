import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 mt-[80px]">
        {children}
      </main>

      <footer className="bg-primary text-white py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black tracking-tighter mb-4">
              Vibe<span className="text-secondary">Shop</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Điểm đến của phong cách đương đại và trải nghiệm mua sắm đẳng cấp.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-6">Dịch vụ</h3>
            <ul className="flex flex-col gap-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Giao hàng tận nơi</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Đổi trả 30 ngày</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Thành viên thân thiết</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6">Hỗ trợ</h3>
            <ul className="flex flex-col gap-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-secondary transition-colors">Trung tâm bảo hành</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6">Bản tin</h3>
            <p className="text-slate-400 text-sm mb-4">Nhận ưu đãi 10% cho đơn hàng đầu tiên.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-primary-light border border-slate-700 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-secondary" 
              />
              <button className="bg-secondary text-primary font-bold px-4 py-2 rounded-lg text-sm">Gửi</button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs text-[10px] uppercase tracking-widest">
          © 2026 VibeShop. Powered by React & Tailwind.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
