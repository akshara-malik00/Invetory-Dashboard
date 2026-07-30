import "./Analytics.css";
import "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  buildMonthKeys,
  buildStockByCategory,
  buildInventoryValueTrend,
  buildStockInByMonth,
  buildSimulatedStockOut,
  getMonthLabel,
} from "../utils/analyticsData";

// Validated categorical palette (fixed hue order, adjacent-pair CVD-safe).
// Categories now come from the API rather than a known fixed set, so slots
// are assigned by rank (largest category first) instead of by name.
const CATEGORY_PALETTE = [
  "#2a78d6", // blue
  "#eb6834", // orange
  "#1baf7a", // aqua
  "#eda100", // yellow
  "#e87ba4", // magenta
  "#008300", // green
  "#4a3aa7", // violet
];
// Reserved for the "Other" bucket, never used for a real category, so an
// aggregated slice never impersonates a real one.
const OTHER_CATEGORY_COLOR = "#898781";
const OTHER_CATEGORY_LABEL = "Other";

// DummyJSON's real category list can run well past what a pie chart (or the
// palette) can carry legibly. Keep the largest categories as their own
// slices and fold the rest into a single "Other" slice.
function foldIntoTopCategories(categoryTotals, maxSlices = CATEGORY_PALETTE.length) {
  if (categoryTotals.length <= maxSlices) return categoryTotals;

  const topCategories = categoryTotals.slice(0, maxSlices - 1);
  const remainingCategories = categoryTotals.slice(maxSlices - 1);
  const otherTotal = remainingCategories.reduce((sum, [, quantity]) => sum + quantity, 0);
  return [...topCategories, [OTHER_CATEGORY_LABEL, otherTotal]];
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: (context) => `₹${context.parsed.y.toLocaleString()}`,
      },
    },
  },
  interaction: { mode: "index", intersect: false },
  scales: {
    x: { grid: { display: false } },
    y: {
      grid: { color: "#eeeeee" },
      ticks: { callback: (value) => `₹${value.toLocaleString()}` },
    },
  },
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 12,
        usePointStyle: true,
        padding: 10,
        font: { size: 11 },
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed} units`,
      },
    },
  },
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true } },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: "#eeeeee" } },
  },
};

export function Analytics({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="Analytics">
        <h2>Analytics Overview</h2>
        <p>Real-time performance metrics and inventory forecasting</p>
        <p className="chartEmptyState">No products yet — charts will populate once inventory is added.</p>
      </div>
    );
  }

  const categoryTotals = foldIntoTopCategories(buildStockByCategory(products));
  const stockByCategory = {
    labels: categoryTotals.map(([category]) => category),
    datasets: [
      {
        data: categoryTotals.map(([, quantity]) => quantity),
        backgroundColor: categoryTotals.map(([category], index) =>
          category === OTHER_CATEGORY_LABEL ? OTHER_CATEGORY_COLOR : CATEGORY_PALETTE[index]
        ),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const monthKeys = buildMonthKeys(products);
  const monthLabels = monthKeys.map(getMonthLabel);

  const inventoryValueTrend = {
    labels: monthLabels,
    datasets: [
      {
        label: "Inventory Value",
        data: buildInventoryValueTrend(products, monthKeys),
        borderColor: "#145fb9ff",
        backgroundColor: "rgba(20, 95, 185, 0.1)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#145fb9ff",
      },
    ],
  };

  const stockIn = buildStockInByMonth(products, monthKeys);
  const monthlyStockMovement = {
    labels: monthLabels,
    datasets: [
      {
        label: "Stock In",
        data: stockIn,
        backgroundColor: "#145fb9ff",
        borderRadius: 4,
      },
      {
        label: "Stock Out (demo)",
        data: buildSimulatedStockOut(stockIn),
        backgroundColor: "#cfe0f4ff",
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="Analytics">
      <h2>Analytics Overview</h2>
      <p>Real-time performance metrics and inventory forecasting</p>
      <div className="mainone">
        <div className="linegraph">
          <h3>Inventory Value Trend</h3>
          <div className="linegraphCanvas">
            <Line data={inventoryValueTrend} options={lineOptions} />
          </div>
          <p className="chartNote">Based on quantity/price at the time each product was added to inventory.</p>
        </div>
        <div className="piegraph">
          <h3>Stock by Category</h3>
          <div className="piegraphCanvas">
            <Pie data={stockByCategory} options={pieOptions} />
          </div>
        </div>
      </div>
      <div className="maintwo">
        <div className="barGraph">
          <h3>Monthly Stock Movement</h3>
          <div className="barGraphCanvas">
            <Bar data={monthlyStockMovement} options={barOptions} />
          </div>
          <p className="chartNote">Stock In reflects real inventory additions. Stock Out is a demo estimate — sales/removal history isn't tracked yet.</p>
        </div>
      </div>
    </div>
  );
}
