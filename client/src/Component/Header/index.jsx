import { Link } from "react-router-dom";
import Logo from "../../assets/images/icons8-sell-stock-96.png";
import { Button } from "@mui/material";
import { BsBasket3Fill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { useEffect, useContext, useState } from "react";
import MyContext from "../../context/MyContext";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const context = useContext(MyContext);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
    setTimeout(() => {
      window.location.reload();
    }, 500);
    
  };

  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-purple">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              {" "}
              <b>New Year's </b> Special Brand Days
            </p>
          </div>
        </div>

        <header className="header">
          <div className="container">
            <div className="row ">
              <div className="logoWrapper d-flex align-items-center col-sm-2 ">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo" />
                </Link>
                <span className="logoName">Purple Market</span>
              </div>

              <div className="col-sm-10 d-flex align-items-center part2">
                <SearchBox />

                <div className="part3 d-flex align-items-center ml-auto">
                  <nav>
                    {isLoggedIn ? (
                      <><Link to="/dashboard"><Button className="circle ml-2">
                          <FaUser />
                        </Button></Link>
                         <Link to="/cart">  <Button className="cartTab mr-3 "><BsBasket3Fill /></Button></Link>
                       {/*<span className="count d-flex align-items-center   justify-content-center">1</span>*/}
                        <Button
                          className="btn-purple  btn-round btn-lg  mt-3 mb-2 ml-4"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/signIn">
                          <Button className="btn-purple btn-lg btn-round btn-big w-100 mt-3 mb-2 ml-4">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/signUp">
                          <Button className="btn-purple  btn-round btn-big w-100 mt-3 mb-2 ml-4">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Navigation />
      </div>
    </>
  );
};

export default Header;
