import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ProductProvider } from './contexts/ProductContext';
import { FavoriteProductsProvider } from "./contexts/FavoriteContext";
import { CartProductsProvider } from './contexts/CartContext';
import { OrdersProvider } from "./contexts/OrderContext";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignIn from "./Auth/LoginPage";
import SignUp from "./Auth/SignUp";
import { CurrentUserProvider } from "./contexts/userContext"; 
import PaymentOption from "./pages/ProfilePage/PaymentOption";
import Order from "./pages/ProfilePage/Order";
import OrderItem from "./pages/Order/OrderItem";
import Checkout from "./pages/Order/Checkout";
import DetailPage from "./pages/DetailPage/DetailPage";
import Favorite from "./pages/Favorite/favorite";

import NewIn from "./Screens/NewIn";
import AgyemangDevSobolo from "./Screens/AgyemangDevSobolo";
import Laptops from "./Screens/Laptops";
import Men from "./Screens/Men";
import Women from "./Screens/Women";
import ElectronicAccessories from "./Screens/ElectronicAccessories";
import MobilePhones from "./Screens/MobilePhones";
import Perfumes from "./Screens/Perfumes";
import Footwear from "./Screens/Footwear";
import JelwelryAccessories from "./Screens/JewelryAccessories";
import Electronics from "./Screens/Electronics";
import Cosmetics from "./Screens/Cosmetics";
import OrderDetails from "./pages/Order/OrderDetails";

function App() {
  return (
    <CurrentUserProvider>
    <ProductProvider>
    <CartProductsProvider>
    <FavoriteProductsProvider>
    <OrdersProvider>
      <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/payment-options" element={<PaymentOption />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orders-details/:orderId" element={<OrderDetails />} />


          <Route path="/products/:id" element={<DetailPage />} />
          <Route path="/favorite-collection" element={<Favorite />} />
          <Route path="/cart-item" element={<OrderItem />} />
          <Route path="/checkout" element={<Checkout />} />
          
          <Route path="/new-in" element={<NewIn />}/>
          <Route path="/agyemangdev-sobolo" element={<AgyemangDevSobolo />}/>
          <Route path="/laptops" element={<Laptops />}/>
          <Route path="/men-clothing" element={<Men />}/>
          <Route path="/women-clothing" element={<Women />}/>
          <Route path="/electronics-accesories" element={<ElectronicAccessories />}/>
          <Route path="/mobile-phones" element={<MobilePhones />}/>
          <Route path="/perfumes" element={<Perfumes />}/>
          <Route path="/footwear" element={<Footwear />}/>
          <Route path="/jewelry-accessories" element={<JelwelryAccessories />}/>
          <Route path="/electronics" element={<Electronics />}/>
          <Route path="/cosmetics" element={<Cosmetics />}/>
        </Routes>
      </Router>
      </OrdersProvider>
      </FavoriteProductsProvider>
      </CartProductsProvider>
      </ProductProvider>
    </CurrentUserProvider>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  
  const noNavbarRoutes = ['/profile', '/sign-in', '/sign-up'];
  
  return !noNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
}

export default App;
