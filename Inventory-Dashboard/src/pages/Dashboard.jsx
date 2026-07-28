import { SummaryCard } from "../components/SummaryCard";
import { BsClipboardCheck } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { BsExclamationDiamond } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { ProductUpdates } from "../components/ProductUpdates";
import { Alerts } from "../components/Alerts";
import { Distribution } from "../components/Distribution";
import { DEFAULT_LOW_STOCK_THRESHOLD, getStatusKey } from "../utils/inventoryStatus";
import './Dashboard.css';

export function Dashboard({ products = [], lowStockThreshold = DEFAULT_LOW_STOCK_THRESHOLD }){
    const totalProducts = products.length;
    const lowStockCount = products.filter((product) => getStatusKey(product.quantity, lowStockThreshold) === 'lowStock').length;
    const outOfStockCount = products.filter((product) => getStatusKey(product.quantity, lowStockThreshold) === 'outOfStock').length;
    const categoryCount = new Set(products.map((product) => product.category).filter(Boolean)).size;

    return(
        <>
        <h1>System Overview</h1>
        <p>Good morning, Akshara. Here's what happened today.</p>
        <div className="summaryCards">
          <SummaryCard
            heading="TOTAL PRODUCTS"
            value={totalProducts.toLocaleString()}
            icon={<BsClipboardCheck />}
            color="rgba(171, 197, 244, 1)"
            iconColor="rgba(25, 94, 244, 1)"
          />
          <SummaryCard
            heading="LOW STOCK"
            value={lowStockCount}
            icon={<BiError />}
            color="rgba(246, 226, 189, 1)"
            iconColor="rgba(238, 145, 5, 1)"
          />
          <SummaryCard
            heading="OUT OF STOCK"
            value={outOfStockCount}
            icon={<BsExclamationDiamond />}
            color="rgba(234, 158, 158, 1)"
            iconColor="rgb(220, 38, 38)"
          />
          <SummaryCard
            heading="CATEGORIES"
            value={categoryCount}
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