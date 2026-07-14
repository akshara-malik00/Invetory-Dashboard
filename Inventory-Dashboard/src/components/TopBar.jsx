import './TopBar.css'
import { FaBell } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
export function TopBar(){
    return(
        <div className="topbar">
            <div className="topbar-row">
                <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input className="search-input" placeholder='Search Inventory, SKU or orders '></input>
                </div>
                <div className="topbar-icons">
                    <FaBell className="topbar-icon" />
                    <FaQuestion className="topbar-icon" />
                </div>
            </div>
            <hr />
        </div>
    );
}