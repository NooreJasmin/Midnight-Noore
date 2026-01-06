# Sample Data for Crave Wave

Use this guide to populate your Crave Wave database with demo food items and restaurants.

## Adding Sample Restaurants

Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO restaurants (hotel_name, city, address) VALUES
('Madhura Idli House', 'Chennai', '123 Mount Road, Chennai'),
('Naan Bazaar', 'Bangalore', '456 Brigade Road, Bangalore'),
('Spice Route Dosas', 'Hyderabad', '789 Abids, Hyderabad'),
('South Indian Delights', 'Pune', '321 FC Road, Pune'),
('Sambar Kitchen', 'Coimbatore', '654 Avinashi Road, Coimbatore');
```

## Adding Sample Chefs

First get restaurant IDs from the restaurants table, then run:

```sql
INSERT INTO chefs (chef_name, brand_name, profile_picture_url, city) VALUES
('Lakshmi Sharma', 'Lakshmi Kitchen', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=200', 'Chennai'),
('Priya Nair', 'Priya Home Meals', 'https://images.pexels.com/photos/1554200/pexels-photo-1554200.jpeg?w=200', 'Bangalore'),
('Raj Kumar', 'Raj's Traditional Foods', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=200', 'Hyderabad'),
('Sneha Desai', 'Sneha's Kitchen', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=200', 'Pune'),
('Anitha Mohan', 'Anitha Homemade Foods', 'https://images.pexels.com/photos/1554200/pexels-photo-1554200.jpeg?w=200', 'Coimbatore');
```

## Adding Restaurant Foods

Get restaurant IDs first, then run:

```sql
INSERT INTO restaurant_made_foods (restaurant_id, food_name, description, category, price, image_url, calories, protein) VALUES
('RESTAURANT_ID_HERE', 'Crispy Masala Dosa', 'Golden crispy dosa with spicy potato filling and coconut chutney', 'meals', 120, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 280, 8),
('RESTAURANT_ID_HERE', 'Idli Sambar Combo', 'Fluffy idlis with hot sambar and chutney', 'meals', 80, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 220, 6),
('RESTAURANT_ID_HERE', 'Medu Vada', 'Crispy fried vadas with sambar and chutney', 'snacks', 60, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 180, 5),
('RESTAURANT_ID_HERE', 'Biryani Special', 'Fragrant basmati rice with tender meat and aromatic spices', 'meals', 250, 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=400', 450, 20),
('RESTAURANT_ID_HERE', 'Gulab Jamun', 'Soft khoya balls in sugar syrup', 'desserts', 50, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 160, 2);
```

## Adding Home-Made Foods

Get chef IDs first, then run:

```sql
INSERT INTO home_made_foods (chef_id, food_name, description, category, price, image_url, calories, protein, prebooking_hours) VALUES
('CHEF_ID_HERE', 'Homemade Idli', 'Soft and fluffy idlis made with fermented batter', 'meals', 80, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 150, 4, 2),
('CHEF_ID_HERE', 'Spicy Dosa', 'Crispy dosa with spicy stuffing and homemade chutney', 'meals', 100, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 200, 6, 3),
('CHEF_ID_HERE', 'Traditional Vada', 'Deep fried vadas with traditional recipe', 'snacks', 50, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 140, 3, 2),
('CHEF_ID_HERE', 'Pongal', 'Winter special rice and lentil dish', 'meals', 90, 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400', 250, 8, 3),
('CHEF_ID_HERE', 'Filter Coffee', 'Strong South Indian filter coffee', 'snacks', 30, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400', 80, 1, 1);
```

## Food Images

Use these Pexels image URLs for demo:

### Breakfast/Main Dishes
- `https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400`
- `https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=400`
- `https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=400`

### Snacks/Appetizers
- `https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400`
- `https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=400`

### Beverages
- `https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=400`

### Desserts
- `https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400`

## Chef Profile Pictures

Use these Pexels portrait URLs:

- `https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=200`
- `https://images.pexels.com/photos/1554200/pexels-photo-1554200.jpeg?w=200`
- `https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=200`
- `https://images.pexels.com/photos/1181707/pexels-photo-1181707.jpeg?w=200`

## Step-by-Step Instructions

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Create a new query
4. Copy and paste the INSERT statements
5. Replace RESTAURANT_ID_HERE and CHEF_ID_HERE with actual IDs from the tables
6. Run the queries

## Nutrition Defaults

- Idli: 150 cal, 4g protein
- Dosa: 200 cal, 6g protein
- Vada: 140 cal, 3g protein
- Biryani: 450 cal, 20g protein
- Filter Coffee: 80 cal, 1g protein
- Gulab Jamun: 160 cal, 2g protein

## Testing the App

After adding data:

1. Sign up with a test account
2. Login with credentials
3. Browse Home and Restaurant foods
4. Add items to cart
5. Proceed to checkout
6. Test payment (demo mode if Razorpay not configured)

## Notes

- All prices are in INR (₹)
- Prebooking hours are for home-made foods only
- Use actual Pexels URLs or replace with your own images
- Adjust prices and nutrition values as needed
