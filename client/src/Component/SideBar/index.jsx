import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import Slider from "@mui/material/Slider";
import "react-range-slider-input/dist/style.css";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";

import { useParams } from "react-router-dom";

const CATEGORY_MAP = {
  "6767166319696c44689ca691": "Fashion",
  "6767167019696c44689ca693": "Electronics",
  "6767167a19696c44689ca695": "Home Appliances",
  "6766d65783e04165cc423364": "Other",
};

const Sidebar = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const { id } = useParams();

  useEffect(() => {
    fetchDataFromApi("/api/products/filters")
      .then((res) => {
        setBrands(res.brands || []);
        setCategories(res.categories || []);
      })
      .catch((err) => console.error("Error fetching filters:", err));
  }, []);

  const handleCheckboxChange = (type, value) => {
    let updated;

    if (type === "brand") {
      updated = selectedBrands.includes(value)
        ? selectedBrands.filter((b) => b !== value)
        : [...selectedBrands, value];
      setSelectedBrands(updated);
    } else if (type === "category") {
      updated = selectedCategories.includes(value)
        ? selectedCategories.filter((c) => c !== value)
        : [...selectedCategories, value];
      setSelectedCategories(updated);
    }

    onFilterChange({
      brands: type === "brand" ? updated : selectedBrands,
      categories: type === "category" ? updated : selectedCategories,
      priceRange,
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({
      brands: selectedBrands,
      categories: selectedCategories,
      priceRange: newValue,
    });
  };

  return (
    <div className="sidebar">
      <div className="sticky">
        <div className="filterbox">
          <h6>PRODUCT CATEGORIES</h6>

          <div className="scroll">
            <ul>
              {Object.entries(CATEGORY_MAP).map(([value, name]) => (
                <li key={value}>
                 
                    <FormControlLabel 
                      
                      control={<Checkbox onChange={() => handleCheckboxChange("category", value)}/>}

                    />
                    {name}
                 
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="filterbox">
          <h6>FILTER BY PRICE</h6>
          <Slider
            className="text-purple"
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={18000}
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-dark">${priceRange[0]}</strong>
            </span>
            <span className="ml-auto">
              From: <strong className="text-dark">${priceRange[1]}</strong>
            </span>
          </div>
        </div>

        <div className="filterbox">
          <h6>BRANDS</h6>

          <div className="scroll">
            <ul>
              {brands.map((brand) => (
                <li key={brand}>
                
                    <FormControlLabel
                      control={<Checkbox onChange={() => handleCheckboxChange("brand", brand)}/>}
                    />
                    {brand}
               
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
