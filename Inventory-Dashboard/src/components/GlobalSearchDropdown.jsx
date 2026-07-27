import './GlobalSearchDropdown.css';

// Presentational only: given a list of matching products, renders them (or an
// empty state). All matching/navigation logic lives in the caller (TopBar).
export function GlobalSearchDropdown({ results, onSelect }) {
  return (
    <div className="globalSearchDropdown">
      {results.length === 0 ? (
        <div className="globalSearchEmpty">No products found</div>
      ) : (
        results.map((product) => (
          <button
            type="button"
            key={product.id}
            className="globalSearchResult"
            onClick={onSelect}
          >
            <img
              className="globalSearchThumbnail"
              src={product.thumbnail}
              alt={product.productName}
            />
            <div className="globalSearchDetails">
              <span className="globalSearchName">{product.productName}</span>
              <span className="globalSearchCategory">{product.category}</span>
              <span className="globalSearchSku">SKU: {product.sku}</span>
            </div>
          </button>
        ))
      )}
    </div>
  );
}
