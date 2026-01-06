import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './food.css';

type RestaurantFood = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

export default function RestaurantFood() {
  const [foods, setFoods] = useState<RestaurantFood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurantFood();
  }, []);

  const fetchRestaurantFood = async () => {
    const { data, error } = await supabase
      .from('restaurant_food') // ✅ EXACT TABLE NAME
      .select('*');

    if (error) {
      console.error('Error fetching restaurant food:', error);
    } else if (data) {
      setFoods(data);
    }

    setLoading(false);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading restaurant food...</p>;
  }

  if (foods.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        No restaurant food available
      </p>
    );
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-6">
        Restaurant Food
      </h1>

      <div className="food-container">
        {foods.map(food => (
          <div key={food.id} className="food-card">
            <img src={food.image_url} alt={food.name} />
            <h3>{food.name}</h3>
            <p>₹{food.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}
