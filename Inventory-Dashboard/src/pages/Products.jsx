import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { SearchFilters } from '../components/SearchFilters';
import { ProductTable } from '../components/ProductTable';
import './Products.css';
export function Products({ products, onDeleteProduct, lowStockThreshold, isLoading, error }) {
    const [searchParams] = useSearchParams();
    const urlSearchQuery = searchParams.get('search') || '';
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
    const [category, setCategory] = useState("");
    const [stockStatus, setStockStatus] = useState("");
                   
    // Picks up a query the TopBar global search sent via ?search=, even if
    // we're already sitting on the Products page. Adjusting state during
    // render (rather than in an effect) avoids an extra render pass.
    const [appliedUrlQuery, setAppliedUrlQuery] = useState(urlSearchQuery);
    if (urlSearchQuery && urlSearchQuery !== appliedUrlQuery) {
        setAppliedUrlQuery(urlSearchQuery);
        setSearchQuery(urlSearchQuery);
    }
  return (
    <>
      <div>
        <div className='ProductsHeading'>
          <h2>Products</h2>
          <p>
            Manage your global inventory and stock values across all categories.
          </p>
        </div>
        < SearchFilters
          products={products}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
        />
        {isLoading ? (
          <p className='productsStatusMessage'>Loading products…</p>
        ) : error ? (
          <p className='productsStatusMessage productsStatusError'>{error}</p>
        ) : products.length === 0 ? (
          <p className='productsStatusMessage'>No products found.</p>
        ) : (
          < ProductTable
            products={products}
            searchQuery={searchQuery}
            category={category}
            stockStatus={stockStatus}
            onDeleteProduct={onDeleteProduct}
            lowStockThreshold={lowStockThreshold}
          />
        )}
      </div>
    </>
  );
}
