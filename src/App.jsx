import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import CheckoutLayout from './components/layout/CheckoutLayout';
import AuthLayout from './components/layout/AuthLayout';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckoutAddress from './pages/CheckoutAddress';
import CheckoutPayment from './pages/CheckoutPayment';
import CheckoutConfirmation from './pages/CheckoutConfirmation';
import Contact from './pages/Contact';
import CustomStudio from './pages/CustomStudio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Auth from './pages/Auth';
import Account from './pages/Account';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Dedicated Atelier Admin Dashboard (Full workspace layout) */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

            {/* Standalone Distraction-Free Auth Pages (NO Standard Header & NO Standard Footer) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Navigate to="/login" replace />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/register" element={<Navigate to="/signup" replace />} />
              <Route path="/auth" element={<Auth />} />
            </Route>

            {/* Distraction-Free Luxury Checkout (NO Standard Header & NO Standard Footer) */}
            <Route path="/checkout" element={<CheckoutLayout />}>
              <Route index element={<Navigate to="/checkout/address" replace />} />
              <Route path="address" element={<CheckoutAddress />} />
              <Route path="shipping" element={<Navigate to="/checkout/address" replace />} />
              <Route path="payment" element={<CheckoutPayment />} />
              <Route path="confirmation" element={<CheckoutConfirmation />} />
              <Route path="success" element={<Navigate to="/checkout/confirmation" replace />} />
            </Route>

            {/* Main Website Pages (With Standard Header & Footer) */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="men" element={<Men />} />
              <Route path="women" element={<Women />} />
              <Route path="custom-studio" element={<CustomStudio />} />
              <Route path="custom" element={<Navigate to="/custom-studio" replace />} />
              <Route path="studio" element={<Navigate to="/custom-studio" replace />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsConditions />} />
              <Route path="terms" element={<TermsConditions />} />
              <Route path="account" element={<Account />} />
              <Route path="profile" element={<Navigate to="/account" replace />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
