import './SideBar.css'
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
            <li>< MdOutlineDashboard className='icon' />Dashoard</li>
            <li>< AiOutlineProduct className='icon' />Products</li>
            <li>< MdAdd className='icon' /> Add Product</li>
            <li><IoAnalyticsSharp className='icon' />Analytics</li>
            <li>< IoSettingsOutline className='icon' />Settings</li>
        </ul>
        <div className="user-info">
            <img src={userPhoto} alt="user"></img>
            <p>Akshara Malik</p>
        </div>
        </div>
    );
}