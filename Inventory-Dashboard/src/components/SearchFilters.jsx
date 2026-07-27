// import { useState } from "react";
import "./SearchFilters.css";
import { BsSearch } from "react-icons/bs";

export function SearchFilters({
  searchQuery,
  setSearchQuery, 
  category,
  setCategory,
  stockStatus,
  setStockStatus,
}) {
  // Clears every filter back to its empty/default value.
  function handleReset() {
    setSearchQuery("");
    setCategory("");
    setStockStatus("");
  }

  return (
    <div className="searchFilters">
      <div className="searchprod">
        <label htmlFor="searchProduct">Search Product/SKU</label>
        <div className="searchInputWrapper">
          <BsSearch className="searchIcon" />
          <input
            id="searchProduct"
            name="searchProduct"
            placeholder="e.g. Wireless Mouse"
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="category">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Laptops">Laptops</option>
          <option value="Phones">Phones</option>
          <option value="Tablets">Tablets</option>
          <option value="Audio">Audio</option>
          <option value="Accessories">Accessories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Wearables">Wearables</option>
          <option value="Smart Home">Smart Home</option>
        </select>
      </div>
      <div className="stockstatus">
        <label htmlFor="stockStatus">Stock Status</label>
        <select
          id="stockStatus"
          name="stockStatus"
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="inStock">In Stock</option>
          <option value="lowStock">Low Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>
      <div className="reset">
        <button type="button" onClick={handleReset}>Reset Filters</button>
      </div>
    </div>
  );
}
