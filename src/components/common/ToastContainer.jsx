import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-4 min-w-[320px] max-w-md p-5 rounded-[24px] shadow-2xl backdrop-blur-md border ${
              toast.type === 'success' 
                ? 'bg-white/90 border-green-100' 
                : toast.type === 'error'
                ? 'bg-red-50/90 border-red-100'
                : 'bg-white/90 border-blue-100'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : toast.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}>
              {toast.type === 'success' && <CheckCircle2 size={24} />}
              {toast.type === 'error' && <AlertCircle size={24} />}
              {toast.type === 'info' && <Info size={24} />}
            </div>

            <div className="flex-1 pr-4">
              <h4 className={`font-black text-sm uppercase tracking-widest mb-1 ${
                toast.type === 'success' ? 'text-green-600' : toast.type === 'error' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {toast.type === 'success' ? 'Thành công' : toast.type === 'error' ? 'Thất bại' : 'Thông báo'}
              </h4>
              <p className="text-primary font-bold text-sm leading-relaxed">{toast.message}</p>
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 shrink-0"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
