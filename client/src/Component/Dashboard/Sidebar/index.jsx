import Button from "@mui/material/Button";
import { LuCircleUser } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { FaBox } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
    const navigate = useNavigate();


    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);  
    }

    const logout=()=>{
      localStorage.clear();
      setTimeout(() => {
        navigate("/");
      }, 500);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    

    }

  return (
    <div className="sidebar  p-3">
      <h4>Dashboard</h4>
      <ul className="dashSideBarWrapper">

          <li>
          <Link to="">
            <Button className="w-100">
              <span className="icon">
                {" "}
                <LuCircleUser />
              </span>
              User
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            </Link>
          </li>
        
          <li>
          
            <Button className={`w-100 ${activeTab===1 && isToggleSubmenu===true  ? 'active' : ''}`} onClick={()=>isOpenSubmenu(1)}>
              <span className="icon">
                {" "}
                <AiFillProduct />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`subMenuWrapper ${activeTab===1  && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}> 
                <ul className="subMenu">
                <li>
                    <Link to="/product/list">Product List</Link>
                </li>
                <li>
                    <Link to="/product/upload">Product Upload</Link>
                </li>
            </ul>

            </div>
           
          </li>
        

      
          <li>
            <Button className={`w-100 ${activeTab===2 && isToggleSubmenu===true ?  'active' : ''}`} onClick={()=>isOpenSubmenu(2)}>
              <span className="icon">
                {" "}
                <TbCategoryPlus />
              </span>
              Categories
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`subMenuWrapper ${activeTab===2  && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}> 
                <ul className="subMenu">
                <li>
                    <Link to="/category/list">Category List</Link>
                </li>
                <li>
                    <Link to="/category/add">Add Category</Link>
                </li>
            </ul>

            </div>
           
          </li>
        

      
          <li>
          
            <Button className={`w-100 ${activeTab===3  && isToggleSubmenu===true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(3)}>
              <span className="icon">
                {" "}
                <FaBox />
              </span>
              Orders
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`subMenuWrapper ${activeTab===3  && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}> 
                <ul className="subMenu">
               
                <li>
                    <Link to="/cart/">Orders View</Link>
                </li>

            </ul>

            </div>
            
          </li>
      </ul>


      <br />
      <div className="logoutWrapper">
        <Button  onClick={logout} variant="contained" className="w-50"><RiLogoutBoxLine />Logout</Button>

      </div>
    </div>
  );
};
export default Sidebar;
