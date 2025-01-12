import { FaBoxes } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="topInfo row">
          <div className="col d-flex align-items-center">
            <span>
              <FaBoxes />
            </span>
            <span className="ml-2">Best products on the market</span>
          </div>

          <div className="col d-flex align-items-center">
            <span>
              <TbTruckDelivery />
            </span>
            <span className="ml-2">Fast and Safe Delivery</span>
          </div>

          <div className="col d-flex align-items-center">
            <span>
              <RiDiscountPercentFill />
            </span>
            <span className="ml-2">Daily Mega Discount</span>
          </div>

          <div className="col d-flex align-items-center">
            <span>
              <IoIosPricetags />
            </span>
            <span className="ml-2">Best Price on the market</span>
          </div>
        </div>

        <div className="row mt-5 linksWrap">
          <div className="col">
            <h5>FASHION</h5>
            <ul>
              <li>
                <Link to="#">Clothing</Link>
              </li>
              <li>
                <Link to="#">Shoes</Link>
              </li>{" "}
              <li>
                <Link to="#">Personal Care</Link>
              </li>{" "}
              <li>
                <Link to="#">Accessories</Link>
              </li>{" "}
              <li>
                <Link to="#">Watches</Link>
              </li>
            </ul>
          </div>

          <div className="col">
            <h5>ELECTRONICS</h5>
            <ul>
              <li>
                <Link to="#">Clothing</Link>
              </li>
              <li>
                <Link to="#">Shoes</Link>
              </li>{" "}
              <li>
                <Link to="#">Personal Care</Link>
              </li>{" "}
              <li>
                <Link to="#">Accessories</Link>
              </li>{" "}
              <li>
                <Link to="#">Watches</Link>
              </li>
            </ul>
          </div>

          <div className="col">
            <h5>MARKET</h5>
            <ul>
              <li>
                <Link to="#">Clothing</Link>
              </li>
              <li>
                <Link to="#">Shoes</Link>
              </li>{" "}
              <li>
                <Link to="#">Personal Care</Link>
              </li>{" "}
              <li>
                <Link to="#">Accessories</Link>
              </li>{" "}
              <li>
                <Link to="#">Watches</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright mt-3 pt-3 pb-3 d-flex">
          <p className="mb-0">
            {" "}
            Copyright 2024.All rights reserved. Designed and developed by{" "}
            <a
              href="https://halilsaltas.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Halil ibrahim SALTAS
            </a>
            .
          </p>
          <ul className="list list-inline ml-auto mb-0">
            {" "}
            <li className="list-inline-item">
              <Link to="#">
                <FaFacebookF />
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#">
                <FaXTwitter />
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#">
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
