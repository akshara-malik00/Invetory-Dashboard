import "./Distribution.css";

function DistributionItem({ name, percent, color }) {
  return (
    <div className="distitem">
      <div className="distitem-row">
        <span>{name}</span>
        <span>{percent}</span>
      </div>
      <div className="distbar">
        <div
          className="distbar-fill"
          style={{ width: percent, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

export function Distribution() {
  return (
    <div className="distribution">
      <h3>Inventory Distribution</h3>
      <div className="distcontent">
        <DistributionItem name="Warehouse Alpha" percent="82%" color="#1baf7a" />
        <DistributionItem name="Warehouse Beta" percent="74%" color="#eda100" />
        <DistributionItem name="Wrehouse Gama" percent="12%" color="#ed2000ff" />
      </div>
    </div>
  );
}
