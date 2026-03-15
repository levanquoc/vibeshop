import { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import CartDrawer from '../cart/CartDrawer';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-secondary transition-transform group-hover:rotate-12">
              <ShoppingBag size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-primary">
              Vibe<span className="text-secondary">Shop</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Cửa hàng', 'Nam', 'Nữ', 'Sale'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-[15px] font-semibold text-primary/70 hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
              <Search size={22} className="text-primary/80" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <User size={22} className="text-primary/80" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-primary text-white rounded-full hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 top-[76px] bg-white z-40 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="flex flex-col p-8 gap-6 text-center">
            {['Cửa hàng', 'Nam', 'Nữ', 'Sale'].map((item) => (
              <a key={item} href="#" className="text-3xl font-bold text-primary hover:text-secondary transition-colors">
                {item}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
               <button className="w-full py-4 bg-slate-100 rounded-2xl font-bold">Đăng nhập</button>
               <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Tạo tài khoản</button>
            </div>
          </nav>
        </div>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
