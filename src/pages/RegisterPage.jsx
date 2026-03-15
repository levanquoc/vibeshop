import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, isConfigured } = useAuth();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isConfigured) {
      showToast('Vui lòng cấu hình Supabase URL và API Key trong file .env.', 'error');
      return;
    }
    setLoading(true);

    const { error } = await signUp(email, password, { full_name: fullName });

    if (error) {
      if (error.message.includes('rate limit')) {
        showToast('Hệ thống đang tạm thời giới hạn gửi email (tối đa 3 email/giờ).', 'error');
      } else {
        showToast(error.message, 'error');
      }
      setLoading(false);
    } else {
      // Registration successful
      showToast('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.', 'success');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto bg-white rounded-[48px] shadow-sm border border-slate-100 p-10 md:p-12">
          {/* Configuration Warning */}
          {!isConfigured && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700 text-sm font-bold flex flex-col gap-2 italic">
               <p>⚠️ Supabase chưa được cấu hình!</p>
               <p className="font-medium text-xs opacity-80">Hãy điền URL và Anon Key vào file .env để kích hoạt đăng ký.</p>
            </div>
          )}

          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6 shadow-xl shadow-primary/20 -rotate-3">
              <ShoppingBag size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-primary tracking-tight mb-2">Tạo tài khoản</h1>
            <p className="text-slate-400 font-medium">Khám phá phong cách của riêng bạn</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">

            <div>
              <label className="block text-xs font-black text-primary/40 uppercase tracking-widest mb-2 ml-1">Họ và tên</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" size={20} />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-bold"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-primary/40 uppercase tracking-widest mb-2 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-bold"
                  placeholder="vibeshop@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-primary/40 uppercase tracking-widest mb-2 ml-1">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-bold"
                  placeholder="Min. 8 ký tự"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-light transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 duration-75"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Đăng ký ngay <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-slate-400 font-bold">
            Đã có tài khoản? <Link to="/login" className="text-secondary hover:underline">Đăng nhập ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
