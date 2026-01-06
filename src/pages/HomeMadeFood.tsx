import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './food.css';

type HomeMadeFood = {
  id: string;
  chef_name: string | null;
  chef_image: string | null;
  brand_name: string | null;
  food_name: string | null;
  food_image: string | null;
  description: string | null;
  calories: number | null;
  protein: number | null;
  price: number | null;
  prebooking_required: boolean | null;
};

export default function HomeMadeFood() {
  const [foods, setFoods] = useState<HomeMadeFood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeMadeFood();
  }, []);

  const fetchHomeMadeFood = async () => {
    const { data, error } = await supabase
      .from('homemade_food') // ✅ EXACT TABLE
      .select('*');

    if (error) {
      console.error('Error fetching homemade food:', error);
    } else if (data) {
      setFoods(data);
    }

    setLoading(false);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading homemade food...</p>;
  }

  if (foods.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        No home-made food available in this category
      </p>
    );
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-6">
        Homemade Food
      </h1>

      <div className="food-container">
        {foods.map(food => (
          <div key={food.id} className="food-card">
            {/* Food Image */}
            {food.food_image && (
              <img src={food.food_image} alt={food.food_name ?? 'Food'} />
            )}

            {/* Food Name */}
            <h3 className="mt-2 font-semibold text-lg">
              {food.food_name}
            </h3>

            {/* Brand */}
            {food.brand_name && (
              <p className="text-sm text-gray-500">
                {food.brand_name}
              </p>
            )}

            {/* Chef Info */}
            {food.chef_name && (
              <p className="text-sm mt-1">
                👨‍🍳 {food.chef_name}
              </p>
            )}

            {/* Description */}
            {food.description && (
              <p className="text-sm text-gray-600 mt-1">
                {food.description}
              </p>
            )}

            {/* Nutrition */}
            <p className="text-xs text-gray-500 mt-1">
              {food.calories && `🔥 ${food.calories} kcal`}
              {food.protein && ` • 💪 ${food.protein}g protein`}
            </p>

            {/* Price */}
            <p className="mt-2 font-bold text-lg">
              ₹{food.price}
            </p>

            {/* Prebooking */}
            {food.prebooking_required && (
              <p className="text-xs text-orange-600 mt-1">
                ⏰ Pre-booking required (2–3 hrs)
              </p>
            )}

            <button className="mt-2">Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}
