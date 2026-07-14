import "./App.css";
import { SideBar } from "./components/SideBar";
import { TopBar } from "./components/TopBar";
import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { AddProduct } from "./pages/AddProduct";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
function App() {
  return (
    <div className="app-layout">
      <SideBar />
      <div className="main-content">
        <TopBar />
        <Routes>
          <Route index element={<Dashboard />}></Route>
          <Route path="Products" element = {<Products />} /> 
          <Route path="Add-Product" element = {<AddProduct />} /> 
          <Route path="Analytics" element = {<Analytics />} /> 
          <Route path="Settings" element = {<Settings />} /> 
        </Routes>
      </div>
    </div>
  );
}
export default App;
