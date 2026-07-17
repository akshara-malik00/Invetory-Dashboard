import { SummaryCard } from "../components/SummaryCard";
import { BsClipboardCheck } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { BsExclamationDiamond } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { ProductUpdates } from "../components/ProductUpdates";
import { Alerts } from "../components/Alerts";
import { Distribution } from "../components/Distribution";
import './Dashboard.css'; 

// const productNumber = 0; 
// const lowStock =0; 

// function 




export function Dashboard(){
    return(
        <>
        <h1>System Overview</h1>
        <p>Good morning, Akshara. Here's what happened today.</p>
        <div className="summaryCards">
          <SummaryCard
            heading="TOTAL PRODUCTS"
            value="1,284"
            icon={<BsClipboardCheck />}
            color="rgba(171, 197, 244, 1)"
            iconColor="rgba(25, 94, 244, 1)"
          />
          <SummaryCard
            heading="LOW STOCK"
            value="42"
            icon={<BiError />}
            color="rgba(246, 226, 189, 1)"
            iconColor="rgba(238, 145, 5, 1)"
          />
          <SummaryCard
            heading="OUT OF STOCK"
            value="8"
            icon={<BsExclamationDiamond />}
            color="rgba(234, 158, 158, 1)"
            iconColor="rgb(220, 38, 38)"
          />
          <SummaryCard
            heading="CATEGORIES"
            value="24"
            icon={<MdOutlineCategory />}
            color="rgba(193, 241, 208, 1)"
            iconColor="rgba(9, 166, 66, 1)"
          />
        </div>
        <div className="main-1">
          <ProductUpdates />
          <Alerts />
        </div>
        <div className="main-2">
          <Distribution /> 
 
        </div>
        </>
        
    );
}