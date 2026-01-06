import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle, Copy, Home, Package } from 'lucide-react';

interface OrderData {
  id: string;
  order_number: string;
  total_amount: number;
  delivery_address: string;
  order_status: string;
  created_at: string;
  order_items: any[];
}

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) {
      navigate('/');
      return;
    }

    const { data, error } = await supabase.from('orders').select('*, order_items(*)').eq('id', orderId).maybeSingle();

    if (error || !data) {
      navigate('/');
      return;
    }

    setOrder(data);
    setLoading(false);
  };

  const copyOrderNumber = () => {
    if (order) {
      navigator.clipboard.writeText(order.order_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#088395] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Order not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Your delicious food is on the way</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white p-8">
            <p className="text-sm text-blue-100 mb-2">Order Number</p>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">{order.order_number}</h2>
              <button onClick={copyOrderNumber} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition">
                <Copy className="w-6 h-6" />
              </button>
            </div>
            {copied && <p className="text-sm text-green-100 mt-2">Copied to clipboard!</p>}
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-[#088395]">₹{order.total_amount}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Order Status</p>
                <p className="text-lg font-bold text-green-600 capitalize">{order.order_status}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                <Package className="w-5 h-5 text-[#088395]" />
                <span>Order Items</span>
              </h3>
              <div className="space-y-2">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">{item.food_name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center space-x-2">
                <Home className="w-5 h-5 text-[#088395]" />
                <span>Delivery Address</span>
              </h3>
              <p className="text-gray-700">{order.delivery_address}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> For home-made food, please ensure you're available at the delivery address during the pre-booked time slot.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={() => navigate('/')} className="w-full bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white py-4 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6 text-center">
          <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">For any queries about your order, please contact our support team.</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> support@cravewave.com
            </p>
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> +91-XXXXXXXXXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
