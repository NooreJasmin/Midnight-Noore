import 'dotenv/config';
import { supabase } from '../lib/supabase.ts';

const sampleFoods = [
  {
    chef_name: 'Ravi Kumar',
    chef_image: 'https://example.com/chef_ravi.jpg',
    brand_name: 'Ravi’s Kitchen',
    food_name: 'Masala Dosa',
    food_image: 'https://example.com/masala_dosa.jpg',
    description: 'Crispy South Indian dosa with spicy potato filling',
    category: 'South Indian',
    calories: 300,
    protein: 7,
    price: 150,
    prebooking_required: true
  },
  {
    chef_name: 'Meena Bai',
    chef_image: 'https://example.com/chef_meena.jpg',
    brand_name: 'Meena’s Home Food',
    food_name: 'Idli Sambar',
    food_image: 'https://example.com/idli_sambar.jpg',
    description: 'Soft idlis with spicy sambar',
    category: 'South Indian',
    calories: 180,
    protein: 6,
    price: 100,
    prebooking_required: false
  },
  {
    chef_name: 'Anil Kumar',
    chef_image: 'https://example.com/chef_anil.jpg',
    brand_name: 'Anil’s Kitchen',
    food_name: 'Vada',
    food_image: 'https://example.com/vada.jpg',
    description: 'Crispy medu vada with coconut chutney',
    category: 'South Indian',
    calories: 200,
    protein: 5,
    price: 80,
    prebooking_required: true
  },
  {
    chef_name: 'Sunita Reddy',
    chef_image: 'https://example.com/chef_sunita.jpg',
    brand_name: 'Sunita’s Tiffin',
    food_name: 'Pongal',
    food_image: 'https://example.com/pongal.jpg',
    description: 'Soft and creamy pongal with ghee and spices',
    category: 'South Indian',
    calories: 250,
    protein: 6,
    price: 120,
    prebooking_required: false
  }
];

async function insertFoods() {
  for (const food of sampleFoods) {
    // check if food exists
    const { data: existing } = await supabase
      .from('homemade_food')
      .select('id')
      .eq('food_name', food.food_name)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(`Food already exists: ${food.food_name}, skipping insert.`);
      continue;
    }

    // insert food
    const { data, error } = await supabase
      .from('homemade_food')
      .insert([food])
      .select();

    if (error) console.error('Error inserting food:', food.food_name, error);
    else console.log('Inserted food:', data);
  }
}

insertFoods();
