import './SideBar.css'
import { NavLink } from "react-router";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import userPhoto from '../assets/user.jpg'
export function SideBar (){
    return (
        <div className="sidebar">
        <h1>Inventory Pro</h1>
        <ul>
            <li><NavLink to="/"><MdOutlineDashboard className='icon' />Dashboard</NavLink></li>
            <li><NavLink to="/Products"><AiOutlineProduct className='icon' />Products</NavLink></li>
            <li><NavLink to="/Add-Product"><MdAdd className='icon' />Add Product</NavLink></li>
            <li><NavLink to="/Analytics"><IoAnalyticsSharp className='icon' />Analytics</NavLink></li>
            <li><NavLink to="/Settings"><IoSettingsOutline className='icon' />Settings</NavLink></li>
        </ul>
        <div className="user-info">
            <img src={userPhoto} alt="user"></img>
            <p>Akshara Malik</p>
        </div>
        </div>
    );
}