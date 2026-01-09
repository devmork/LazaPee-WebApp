import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import SellerForm from "./pages/SellerForm";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProductList />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/start-selling" element={<SellerForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
