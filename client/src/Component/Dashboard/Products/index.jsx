import React, { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: "$100" },
    { id: 2, name: "Product B", price: "$200" },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <button className="btn btn-primary mb-3">Add New Product</button>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-warning btn-sm">Edit</button>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
