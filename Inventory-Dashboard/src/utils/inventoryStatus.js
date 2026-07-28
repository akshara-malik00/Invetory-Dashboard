export const DEFAULT_LOW_STOCK_THRESHOLD = 10;

export const STATUS_LABELS = {
    outOfStock: 'Out of Stock',
    lowStock: 'Low Stock',
    inStock: 'In Stock',
};

// Shared by the dashboard summary cards, the product table's status badges,
// and the stock-status filter, so all three always agree on what "low stock" means.
export function getStatusKey(quantity, threshold = DEFAULT_LOW_STOCK_THRESHOLD) {
    if (quantity === 0) return 'outOfStock';
    if (quantity <= threshold) return 'lowStock';
    return 'inStock';
}
