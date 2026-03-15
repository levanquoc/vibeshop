import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Mail, Lock, ArrowRight, Github } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError('Email hoặc mật khẩu không chính xác.');
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto bg-white rounded-[48px] shadow-sm border border-slate-100 p-10 md:p-12">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6 shadow-xl shadow-primary/20 rotate-3">
              <ShoppingBag size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-primary tracking-tight mb-2">Chào mừng trở lại!</h1>
            <p className="text-slate-400 font-medium">Đăng nhập để trải nghiệm trọn vẹn VibeShop</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold text-center border border-red-100 italic">
                {error}
              </div>
            )}

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
              <div className="flex justify-between mb-2 ml-1">
                <label className="block text-xs font-black text-primary/40 uppercase tracking-widest">Mật khẩu</label>
                <button type="button" className="text-xs font-bold text-secondary hover:underline">Quên mật khẩu?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-secondary transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 pl-12 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-bold"
                  placeholder="••••••••"
                  required
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
                <>Đăng nhập <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-slate-300 font-bold uppercase tracking-widest text-xs">Hoặc đăng nhập với</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <button className="flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                <Github size={20} /> GitHub
             </button>
          </div>

          <p className="text-center mt-10 text-slate-400 font-bold">
            Chưa có tài khoản? <Link to="/register" className="text-secondary hover:underline">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
