import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ShoppingCart,
  LogOut,
  Waves,
  User,
  UtensilsCrossed,
  Home
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const { user, signOut, profile } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) fetchCartCount();
  }, [user]);

  const fetchCartCount = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('user_id', user.id);

    if (!error && data) {
      const total = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-[#0A4D68] to-[#088395] p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0A4D68] to-[#088395] bg-clip-text text-transparent">
              Crave Wave
            </span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              {/* User Name */}
              <div className="hidden md:flex items-center space-x-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="font-medium">
                  {profile?.full_name || 'User'}
                </span>
              </div>

              {/* Food Links */}
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/restaurant"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <UtensilsCrossed className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 font-medium">
                    Restaurant
                  </span>
                </Link>

                <Link
                  to="/homemade"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Home className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 font-medium">
                    Homemade
                  </span>
                </Link>
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F39C12] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="hidden sm:inline text-gray-700">
                  Cart
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
