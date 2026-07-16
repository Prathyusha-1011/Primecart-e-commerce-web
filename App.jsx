import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './index.css';

function ScrollToTop() {
  // Scroll to top on route change
  const { pathname } = window.location;
  return null;
}

function Layout({ children }) {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', padding: '100px 24px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>404</div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '12px' }}>Page Not Found</h2>
                  <a href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>← Go Home</a>
                </div>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
