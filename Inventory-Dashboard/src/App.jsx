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
import { DEFAULT_LOW_STOCK_THRESHOLD } from './utils/inventoryStatus';

const LOW_STOCK_THRESHOLD_STORAGE_KEY = 'inventory-dashboard:lowStockThreshold';

function readStoredThreshold() {
  const stored = Number(localStorage.getItem(LOW_STOCK_THRESHOLD_STORAGE_KEY));
  return Number.isInteger(stored) && stored > 0 ? stored : DEFAULT_LOW_STOCK_THRESHOLD;
}

function App() {
  const [products, setProducts] = useState(ProductData);
  const [lowStockThreshold, setLowStockThreshold] = useState(readStoredThreshold);

  function updateLowStockThreshold(value) {
    setLowStockThreshold(value);
    localStorage.setItem(LOW_STOCK_THRESHOLD_STORAGE_KEY, String(value));
  }

  function addProduct(newProduct) {
    setProducts((prev) => [...prev, newProduct]);
  }

  function updateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <div className="app-layout">
      <SideBar />
      <div className="main-content">
        <TopBar products={products} />
        <Routes>
          <Route index element={<Dashboard products={products} lowStockThreshold={lowStockThreshold} />}></Route>
          <Route path="Products" element = {<Products products={products} onDeleteProduct={deleteProduct} lowStockThreshold={lowStockThreshold} />} />
          <Route path="Add-Product" element = {<AddProduct products={products} onAddProduct={addProduct} />} />
          <Route path="Edit-Product/:id" element = {<AddProduct products={products} onUpdateProduct={updateProduct} />} />
          <Route path="Analytics" element = {<Analytics products={products} />} />
          <Route path="Settings" element = {<Settings lowStockThreshold={lowStockThreshold} onLowStockThresholdChange={updateLowStockThreshold} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
 