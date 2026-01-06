# Crave Wave - Indian Food Ordering App

A modern, full-stack Indian food ordering web application built with React, TypeScript, Supabase, and Tailwind CSS.

## Features

- **User Authentication** - Secure signup and login with Supabase Auth
- **Browse Foods** - Explore home-made and restaurant-made South Indian cuisine
- **Smart Filtering** - Filter foods by categories (Meals, Snacks, Desserts)
- **Chef Information** - View home chef profiles and kitchen brands
- **Shopping Cart** - Add/remove items with persistent Supabase storage
- **Secure Checkout** - Manage delivery address and order summary
- **Razorpay Integration** - Secure payment processing (test mode available)
- **Order Management** - Order confirmation and history tracking
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Indian Specifics** - INR currency, 10-digit phone validation, South Indian focus

## Quick Start

### Prerequisites
- Node.js v16+
- npm
- Supabase account

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
# Edit .env with your Supabase credentials

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173
```

## Project Structure

```
src/
├── pages/                    # Page components
│   ├── Login.tsx            # Authentication
│   ├── SignUp.tsx           # User registration
│   ├── Home.tsx             # Food browsing
│   ├── Cart.tsx             # Shopping cart
│   ├── Checkout.tsx         # Payment
│   └── OrderConfirmation.tsx # Order success
├── components/              # Reusable components
│   ├── Navbar.tsx           # Navigation
│   ├── ProtectedRoute.tsx   # Auth guard
│   ├── HomeMadeFoodCard.tsx # Chef food display
│   └── RestaurantFoodCard.tsx # Restaurant food display
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Authentication state
├── lib/                     # Library files
│   ├── supabase.ts         # Supabase client
│   └── database.types.ts   # Type definitions
├── App.tsx                  # Main routing
├── main.tsx                 # Entry point
└── index.css               # Tailwind styles
```

## Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Routing:** React Router v7
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payment:** Razorpay
- **Icons:** Lucide React
- **Build Tool:** Vite

## Database Schema

### Core Tables
- `profiles` - User profiles with address info
- `chefs` - Home chef information
- `restaurants` - Restaurant information
- `home_made_foods` - Foods from chefs (with pre-booking)
- `restaurant_made_foods` - Foods from restaurants
- `cart_items` - Shopping cart per user
- `orders` - Order history
- `order_items` - Items in each order

## Configuration

### Environment Variables (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key (optional)
```

### Color Theme
- Primary Ocean Blue: `#0A4D68`
- Secondary Teal: `#088395`
- Accent Orange: `#F39C12`

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

## Setup Instructions

### 1. Supabase Setup
- Create Supabase project
- Run migration to create database schema
- Get Project URL and Anon Key

### 2. Environment Configuration
- Copy Supabase credentials to .env
- (Optional) Add Razorpay test key

### 3. Start Development
```bash
npm install
npm run dev
```

### 4. Add Sample Data
- Follow SAMPLE_DATA.md for populating foods, chefs, and restaurants

## Key Pages

### Login & Signup
- Email/password authentication
- Indian phone number validation (10 digits)
- Address field for delivery

### Home
- Browse home-made foods from chefs
- Browse restaurant-made foods
- Filter by categories
- View chef/restaurant details

### Cart
- View cart items with images
- Update quantities
- Remove items
- Calculate total price

### Checkout
- Manage delivery address
- View order summary
- Razorpay payment integration

### Order Confirmation
- Order number with copy-to-clipboard
- Order summary
- Delivery address
- Support contact info

## Features in Detail

### Authentication
- Secure signup with profile creation
- Persistent login state
- Protected routes with role guards

### Food Browsing
- Two separate sections (Home-Made & Restaurant)
- Category filtering (Meals, Snacks, Desserts)
- Real-time quantity updates
- Pre-booking requirements for home-made food

### Cart Management
- Persistent Supabase storage
- Add/remove functionality
- Quantity adjustments
- Auto-calculated totals

### Payment
- Razorpay integration with test mode
- Demo payment option if key not configured
- Secure order creation

### Order Management
- Unique order numbers
- Payment status tracking
- Delivery address storage
- Order history

## Customization Guide

### Change Colors
Update Tailwind classes in components:
- Replace `#0A4D68` with your primary color
- Replace `#088395` with your secondary color
- Replace `#F39C12` with your accent color

### Add New Features
1. Create components in `src/components/`
2. Create pages in `src/pages/`
3. Add routes in `src/App.tsx`
4. Update Supabase schema as needed

### Modify Food Categories
Change category options in Home.tsx CategoryFilter

## Testing

### Test Account
- Email: any@example.com
- Password: any6+chars
- Phone: 9876543210 (10 digits)

### Test Payment
- Use Razorpay test key or demo mode
- Test order creation and confirmation

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- Vercel (recommended)
- Netlify
- GitHub Pages
- Traditional hosting

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations
- Code splitting with React Router
- Image lazy loading
- CSS minification with Tailwind
- Vite optimized builds

## Security Features
- Supabase Row Level Security (RLS)
- Secure authentication
- Protected routes
- HTTPS only (production)

## Common Issues

### Port Already in Use
```bash
npm run dev -- --port 3001
```

### Missing Supabase Keys
- Verify .env file exists
- Check credentials are correct
- Restart dev server

### Build Errors
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## Support & Documentation

- [Supabase Docs](https://supabase.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Razorpay Docs](https://razorpay.com/docs)

## License

MIT License - Free to use for personal or commercial projects

## Contributing

Feel free to fork, modify, and improve this project!

---

**Ready to order delicious South Indian food?** Start with `npm run dev` and enjoy Crave Wave!
