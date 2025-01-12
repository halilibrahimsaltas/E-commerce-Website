import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./Products";
import Categories from "./Categories";
import Users from "./Users";

const Dashboard = () => {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">E-Commerce Dashboard</h1>
        <div className="row mt-5">
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/dashboard/products">Manage Products</Link>
              </li>
              <li className="list-group-item">
                <Link to="/dashboard/categories">Manage Categories</Link>
              </li>
              <li className="list-group-item">
                <Link to="/dashboard/users">Manage Users</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/categories" element={<Categories />} />
              <Route path="/dashboard/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    
  );
};

export default Dashboard;
