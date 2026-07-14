import { cloneElement } from "react";
import "./SummaryCard.css";
export function SummaryCard({ heading, value, icon, color }) {
  return (
    <div className={"summarycard"}>
      {cloneElement(icon, {
        className: "summaryicon",
        style: { backgroundColor: color },
      })}
      <p>{heading}</p>
      <h1>{value}</h1>
    </div>
  );
}
