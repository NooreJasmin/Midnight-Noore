import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Clock } from 'lucide-react';

interface CartItem {
  id: string;
  food_type: 'home_made' | 'restaurant_made';
  food_id: string;
  quantity: number;
  food: any;
}

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchCartItems();
  }, [user]);

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

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await supabase.from('cart_items').update({ quantity: newQuantity, updated_at: new Date().toISOString() }).eq('id', itemId);
    fetchCartItems();
  };

  const removeItem = async (itemId: string) => {
    await supabase.from('cart_items').delete().eq('id', itemId);
    fetchCartItems();
  };

  const calculateTotal = () => cartItems.reduce((total, item) => total + item.food.price * item.quantity, 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#088395] mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading cart...</p>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Start adding delicious South Indian food to your cart!</p>
          <button onClick={() => navigate('/')} className="bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
            Browse Food
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-4">
              <img src={item.food.image_url} alt={item.food.food_name} className="w-full md:w-32 h-32 object-cover rounded-lg" />

              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{item.food.food_name}</h3>

                {item.food_type === 'home_made' ? (
                  <>
                    <p className="text-sm text-gray-600 mb-1">{item.food.chef.brand_name} • {item.food.chef.city}</p>
                    <div className="flex items-center space-x-2 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded inline-flex mb-2">
                      <Clock className="w-3 h-3" />
                      <span>Pre-booking: {item.food.prebooking_hours}h</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-600">{item.food.restaurant.hotel_name} • {item.food.restaurant.city}</p>
                )}

                <p className="text-lg font-bold text-[#088395] mt-2">₹{item.food.price}</p>
              </div>

              <div className="flex md:flex-col items-center justify-between md:justify-start gap-4">
                <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-600 hover:text-gray-900 transition">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-600 hover:text-gray-900 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Subtotal</span>
            <span className="text-2xl font-bold text-gray-900">₹{calculateTotal()}</span>
          </div>

          <button onClick={() => navigate('/checkout')} className="w-full bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition flex items-center justify-center space-x-2">
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
