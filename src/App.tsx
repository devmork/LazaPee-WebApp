import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import SellerForm from "./pages/SellerForm";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import { Toaster } from "@/components/ui/sonner";
import SellerProfileEdit from "./pages/SellerProfileEdit";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductList />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/start-selling" element={<SellerForm />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="seller/profile/edit" element={<SellerProfileEdit />} />
            <Route path="seller/products/new" element={<AddProduct />} />
          </Route>
        </Routes>


      {/* ← Add the Toaster here, outside Routes but inside BrowserRouter */}
      <Toaster
        richColors
        closeButton
        position="top-center"
        duration={8000}
      />

      </BrowserRouter>
  );
}

export default App;
