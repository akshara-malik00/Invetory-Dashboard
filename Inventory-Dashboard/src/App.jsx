import { useState } from "react";
import "./App.css";
import { SideBar } from "./components/SideBar";
import { TopBar } from "./components/TopBar";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";

import { AddProduct } from "./pages/AddProduct";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { ProductData } from './data/productData.js';
import { Products } from "./pages/Products";
function App() {
  const [products, setProducts] = useState(ProductData);

  function addProduct(newProduct) {
    setProducts((prev) => [...prev, newProduct]);
  }

  return (
    <div className="app-layout">
      <SideBar />
      <div className="main-content">
        <TopBar />
        <Routes>
          <Route index element={<Dashboard />}></Route>
          <Route path="Products" element = {<Products products={products} />} />
          <Route path="Add-Product" element = {<AddProduct onAddProduct={addProduct} />} />
          <Route path="Analytics" element = {<Analytics />} />
          <Route path="Settings" element = {<Settings />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
 