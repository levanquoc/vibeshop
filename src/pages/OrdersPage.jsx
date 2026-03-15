import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../services/orderService';
import { Package, Calendar, Clock, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      const { data, error } = await getUserOrders(user.id);
      if (!error) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'shipping': return 'bg-blue-100 text-blue-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-amber-100 text-amber-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Đã hoàn thành';
      case 'shipping': return 'Đang giao hàng';
      case 'cancelled': return 'Đã hủy';
      default: return 'Đang xử lý';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <Link to="/" className="text-slate-400 hover:text-primary flex items-center gap-2 mb-4 font-bold text-sm transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Quay lại cửa hàng
              </Link>
              <h1 className="text-4xl font-black text-primary tracking-tight">Đơn hàng của tôi</h1>
              <p className="text-slate-500 font-medium">Theo dõi và quản lý lịch sử mua sắm của bạn</p>
            </div>
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className="w-12 h-12 bg-primary text-secondary rounded-2xl flex items-center justify-center font-black text-xl">
                 {orders.length}
               </div>
               <div>
                  <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Tổng số đơn</p>
                  <p className="text-primary font-black">Đã đặt hàng</p>
               </div>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-[48px] p-20 text-center border border-dashed border-slate-200">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Package className="text-slate-200" size={48} />
               </div>
               <h2 className="text-2xl font-black text-primary mb-4">Bạn chưa có đơn hàng nào</h2>
               <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">Mọi đơn hàng bạn đã mua sẽ xuất hiện tại đây để bạn dễ dàng theo dõi.</p>
               <Link to="/" className="inline-flex items-center gap-3 bg-primary text-secondary px-10 py-5 rounded-2xl font-black hover:bg-primary-light transition-all shadow-xl shadow-primary/20">
                  Khám phá ngay <ShoppingBag size={20} />
               </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                  {/* Order Card Header */}
                  <div className="p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6 bg-slate-50/30">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Mã đơn hàng</p>
                        <p className="font-black text-primary">#{order.id.slice(0, 8).toUpperCase()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="hidden sm:block">
                        <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Ngày đặt</p>
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <Calendar size={16} className="text-slate-400" />
                          {new Date(order.created_at).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Trạng thái</p>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="p-8 space-y-6">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex-shrink-0">
                          <img src={item.product_image} alt={item.product_name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-primary truncate mb-1">{item.product_name}</h4>
                          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                             <span>Số lượng: {item.quantity}</span>
                             <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                             <span>Đơn giá: ${item.price}</span>
                          </div>
                        </div>
                        <p className="font-black text-primary text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order Card Footer */}
                  <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Phương thức</p>
                      <p className="text-sm font-bold text-primary uppercase">{order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">Tổng tiền thanh toán</p>
                      <p className="text-3xl font-black text-primary">${order.total_price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
