import './ProductTable.css';
import { ProductRow } from './ProductRow';
import mac from '../assets/mac.png';
import iphone from '../assets/iphone.png';
import ipad from '../assets/ipad.png';

export function ProductTable(){
    return(
       <div className='productTable'>
            <div className='tableHeader'>
                <div className='col colThumbnail'>Thumbnail</div>
                <div className='col colName'>Product Name</div>
                <div className='col colSku'>SKU</div>
                <div className='col colCategory'>Category</div>
                <div className='col colQuantity'>Quantity</div>
                <div className='col colPrice'>Unit Price</div>
                <div className='col colStatus'>Status</div>
                <div className='col colActions'>Actions</div>
            </div>

            <ProductRow
                image={mac}
                name="MacBook Air M2"
                sku="MBA-M2-256"
                category="Laptops"
                quantity={42}
                price="999"
                status="In Stock"
            />
            <ProductRow
                image={iphone}
                name="iPhone 15"
                sku="IPH-15-128"
                category="Phones"
                quantity={5}
                price="799"
                status="Low Stock"
            />
            <ProductRow
                image={ipad}
                name="iPad Pro"
                sku="IPD-PRO-256"
                category="Tablets"
                quantity={0}
                price="1099"
                status="Out of Stock"
            />

            <div className='tablePagination'>
                <p>Showing 1-3 of 3 products</p>
                <div className='paginationButtons'>
                    <button>Previous</button>
                    <button className='activePage'>1</button>
                    <button>Next</button>
                </div>
            </div>
       </div>
    );
}
