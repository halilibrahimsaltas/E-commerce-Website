import React, { useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
  ]);

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <button className="btn btn-primary mb-3">Add New Category</button>
      <ul className="list-group">
        {categories.map((category) => (
          <li
            key={category.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {category.name}
            <div>
              <button className="btn btn-warning btn-sm">Edit</button>{" "}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
