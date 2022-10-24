import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { ProductDetail } from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
      </Routes>
    </div>
  );
}

export default App;
