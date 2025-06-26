import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home.jsx';
import About from '@/pages/About.jsx';
import Contact from '@/pages/Contact.jsx';
import Shop from '@/pages/Shop.jsx';
import ProductDetail from '@/pages/ProductDetail.jsx';
import CartPage from '@/pages/Cart.jsx';
import Checkout from '@/pages/Checkout.jsx';
import Dashboard from '@/pages/Dashboard.jsx';
import AdminPanel from '@/pages/AdminPanel.jsx';
import LoginPage from '@/pages/Login.jsx';
import SignupPage from '@/pages/Signup.jsx';
import AdminLoginPage from '@/pages/AdminLogin.jsx';

import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import AdminProductContextProvider from './contexts/AdminProductContext';
import ContactProvider from './contexts/ContactContext';
import AdminBlogProvider from './contexts/AdminBlogContext';
import Blog from './pages/Blog';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


const AppLayout = () => {
  const location = useLocation();


  const hideLayout = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!hideLayout && <Navbar />}

      <main className="flex-1 bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AdminProductContextProvider>
            <ContactProvider>
              <AdminBlogProvider>
                <Router>
                  <AppLayout />
                </Router>
              </AdminBlogProvider>
            </ContactProvider>
          </AdminProductContextProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
