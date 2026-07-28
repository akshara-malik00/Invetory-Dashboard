// Turns the raw products list into the shapes the Analytics charts need.
// Kept separate from Analytics.jsx so the derivation logic (what counts as
// "this month", how value accumulates) can be reasoned about without the
// chart.js/rendering noise.

function getMonthKey(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getMonthLabel(key) {
    const [year, month] = key.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'short' });
}

function buildMonthRange(startKey, endKey) {
    const [startYear, startMonth] = startKey.split('-').map(Number);
    const [endYear, endMonth] = endKey.split('-').map(Number);
    const cursor = new Date(startYear, startMonth - 1, 1);
    const end = new Date(endYear, endMonth - 1, 1);
    const keys = [];
    while (cursor <= end) {
        keys.push(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`);
        cursor.setMonth(cursor.getMonth() + 1);
    }
    return keys;
}

// The shared x-axis for both the value trend and the stock movement chart:
// every month from the earliest product's createdAt through the current month.
export function buildMonthKeys(products) {
    if (products.length === 0) return [];
    const currentKey = getMonthKey(new Date());
    const createdKeys = products.map((product) => getMonthKey(product.createdAt));
    const earliestKey = createdKeys.reduce((min, key) => (key < min ? key : min));
    const latestKey = createdKeys.reduce((max, key) => (key > max ? key : max), currentKey);
    return buildMonthRange(earliestKey, latestKey);
}

// Groups current stock quantity by category. Real data, straight from products —
// no history needed. Sorted descending so the largest slices lead the legend.
export function buildStockByCategory(products) {
    const totals = new Map();
    products.forEach((product) => {
        const category = product.category || 'Uncategorized';
        totals.set(category, (totals.get(category) || 0) + product.quantity);
    });
    return [...totals.entries()]
        .filter(([, quantity]) => quantity > 0)
        .sort((a, b) => b[1] - a[1]);
}

// Approximates cumulative inventory value using each product's createdAt as a
// proxy for "when this stock entered inventory". Real data (quantity, price,
// createdAt all come from the product records) but an approximation: we don't
// track historical quantity/price changes, so a product's full current value
// is attributed to its creation month rather than tracking real restocks.
export function buildInventoryValueTrend(products, monthKeys) {
    const valueByMonth = new Map();
    products.forEach((product) => {
        const key = getMonthKey(product.createdAt);
        valueByMonth.set(key, (valueByMonth.get(key) || 0) + product.quantity * product.unitPrice);
    });

    let cumulative = 0;
    return monthKeys.map((key) => {
        cumulative += valueByMonth.get(key) || 0;
        return cumulative;
    });
}

// Real: how much quantity was added to inventory that month, from createdAt.
export function buildStockInByMonth(products, monthKeys) {
    const inByMonth = new Map();
    products.forEach((product) => {
        const key = getMonthKey(product.createdAt);
        inByMonth.set(key, (inByMonth.get(key) || 0) + product.quantity);
    });
    return monthKeys.map((key) => inByMonth.get(key) || 0);
}

// No sales/removal history exists in the data model yet, so there is no real
// "stock out" figure to derive. This is a clearly-labeled demo estimate
// (a deterministic fraction of that month's real stock-in), not measured data.
export function buildSimulatedStockOut(stockIn) {
    return stockIn.map((value, index) => Math.round(value * (0.55 + 0.1 * Math.sin(index))));
}
