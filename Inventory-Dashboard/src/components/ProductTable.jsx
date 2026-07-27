import { useState } from 'react';
import { useNavigate } from 'react-router';
import './ProductTable.css';
import { ProductRow } from './ProductRow';
import { matchesProductSearch } from '../utils/productSearch';

// How many product rows to show on each page.
const ROWS_PER_PAGE = 3;

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

export function ProductTable({ products = [], searchQuery = '', category = '', stockStatus = '', onDeleteProduct }){
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const filteredProducts = products.filter((product) => {
        // Each filter is "on" only if the user picked something for it.
        // An empty value ('') means "don't filter on this" -> always matches.
        const matchesSearch = matchesProductSearch(product, searchQuery);

        const matchesCategory =
            !category || product.category?.toLowerCase() === category.toLowerCase();

        const matchesStock =
            !stockStatus || getStatusKey(product.quantity) === stockStatus;

        // A product only shows up if it passes ALL active filters.
        return matchesSearch && matchesCategory && matchesStock;
    });

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ROWS_PER_PAGE));

    // If a filter shrinks the results and we're on a page that no longer exists, snap back.
    const page = Math.min(currentPage, totalPages);

    const startIndex = (page - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    const productsOnPage = filteredProducts.slice(startIndex, endIndex);

    function goToPage(pageNumber) {
        setCurrentPage(pageNumber);
    }

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

            {productsOnPage.map((product) => (
                <ProductRow
                    key={product.id}
                    image={product.thumbnail}
                    name={product.productName}
                    sku={product.sku}
                    category={product.category}
                    quantity={product.quantity}
                    price={product.unitPrice}
                    status={STATUS_LABELS[getStatusKey(product.quantity)]}
                    onEdit={() => navigate(`/Edit-Product/${product.id}`)}
                    onDelete={() => {
                        if (window.confirm(`Delete "${product.productName}"?`)) {
                            onDeleteProduct(product.id);
                        }
                    }}
                />
            ))}

            <div className='tablePagination'>
                <p>
                    Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                </p>
                <div className='paginationButtons'>
                    <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={pageNumber === page ? 'activePage' : ''}
                            onClick={() => goToPage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            </div>
       </div>
    );
}
