import './SearchFilters.css'
import { BsSearch } from "react-icons/bs";
export function SearchFilters(){
    return (
        <div className='searchFilters'>
            <div className='searchprod'>
                <label htmlFor='searchProduct'>Search Product/SKU</label>
                <div className='searchInputWrapper'>
                    <BsSearch className='searchIcon' />
                    <input id='searchProduct' name='searchProduct' placeholder='e.g. Wireless Mouse'></input>
                </div>
            </div>
            <div className='category'>
                <label htmlFor='category'>Category</label>
                <select id='category' name='category'>
                    <option value=''>All Categories</option>
                    <option value='laptops'>Laptops</option>
                    <option value='phones'>Phones</option>
                    <option value='tablets'>Tablets</option>
                </select>
            </div>
            <div className='stockstatus'>
                <label htmlFor='stockStatus'>Stock Status</label>
                <select id='stockStatus' name='stockStatus'>
                    <option value=''>All Statuses</option>
                    <option value='inStock'>In Stock</option>
                    <option value='lowStock'>Low Stock</option>
                    <option value='outOfStock'>Out of Stock</option>
                </select>
            </div>
            <div className='reset'>
                <button type='button'>Reset Filters</button>
            </div>
        </div>


    );
}