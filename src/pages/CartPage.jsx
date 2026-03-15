import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center container mx-auto px-6 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={48} className="text-slate-200" />
        </div>
        <h1 className="text-4xl font-black text-primary mb-4">Giỏ hàng của bạn đang trống</h1>
        <p className="text-slate-500 mb-10 max-w-md">Có vẻ như bạn chưa chọn được món đồ nào ưng ý. Hãy lướt xem các bộ sưu tập mới nhất của chúng tôi nhé!</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
        >
          <ArrowLeft size={20} /> Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  // Defensive sanitization: Clean up any "bad" data that might be in the cart from previous sessions
  const sanitizeValue = (val) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
    return 0;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <Link to="/" className="text-secondary font-bold flex items-center gap-2 hover:underline mb-4">
            <ArrowLeft size={18} /> Tiếp tục mua sắm
          </Link>
          <h1 className="text-5xl font-black text-primary tracking-tight">Giỏ hàng <span className="text-secondary">({getTotalItems()})</span></h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* List Section */}
          <div className="xl:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center group transition-all hover:shadow-md">
                {/* Image */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 rounded-[24px] p-6 flex-shrink-0 group-hover:bg-white transition-colors border border-transparent group-hover:border-secondary/20">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-1">{item.category}</p>
                  <h3 className="text-xl font-bold text-primary mb-4 leading-tight">{item.title}</h3>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-2 border border-slate-100">
                      <button 
                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
                         className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:text-secondary shadow-sm transition-all"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-black text-lg w-6 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                         className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:text-secondary shadow-sm transition-all"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <p className="text-2xl font-black text-primary">
                      ${(sanitizeValue(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="xl:col-span-1">
            <div className="bg-primary text-white p-8 md:p-10 rounded-[40px] shadow-2xl shadow-primary/30 sticky top-32">
              <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-6 uppercase tracking-widest text-secondary">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/70 font-bold">
                  <span>Tạm tính</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-white/70 font-bold">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between text-white/70 font-bold">
                  <span>Thuế (VAT)</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-8 mb-10">
                <div className="flex justify-between items-end">
                   <span className="font-bold uppercase tracking-widest text-white/50 text-sm">Tổng thanh toán</span>
                   <span className="text-4xl font-black text-secondary">${getTotalPrice()}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-secondary text-primary py-5 rounded-2xl font-black text-lg hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 duration-75"
              >
                <CreditCard size={22} /> Thanh toán ngay
              </Link>

              <div className="mt-8 flex items-center justify-center gap-4 opacity-50 grayscale contrast-125">
                 {/* Placeholders for payment icons */}
                 <div className="w-10 h-6 bg-white/20 rounded-md"></div>
                 <div className="w-10 h-6 bg-white/20 rounded-md"></div>
                 <div className="w-10 h-6 bg-white/20 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
