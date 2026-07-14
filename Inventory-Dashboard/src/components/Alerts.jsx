import "./Alerts.css";

function AlertItem({ title, subtitle, actions }) {
  return (
    <div className="alertitem">
      <p className="title">{title}</p>
      <p className="subtitle">{subtitle}</p>
      <p className="actions">{actions}</p>
    </div>
  );
}

export function Alerts() {
  return (
    <div className="alerts">
      <h2>Critical Alerts</h2>
      <div className="alertcontent">
        <AlertItem
          title="8 items out of stock"
          subtitle="Immediate reorder suggested for high-demand SKUs "
          actions="PROCESS ORDERS"
        />
        <AlertItem
          title="Low stock warning"
          subtitle="42 items below threshold in category- electronics"
          actions="REVIEW STOCK"
        />
      </div>
    </div>
  );
}
