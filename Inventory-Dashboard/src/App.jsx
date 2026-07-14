import "./App.css";
import { SideBar } from "./components/SideBar";
import { SummaryCard } from "./components/SummaryCard";
import { TopBar } from "./components/TopBar";
import { BsClipboardCheck } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { BsExclamationDiamond } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { ProductUpdates } from "./components/ProductUpdates";
import { Alerts } from "./components/Alerts";

function App() {
  return (
    <div className="app-layout">
      <SideBar />
      <div className="main-content">
        <TopBar />
        <h1>System Overview</h1>
        <p>Good morning, Akshara. Here's what happened today.</p>
        <div className="summaryCards">
          <SummaryCard
            heading="TOTAL PRODUCTS"
            value="1,284"
            icon={<BsClipboardCheck />}
            color="rgb(81, 135, 236)"
          />
          <SummaryCard
            heading="LOW STOCK"
            value="42"
            icon={<BiError />}
            color="rgb(235, 168, 53)"
          />
          <SummaryCard
            heading="OUT OF STOCK"
            value="8"
            icon={<BsExclamationDiamond />}
            color="rgb(220, 68, 68)"
          />
          <SummaryCard
            heading="CATEGORIES"
            value="24"
            icon={<MdOutlineCategory />}
            color="rgb(94, 179, 120)"
          />
        </div>
        <div className="main-1">
          <ProductUpdates />
          <Alerts />

        </div>
        
      </div>
    </div>
  );
}

export default App;
