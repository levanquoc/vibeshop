import { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Search, LogOut, Heart, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuth } from '../../context/AuthContext';
import CartDrawer from '../cart/CartDrawer';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    navigate('/');
  };

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
            
            {/* User Account */}
            <div className="relative">
              <button 
                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : navigate('/login')}
                className={`p-2 rounded-full transition-all flex items-center gap-2 ${user ? 'bg-slate-100 pr-4' : 'hover:bg-slate-100'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user ? 'bg-primary text-secondary' : 'text-primary/80'}`}>
                  <User size={user ? 18 : 22} />
                </div>
                {user && (
                   <span className="text-sm font-black text-primary hidden lg:block">Hi, {user.user_metadata?.full_name?.split(' ')[0] || 'User'}</span>
                )}
              </button>

              {/* User Dropdown */}
              {user && isUserMenuOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-4 py-6 z-50 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 mb-6">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Tài khoản</p>
                    <p className="text-primary font-black truncate">{user.user_metadata?.full_name || user.email}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <Link to="/orders" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-600 font-bold transition-all">
                       <Package size={18} /> Đơn hàng của tôi
                    </Link>
                    <Link to="/wishlist" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-600 font-bold transition-all">
                       <Heart size={18} /> Danh sách yêu thích
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 text-red-500 font-bold transition-all"
                    >
                       <LogOut size={18} /> Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>

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
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}>
          <nav className="flex flex-col p-8 gap-6 text-center">
            {['Cửa hàng', 'Nam', 'Nữ', 'Sale'].map((item) => (
              <a key={item} href="#" className="text-3xl font-bold text-primary hover:text-secondary transition-colors">
                {item}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
               {user ? (
                 <>
                   <div className="mb-4">
                     <p className="text-slate-400 font-bold">Chào mừng trở lại,</p>
                     <p className="text-2xl font-black text-primary">{user.user_metadata?.full_name}</p>
                   </div>
                   <button onClick={handleSignOut} className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black flex items-center justify-center gap-2">
                     <LogOut size={20} /> Đăng xuất
                   </button>
                 </>
               ) : (
                 <>
                   <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 bg-slate-100 rounded-2xl font-black text-primary">Đăng nhập</Link>
                   <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 bg-primary text-white rounded-2xl font-black">Tạo tài khoản</Link>
                 </>
               )}
            </div>
          </nav>
        </div>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
