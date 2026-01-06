import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLayout from './components/ProtectedLayout';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import RestaurantFood from './pages/RestaurantFood';
import HomeMadeFood from './pages/HomeMadeFood';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Temporary dev routes (bypass auth) */}
          <Route path="/dev/home" element={<Home />} />
          <Route path="/dev/restaurant" element={<RestaurantFood />} />
          <Route path="/dev/homemade" element={<HomeMadeFood />} />
          <Route path="/dev/cart" element={<Cart />} />
          <Route path="/dev/checkout" element={<Checkout />} />
          <Route
            path="/dev/order-confirmation/:orderId"
            element={<OrderConfirmation />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant" element={<RestaurantFood />} />
              <Route path="/homemade" element={<HomeMadeFood />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-confirmation/:orderId"
                element={<OrderConfirmation />}
              />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dev/home" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
