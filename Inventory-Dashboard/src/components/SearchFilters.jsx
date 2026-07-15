import './SearchFilters.css'
import { BsSearch } from "react-icons/bs";
export function SearchFilters(){
    return (
        <div className='searchFilters'>
            <div className='searchprod'>
                <p>Search Product/SKU</p>
                <div className='searchInputWrapper'>
                    <BsSearch className='searchIcon' />
                    <input placeholder='e.g. Wireless Mouse'></input>
                </div>
            </div>
            <div className='category'>
                <p>Category</p>
                <select>
                    <option>All Categories</option>
                </select>
            </div>
            <div className='stockstatus'>
                <p>Stock Status</p>
                <select>
                    <option>All Statuses</option>
                </select>
            </div>
            <div className='reset'>
                <button>Reset Filters</button>
            </div>
        </div>


    );
}