import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { ProductDetail } from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import BuyedProduct from "./pages/KvittoPage";
import TestPage from "./pages/TestPage";
import TestProfile from "./pages/TestProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/buyedProducts" element={<BuyedProduct />} />
        <Route path="/TestPath" element={<TestPage />} />
        <Route path="profile" element={<TestProfile />} />
      </Routes>
    </div>
  );
}

export default App;
