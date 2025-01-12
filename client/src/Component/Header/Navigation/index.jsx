import { Button } from "@mui/material";

import { Link } from "react-router-dom";


const Navigation = () => {


  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 navPart1">
            <div className="catWrapper ">
              <Link to="cat/1">  <Button 
                className="allCatTab align-items-center "
              >
          
                <span className="text">ALL CATEGORIES</span>
              </Button></Link>
          
            </div>
          </div>
          <div className="col-sm-10 navPart2 d-flex align-items-center">
            <ul className="list list-inline w-100 ml-auto">
              <li className="list-inline-item ">
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/cat/1?category=6767166319696c44689ca691">
                  <Button>Fashion</Button>
                </Link>
                <div className="submenu shadow">
            
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/cat/1?category=6767167019696c44689ca693">
                  <Button>ELECTRONICS</Button>
                </Link>
                <div className="submenu shadow">
          
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/cat/1?category=6767167a19696c44689ca695">
                  <Button>Market</Button>
                </Link>
                <div className="submenu shadow">
                
                </div>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Gift</Button>
                </Link>
                
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Blog</Button>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <Button>Contact Us</Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
