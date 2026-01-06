# Crave Wave - Quick Start Guide

Get up and running with Crave Wave in 5 minutes!

## Step 1: Check Environment Setup (1 minute)

Your Supabase credentials are already configured in `.env`:
```
VITE_SUPABASE_URL=https://zhnpdelyhegoqnppgzcc.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

The database schema is already created with all required tables.

## Step 2: Install Dependencies (2 minutes)

```bash
npm install
```

## Step 3: Start Development Server (1 minute)

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

## Step 4: Create Test Account (1 minute)

1. Click "Sign Up"
2. Enter:
   - **Full Name:** Your Name
   - **Email:** test@example.com
   - **Mobile:** 9876543210 (10 digits)
   - **Password:** Test@123
   - **Address:** Your Address

3. Login with your credentials

## Step 5: Add Sample Data (Optional, but recommended)

To see foods and restaurants in the app:

1. Go to [Supabase Dashboard](https://supabase.co)
2. Navigate to SQL Editor
3. Run the SQL commands from `SAMPLE_DATA.md`
4. Refresh the app to see the data

## Explore the App

### Home Page
- Browse Home-Made Food (from local chefs)
- Browse Restaurant-Made Food
- Filter by categories (Meals, Snacks, Desserts)

### Add to Cart
- Click "Add to Cart" on any food item
- Quantity will update in navbar

### Shopping Cart
- View `/cart` page
- Update quantities or remove items
- See total price

### Checkout
- Enter delivery address
- Click "Pay Now"
- Use demo payment (no Razorpay key needed) or configure Razorpay

### Order Confirmation
- View order number
- See order summary
- Click to continue shopping

## Key Features to Test

- **Authentication:** Signup → Login → Browse
- **Filtering:** Home → Select "Snacks" category
- **Cart:** Add items → View cart
- **Checkout:** Proceed to checkout
- **Payment:** Test demo payment flow
- **Orders:** View order confirmation

## Configuration Files

All configuration is done! But if you need to customize:

### Environment Variables (.env)
```
VITE_SUPABASE_URL        # Already set
VITE_SUPABASE_ANON_KEY   # Already set
VITE_RAZORPAY_KEY_ID     # Optional (test mode available)
```

### Colors (in components)
- Primary Blue: `#0A4D68`
- Secondary Teal: `#088395`
- Accent Orange: `#F39C12`

## Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run linter
npm run typecheck       # Check TypeScript types
```

## Project Structure

```
Crave Wave/
├── src/
│   ├── pages/          # Login, SignUp, Home, Cart, Checkout, OrderConfirmation
│   ├── components/     # Navbar, ProtectedRoute, Food Cards
│   ├── contexts/       # AuthContext for state management
│   ├── lib/           # Supabase config and types
│   ├── App.tsx        # Main routing
│   └── main.tsx       # Entry point
├── .env               # Environment variables (configured)
├── SETUP.md          # Detailed setup guide
├── SAMPLE_DATA.md    # Demo data insertion
└── README.md         # Full documentation
```

## Database Tables (Already Created)

✓ profiles - User information
✓ chefs - Home cook details
✓ restaurants - Restaurant details
✓ home_made_foods - Chef's food items
✓ restaurant_made_foods - Restaurant food items
✓ cart_items - Shopping cart
✓ orders - Order history
✓ order_items - Items in orders

## Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Can't see foods
- Add sample data using SAMPLE_DATA.md
- Verify Supabase tables have data
- Check browser console for errors

### Login doesn't work
- Verify email format is correct
- Check password is 6+ characters
- Ensure mobile number is 10 digits

### Build fails
- Check Node.js version: `node --version` (v16+ required)
- Run `npm install` again
- Clear .next/dist folders: `rm -rf dist`

## Next Steps

1. **Customize:** Update colors in components
2. **Add Foods:** Insert items in Supabase tables
3. **Deploy:** Run `npm run build` and deploy to Vercel/Netlify
4. **Extend:** Add new features like favorites, ratings, etc.

## Useful Links

- [Supabase Docs](https://supabase.com/docs) - Database help
- [React Docs](https://react.dev) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Razorpay](https://razorpay.com/docs) - Payment integration

## Support

For issues:
1. Check the full SETUP.md guide
2. Review console errors (F12)
3. Check Supabase dashboard for data
4. Verify environment variables in .env

---

**That's it! Crave Wave is ready to use.** 🍽️🌊

Start with: `npm run dev`
