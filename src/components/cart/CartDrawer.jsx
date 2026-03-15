import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Fullscreen } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-out border-l border-slate-100 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary text-secondary rounded-xl flex items-center justify-center">
               <ShoppingBag size={20} />
            </div>
            <h2 className="text-xl font-black text-primary">Giỏ hàng của bạn</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold mb-6">Chưa có sản phẩm nào trong giỏ hàng</p>
              <button 
                onClick={onClose}
                className="bg-primary text-white px-8 py-3 rounded-xl font-black hover:bg-primary-light transition-all"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl flex-shrink-0 p-2 border border-slate-100 group-hover:border-secondary transition-colors">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-primary truncate pr-4">{item.title}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-secondary"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-secondary"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-black text-primary">
                      ${((typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 border-t border-slate-100 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-500 font-bold">Tổng cộng:</span>
              <span className="text-3xl font-black text-primary">${getTotalPrice()}</span>
            </div>
            <Link 
              to="/cart" 
              onClick={onClose}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
            >
               Thanh toán ngay <ArrowRight size={20} />
            </Link>
            <Link 
              to="/cart" 
              onClick={onClose}
              className="w-full bg-white text-primary border-2 border-primary/10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
               Xem giỏ hàng chi tiết
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
