import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChefHat, Store } from 'lucide-react';
import HomeMadeFoodCard from '../components/HomeMadeFoodCard';
import RestaurantFoodCard from '../components/RestaurantFoodCard';

type Category = 'all' | 'meals' | 'snacks' | 'desserts';

export default function Home() {
  const [homeMadeFoods, setHomeMadeFoods] = useState<any[]>([]);
  const [restaurantFoods, setRestaurantFoods] = useState<any[]>([]);
  const [homeMadeCategory, setHomeMadeCategory] = useState<Category>('all');
  const [restaurantCategory, setRestaurantCategory] = useState<Category>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);

    // ✅ Corrected table & column names
    const { data: homeMadeData } = await supabase
      .from('homemade_food')
      .select('*, chef:chefs(chef_name, brand_name, chef_image, city)')
      .eq('prebooking_required', true);

    const { data: restaurantData } = await supabase
      .from('restaurant_made_foods')
      .select('*, restaurant:restaurants(hotel_name, city)')
      .eq('available', true);

    if (homeMadeData)
      setHomeMadeFoods(
        homeMadeData.map(item => ({
          ...item,
          chef: Array.isArray(item.chef) ? item.chef[0] : item.chef
        }))
      );

    if (restaurantData)
      setRestaurantFoods(
        restaurantData.map(item => ({
          ...item,
          restaurant: Array.isArray(item.restaurant) ? item.restaurant[0] : item.restaurant
        }))
      );

    setLoading(false);
  };

  const filterFoods = (foods: any[], category: Category) =>
    category === 'all' ? foods : foods.filter(food => food.category === category);

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'meals', label: 'Meals' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'desserts', label: 'Desserts' }
  ];

  const CategoryFilter = ({ selected, onChange }: { selected: Category; onChange: (cat: Category) => void }) => (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(cat => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-2 rounded-full font-medium transition ${
            selected === cat.value
              ? 'bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#088395] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading delicious food...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Crave Wave</h1>
          <p className="text-xl text-blue-100">Authentic South Indian Cuisine at Your Doorstep</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Home-Made Food */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-[#0A4D68] to-[#088395] p-3 rounded-lg">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Home-Made Food</h2>
              <p className="text-gray-600">Cooked with love by local chefs</p>
            </div>
          </div>
          <CategoryFilter selected={homeMadeCategory} onChange={setHomeMadeCategory} />

          {filterFoods(homeMadeFoods, homeMadeCategory).length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No home-made food available in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterFoods(homeMadeFoods, homeMadeCategory).map(food => (
                <HomeMadeFoodCard key={food.id} food={food} onAddToCart={fetchFoods} />
              ))}
            </div>
          )}
        </section>

        {/* Restaurant-Made Food */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-[#0A4D68] to-[#088395] p-3 rounded-lg">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Restaurant-Made Food</h2>
              <p className="text-gray-600">Fresh from top-rated restaurants</p>
            </div>
          </div>
          <CategoryFilter selected={restaurantCategory} onChange={setRestaurantCategory} />

          {filterFoods(restaurantFoods, restaurantCategory).length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No restaurant food available in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterFoods(restaurantFoods, restaurantCategory).map(food => (
                <RestaurantFoodCard key={food.id} food={food} onAddToCart={fetchFoods} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
