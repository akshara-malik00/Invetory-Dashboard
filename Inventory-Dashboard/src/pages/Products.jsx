import { useState } from 'react';
import { SearchFilters } from '../components/SearchFilters';
import { ProductTable } from '../components/ProductTable';
import './Products.css'; 
export function Products({ products }) {
    const [searchQuery, setSearchQuery] = useState(""); 
  return (
    <>
      <div>
        <div className='ProductsHeading'>
          <h2>Products</h2>
          <p>
            Manage your global inventory and stock values across all categories.
          </p>
        </div>
        < SearchFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        < ProductTable products={products} searchQuery={searchQuery} />
      </div>
    </>
  );
}
