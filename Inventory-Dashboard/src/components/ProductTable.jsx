import './ProductTable.css';
import { ProductRow } from './ProductRow';

function getStatus(quantity) {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= 10) return 'Low Stock';
    return 'In Stock';
}

export function ProductTable({ products = [], searchQuery = '' }){
    const query = searchQuery.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {
        if (!query) return true; //will return all if there is no query (hence all the data) 
        return (
            product.productName?.toLowerCase().includes(query) || 
            product.sku?.toLowerCase().includes(query)
        );
    });
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

            {filteredProducts.map((product) => (
                <ProductRow
                    key={product.id}
                    image={product.thumbnail}
                    name={product.productName}
                    sku={product.sku}
                    category={product.category}
                    quantity={product.quantity}
                    price={product.unitPrice}
                    status={getStatus(product.quantity)}
                />
            ))}

            <div className='tablePagination'>
                <p>Showing 1-{filteredProducts.length} of {filteredProducts.length} products</p>
                <div className='paginationButtons'>
                    <button>Previous</button>
                    <button className='activePage'>1</button>
                    <button>Next</button>
                </div>
            </div>
       </div>
    );
}
