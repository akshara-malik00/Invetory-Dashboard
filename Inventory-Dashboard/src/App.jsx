import { useEffect, useState } from "react";
import "./App.css";
import { SideBar } from "./components/SideBar";
import { TopBar } from "./components/TopBar";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AddProduct } from "./pages/AddProduct";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { Products } from "./pages/Products";
import { DEFAULT_LOW_STOCK_THRESHOLD } from "./utils/inventoryStatus";
import {
  getProducts,
  addProduct as addProductRequest,
  updateProduct as updateProductRequest,
  deleteProduct as deleteProductRequest,
} from "./api/productApi";

const LOW_STOCK_THRESHOLD_STORAGE_KEY = "inventory-dashboard:lowStockThreshold";
//loads the saved value when the app starts.
function readStoredThreshold() {
  const stored = Number(localStorage.getItem(LOW_STOCK_THRESHOLD_STORAGE_KEY));
  return Number.isInteger(stored) && stored > 0
    ? stored
    : DEFAULT_LOW_STOCK_THRESHOLD;
}

function App() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);
  const [lowStockThreshold, setLowStockThreshold] =
    useState(readStoredThreshold);

  // Fetches the product catalog once, when the app first loads, so every
  // route (Dashboard, Products, Analytics, TopBar search) shares one
  // up-to-date list instead of each page fetching its own copy.
  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setIsLoadingProducts(true);
      setProductsError(null);
      try {
        const fetchedProducts = await getProducts();
        if (isMounted) setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
        if (isMounted)
          setProductsError("Failed to load products. Please try again later.");
      } finally {
        if (isMounted) setIsLoadingProducts(false);
      }
    }

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);
//saves the new value when the user changes it.
  function updateLowStockThreshold(value) {
    setLowStockThreshold(value);
    localStorage.setItem(LOW_STOCK_THRESHOLD_STORAGE_KEY, String(value));
  }

  async function addProduct(newProduct) {
    const savedProduct = await addProductRequest(newProduct);
    setProducts((prev) => [...prev, savedProduct]);
  }

  async function updateProduct(updatedProduct) {
    const savedProduct = await updateProductRequest(
      updatedProduct.id,
      updatedProduct,
    );
    setProducts((prev) =>
      prev.map((product) =>
        product.id === savedProduct.id ? savedProduct : product,
      ),
    );
  }

  async function deleteProduct(id) {
    try {
      await deleteProductRequest(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    }
  }

  return (
    <div className="app-layout">
      <SideBar />
      <div className="main-content">
        <TopBar products={products} />
        <Routes>
          <Route
            index
            element={
              <Dashboard
                products={products}
                lowStockThreshold={lowStockThreshold}
              />
            }
          ></Route>
          <Route
            path="Products"
            element={
              <Products
                products={products}
                onDeleteProduct={deleteProduct}
                lowStockThreshold={lowStockThreshold}
                isLoading={isLoadingProducts}
                error={productsError}
              />
            }
          />
          <Route
            path="Add-Product"
            element={
              <AddProduct products={products} onAddProduct={addProduct} />
            }
          />
          <Route
            path="Edit-Product/:id"
            element={
              <AddProduct products={products} onUpdateProduct={updateProduct} />
            }
          />
          <Route path="Analytics" element={<Analytics products={products} />} />
          <Route
            path="Settings"
            element={
              <Settings
                lowStockThreshold={lowStockThreshold}
                onLowStockThresholdChange={updateLowStockThreshold}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
