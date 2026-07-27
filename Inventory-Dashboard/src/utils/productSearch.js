// Shared, case-insensitive matcher used by both the TopBar global search
// and the Products page search, so the two never drift out of sync.
export function matchesProductSearch(product, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return (
    product.productName?.toLowerCase().includes(normalizedQuery) ||
    product.sku?.toLowerCase().includes(normalizedQuery) ||
    product.category?.toLowerCase().includes(normalizedQuery)
  );
}
