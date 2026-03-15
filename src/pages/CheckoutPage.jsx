import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCartStore } from '../store/cartStore';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

// Validation Schema
const schema = yup.object({
  fullName: yup.string().required('Vui lòng nhập họ và tên'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ'),
  address: yup.string().required('Vui lòng nhập địa chỉ giao hàng'),
  city: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
  paymentMethod: yup.string().oneOf(['cod', 'bank'], 'Vui lòng chọn phương thức thanh toán').required(),
}).required();

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentMethod: 'cod'
    }
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center container mx-auto px-6 text-center">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 animate-bounce-short">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-5xl font-black text-primary mb-4 tracking-tight">Đặt hàng thành công!</h1>
        <p className="text-slate-500 mb-10 max-w-md font-medium text-lg text-balance">
          Cảm ơn bạn đã tin tưởng VibeShop. Mã đơn hàng của bạn là <span className="text-primary font-black">#VB{Math.floor(Math.random() * 90000) + 10000}</span>. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
        </p>
        <Link 
          to="/" 
          className="bg-primary text-white px-10 py-5 rounded-2xl font-black hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center gap-3 active:scale-95 translate-all"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center container mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="text-slate-200" size={40} />
        </div>
        <h2 className="text-2xl font-black text-primary mb-4">Giỏ hàng đã thanh toán hoặc đang trống</h2>
        <Link to="/" className="text-secondary font-bold hover:underline">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <Link to="/cart" className="text-secondary font-bold flex items-center gap-2 hover:underline mb-4">
            <ArrowLeft size={18} /> Quay lại giỏ hàng
          </Link>
          <h1 className="text-5xl font-black text-primary tracking-tight">Thanh toán</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Shipping Info */}
          <div className="space-y-10">
            <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-secondary">
                  <Truck size={20} />
                </div>
                Thông tin giao hàng
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-primary/60 uppercase tracking-widest mb-2 ml-1">Họ và tên</label>
                  <input 
                    {...register('fullName')}
                    className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-500' : 'border-slate-100'} p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-secondary/10 transition-all font-bold`}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.fullName.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-primary/60 uppercase tracking-widest mb-2 ml-1">Email</label>
                    <input 
                      {...register('email')}
                      className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-100'} p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-secondary/10 transition-all font-bold`}
                      placeholder="vibeshop@gmail.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-black text-primary/60 uppercase tracking-widest mb-2 ml-1">Số điện thoại</label>
                    <input 
                      {...register('phone')}
                      className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-500' : 'border-slate-100'} p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-secondary/10 transition-all font-bold`}
                      placeholder="0987xxxxxx"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-primary/60 uppercase tracking-widest mb-2 ml-1">Địa chỉ cụ thể</label>
                  <input 
                    {...register('address')}
                    className={`w-full bg-slate-50 border ${errors.address ? 'border-red-500' : 'border-slate-100'} p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-secondary/10 transition-all font-bold`}
                    placeholder="Số nhà, tên đường, phường/xã..."
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-black text-primary/60 uppercase tracking-widest mb-2 ml-1">Tỉnh / Thành phố</label>
                  <select 
                    {...register('city')}
                    className={`w-full bg-slate-50 border ${errors.city ? 'border-red-500' : 'border-slate-100'} p-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-secondary/10 transition-all font-bold appearance-none`}
                  >
                    <option value="">Chọn tỉnh thành</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="other">Khác...</option>
                  </select>
                  {errors.city && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{errors.city.message}</p>}
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-secondary">
                  <CreditCard size={20} />
                </div>
                Phương thức thanh toán
              </h2>

              <div className="space-y-4">
                <label className="flex items-center gap-4 p-6 border-2 border-slate-50 rounded-[24px] cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:border-secondary has-[:checked]:bg-secondary/5 group">
                  <input type="radio" {...register('paymentMethod')} value="cod" className="w-5 h-5 accent-secondary" />
                  <div className="flex-1">
                    <p className="font-bold text-primary group-hover:text-secondary-dark transition-colors">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-slate-400 text-xs font-medium">Thanh toán bằng tiền mặt khi shipper giao tới</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-6 border-2 border-slate-50 rounded-[24px] cursor-pointer hover:bg-slate-50 transition-all has-[:checked]:border-secondary has-[:checked]:bg-secondary/5 group">
                  <input type="radio" {...register('paymentMethod')} value="bank" className="w-5 h-5 accent-secondary" />
                  <div className="flex-1">
                    <p className="font-bold text-primary group-hover:text-secondary-dark transition-colors">Chuyển khoản ngân hàng</p>
                    <p className="text-slate-400 text-xs font-medium">Nhận thông tin số tài khoản sau khi đặt hàng</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-primary text-white p-10 rounded-[48px] shadow-2xl shadow-primary/30 sticky top-32">
              <h2 className="text-2xl font-black mb-10 border-b border-white/10 pb-8 uppercase tracking-widest text-secondary">Đơn hàng của bạn</h2>
              
              <div className="max-h-64 overflow-y-auto pr-2 space-y-6 mb-10 custom-scrollbar-light">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-white rounded-2xl p-2 flex-shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{item.title}</h4>
                      <p className="text-white/50 text-xs font-bold">SL: {item.quantity} x ${item.price}</p>
                    </div>
                    <p className="font-black text-secondary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10 border-t border-white/10 pt-10">
                <div className="flex justify-between text-white/50 font-bold uppercase tracking-widest text-xs">
                  <span>Tạm tính</span>
                  <span className="text-white">${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-white/50 font-bold uppercase tracking-widest text-xs">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-400">Miễn phí</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-12">
                 <span className="font-black uppercase tracking-widest text-white/30 text-sm">Tổng cộng</span>
                 <span className="text-5xl font-black text-secondary tracking-tighter">${getTotalPrice()}</span>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-primary py-6 rounded-2xl font-black text-xl hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group active:scale-95 duration-75"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                ) : (
                  <>
                    <ShieldCheck size={24} className="group-hover:scale-110 transition-transform" /> 
                    Hoàn tất đặt hàng
                  </>
                )}
              </button>

              <p className="text-center text-white/40 text-xs font-medium mt-8 flex items-center justify-center gap-2">
                 <ShieldCheck size={14} /> Thanh toán bảo mật 256-bit SSL
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
