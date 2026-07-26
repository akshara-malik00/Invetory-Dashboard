import './ProductTable.css';
import { ProductRow } from './ProductRow';

// Turns a quantity into one of the same 3 keys used by the Stock Status dropdown,
// so we can compare "what the user picked" with "what the product actually is".
function getStatusKey(quantity) {
    if (quantity === 0) return 'outOfStock';
    if (quantity <= 10) return 'lowStock';
    return 'inStock';
}

// Human-readable label shown in the table, looked up from the key above.
const STATUS_LABELS = {
    outOfStock: 'Out of Stock',
    lowStock: 'Low Stock',
    inStock: 'In Stock',
};

export function ProductTable({ products = [], searchQuery = '', category = '', stockStatus = '' }){
    const query = searchQuery.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {
        // Each filter is "on" only if the user picked something for it.
        // An empty value ('') means "don't filter on this" -> always matches.
        const matchesSearch =
            !query ||
            product.productName?.toLowerCase().includes(query) ||
            product.sku?.toLowerCase().includes(query);

        const matchesCategory =
            !category || product.category?.toLowerCase() === category.toLowerCase();

        const matchesStock =
            !stockStatus || getStatusKey(product.quantity) === stockStatus;

        // A product only shows up if it passes ALL active filters.
        return matchesSearch && matchesCategory && matchesStock;
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
                    status={STATUS_LABELS[getStatusKey(product.quantity)]}
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
