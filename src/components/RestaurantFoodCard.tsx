import { useState } from 'react';
import { ShoppingCart, MapPin, Flame, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface RestaurantFoodCardProps {
  food: any;
  onAddToCart: () => void;
}

export default function RestaurantFoodCard({ food, onAddToCart }: RestaurantFoodCardProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (!user) return;
    setLoading(true);
    const { data: existingItem } = await supabase.from('cart_items').select('*').eq('user_id', user.id).eq('food_type', 'restaurant_made').eq('food_id', food.id).maybeSingle();
    if (existingItem) {
      await supabase.from('cart_items').update({ quantity: existingItem.quantity + 1, updated_at: new Date().toISOString() }).eq('id', existingItem.id);
    } else {
      await supabase.from('cart_items').insert({ user_id: user.id, food_type: 'restaurant_made', food_id: food.id, quantity: 1 });
    }
    setLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    onAddToCart();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={food.image_url} alt={food.food_name} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-3 right-3 bg-[#F39C12] text-white px-3 py-1 rounded-full text-sm font-bold">₹{food.price}</div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{food.food_name}</h3>

        <div className="flex items-center space-x-2 mb-3">
          <div className="bg-gradient-to-r from-[#0A4D68] to-[#088395] p-1.5 rounded">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{food.restaurant.hotel_name}</p>
            <p className="text-xs text-gray-500">{food.restaurant.city}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{food.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{food.calories} cal</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity className="w-4 h-4 text-green-500" />
            <span>{food.protein}g protein</span>
          </div>
        </div>

        {showSuccess && (<div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 animate-pulse"><p className="text-sm text-green-700 text-center font-medium">Added to cart!</p></div>)}

        <button onClick={handleAddToCart} disabled={loading} className="w-full bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
