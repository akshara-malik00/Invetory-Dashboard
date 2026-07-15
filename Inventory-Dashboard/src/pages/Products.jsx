import { SearchFilters } from '../components/SearchFilters';
import { ProductTable } from '../components/ProductTable';
import './Products.css'; 
export function Products() {
  return (
    <>
      <div>
        <div class='ProductsHeading'>
          <h2>Products</h2>
          <p>
            Manage your global inventory and stock values across all categories.
          </p>
        </div>
        < SearchFilters /> 
        < ProductTable /> 
      </div>
    </>
  );
}
