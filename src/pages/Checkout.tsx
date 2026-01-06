import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, CreditCard, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  food_type: 'home_made' | 'restaurant_made';
  food_id: string;
  quantity: number;
  food: any;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (profile) setAddress(profile.address || '');
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchCartItems();
      loadRazorpayScript();
    }
  }, [user]);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const fetchCartItems = async () => {
    if (!user) return;
    setLoading(true);
    const { data: items } = await supabase.from('cart_items').select('*').eq('user_id', user.id);
    if (items) {
      const enrichedItems = await Promise.all(
        items.map(async (item) => {
          let food;
          if (item.food_type === 'home_made') {
            const { data } = await supabase.from('home_made_foods').select('*, chef:chefs(chef_name, brand_name, profile_picture_url, city)').eq('id', item.food_id).maybeSingle();
            food = data ? { ...data, chef: Array.isArray(data.chef) ? data.chef[0] : data.chef } : null;
          } else {
            const { data } = await supabase.from('restaurant_made_foods').select('*, restaurant:restaurants(hotel_name, city)').eq('id', item.food_id).maybeSingle();
            food = data ? { ...data, restaurant: Array.isArray(data.restaurant) ? data.restaurant[0] : data.restaurant } : null;
          }
          return { ...item, food };
        })
      );
      setCartItems(enrichedItems.filter(item => item.food !== null));
    }
    setLoading(false);
  };

  const calculateTotal = () => cartItems.reduce((total, item) => total + item.food.price * item.quantity, 0);
  const generateOrderNumber = () => `CW${Date.now()}${Math.floor(Math.random() * 1000)}`;

  const handlePayment = async () => {
    if (!address.trim()) { alert('Please enter a delivery address'); return; }
    if (cartItems.length === 0) { alert('Your cart is empty'); return; }

    setProcessing(true);
    const totalAmount = calculateTotal();
    const orderNumber = generateOrderNumber();

    if (profile && profile.address !== address) {
      await updateProfile({ address });
    }

    const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKeyId || razorpayKeyId === 'your_razorpay_test_key_here') {
      const confirmed = window.confirm(`Order Summary:\nOrder Number: ${orderNumber}\nTotal Amount: ₹${totalAmount}\n\nNote: Razorpay is not configured. This is a test order.\n\nProceed with test order?`);
      if (confirmed) {
        await createOrder(orderNumber, totalAmount, 'test_payment_' + Date.now());
      } else {
        setProcessing(false);
      }
      return;
    }

    const options = {
      key: razorpayKeyId,
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Crave Wave',
      description: 'Food Order Payment',
      order_id: orderNumber,
      handler: async function (response: any) {
        await createOrder(orderNumber, totalAmount, response.razorpay_payment_id);
      },
      prefill: {
        name: profile?.full_name,
        email: user?.email,
        contact: profile?.mobile_number,
      },
      theme: {
        color: '#088395',
      },
      modal: {
        ondismiss: function () {
          setProcessing(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const createOrder = async (orderNumber: string, totalAmount: number, paymentId: string) => {
    if (!user) return;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        total_amount: totalAmount,
        delivery_address: address,
        payment_id: paymentId,
        payment_status: 'completed',
        order_status: 'placed',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      alert('Failed to create order');
      setProcessing(false);
      return;
    }

    const orderItemsData = cartItems.map((item) => ({
      order_id: order.id,
      food_type: item.food_type,
      food_id: item.food_id,
      food_name: item.food.food_name,
      quantity: item.quantity,
      price: item.food.price,
    }));

    await supabase.from('order_items').insert(orderItemsData);
    await supabase.from('cart_items').delete().eq('user_id', user.id);

    setProcessing(false);
    navigate(`/order-confirmation/${order.id}`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#088395] mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading checkout...</p>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-[#088395]" />
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              </div>

              <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#088395] focus:border-transparent outline-none" placeholder="Enter your complete delivery address" required />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ShoppingBag className="w-6 h-6 text-[#088395]" />
                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b">
                    <div className="flex items-center space-x-3">
                      <img src={item.food.image_url} alt={item.food.food_name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <p className="font-semibold text-gray-900">{item.food.food_name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">₹{item.food.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-[#088395]">₹{calculateTotal()}</span>
                </div>
              </div>

              <button onClick={handlePayment} disabled={processing || !address.trim()} className="w-full bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>{processing ? 'Processing...' : 'Pay Now'}</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">Secure payment powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
