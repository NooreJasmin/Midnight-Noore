# Crave Wave - Indian Food Ordering App

Complete setup guide for the Crave Wave application.

## Prerequisites

- Node.js (v16+)
- npm
- Supabase account
- Razorpay test account (optional, for payment testing)

## Step 1: Supabase Setup

### Create Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Get your credentials:
   - Project URL (VITE_SUPABASE_URL)
   - Anon Key (VITE_SUPABASE_ANON_KEY)

### Create Database Schema
1. Go to SQL Editor in Supabase
2. Run the migration SQL from the database schema
3. The migration automatically creates all required tables

## Step 2: Environment Configuration

### Create .env file in project root

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Razorpay Configuration (Test Mode)
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key
```

### Get Credentials

**Supabase:**
- Login to Supabase Dashboard
- Project Settings → API
- Copy Project URL and anon key

**Razorpay (Optional):**
- Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
- Settings → API Keys
- Copy test key_id (starts with rzp_test_)

## Step 3: Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Login.tsx
│   ├── SignUp.tsx
│   ├── Home.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── OrderConfirmation.tsx
├── components/         # Reusable components
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   ├── HomeMadeFoodCard.tsx
│   └── RestaurantFoodCard.tsx
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── lib/               # Library files
│   ├── supabase.ts
│   └── database.types.ts
├── App.tsx            # Main app routing
├── main.tsx           # Entry point
└── index.css          # Tailwind styles
```

## Database Schema

The application uses the following tables:

### profiles
- User profile information
- Linked to Supabase auth.users

### chefs
- Home-made food sellers (chefs)
- Contains chef profile and brand info

### restaurants
- Restaurant information
- Hotel names, cities, addresses

### home_made_foods
- Food items from chefs
- Includes pre-booking hours requirement

### restaurant_made_foods
- Food items from restaurants
- Standard food ordering

### cart_items
- User shopping cart items
- References home_made or restaurant foods

### orders
- Completed orders
- Payment and delivery info

### order_items
- Items in each order
- Order history tracking

## Features

### Authentication
- Email/password signup and login
- Indian phone number validation
- Profile management with address

### Home Page
- Browse home-made food from chefs
- Browse restaurant food
- Filter by categories (Meals, Snacks, Desserts)
- View chef/restaurant information

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent storage via Supabase

### Checkout
- Delivery address management
- Order summary
- Razorpay payment integration

### Order Management
- Order confirmation page
- Order history tracking
- Order ID and details display

## Color Theme

- **Primary (Ocean Blue):** #0A4D68
- **Secondary (Teal Green):** #088395
- **Accent (Warm Orange):** #F39C12
- **Background:** #FFFFFF

## Indian Specifics

- **Currency:** Indian Rupees (₹)
- **Phone Number:** 10-digit Indian mobile validation
- **Food Types:** South Indian cuisine focus
  - Idli, Dosa, Vada, Pongal
  - Biryani, Meals, Snacks, Desserts

## Testing

### Demo Credentials
- Create account with any email
- Use 10-digit mobile number (6-9 followed by 9 digits)
- Test password: min 6 characters

### Test Payment
- If Razorpay key not configured, app shows demo payment prompt
- Orders still created successfully in test mode

## Troubleshooting

### Port already in use
```bash
# Use different port
npm run dev -- --port 3001
```

### Missing environment variables
- Ensure .env file exists with all required variables
- Restart dev server after updating .env

### Database connection errors
- Verify Supabase credentials
- Check if tables exist in database
- Ensure Row Level Security (RLS) policies are correct

## Customization

### Add Food Items
Insert into `home_made_foods` or `restaurant_made_foods` table

### Modify Colors
Update Tailwind color values in component classNames (e.g., #0A4D68 → custom color)

### Change Currency
Update "₹" symbol in components to desired currency

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- Vercel (recommended)
- Netlify
- GitHub Pages (with routing config)
- Traditional hosting with build folder

## Support

For issues or questions:
- Check Supabase documentation
- Review Razorpay integration docs
- Check React Router documentation

## License

MIT License - Feel free to use for personal or commercial projects
