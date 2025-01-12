import Sidebar from "../../Component/SideBar";
import Button from "@mui/material/Button";
import { IoMenuOutline } from "react-icons/io5";
import { PiSquaresFourFill } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { useEffect, useState } from "react";
import ProductItem from "../../Component/ProductItem";
import Pagination from '@mui/material/Pagination';

import { useParams,  useNavigate, useLocation } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const Listing = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setProductView] = useState('three');
    const [page, setCurrentPage] = useState(1); // Track current page
    const [productData, setProductData] = useState([]);
    const [totalPages, setTotalPages] = useState(0); // Track total pages
    const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    priceRange: [0, 12000],
     });
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  const {id}=useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (filters.brands.length) {
      queryParams.set("brand", filters.brands.join(","));
    } else if (queryParams.has("brand")) {
      filters.brands = queryParams.get("brand").split(",");
    }

    if (filters.categories.length) {
      queryParams.set("category", filters.categories.join(","));
    } else if (queryParams.has("category")) {
      filters.categories = queryParams.get("category").split(",");
    }

    if (!filters.priceRange) {
      filters.priceRange = [
        parseInt(queryParams.get("minPrice")) || 0,
        parseInt(queryParams.get("maxPrice")) || 12000,
      ];
    } else {
      queryParams.set("minPrice", filters.priceRange[0]);
      queryParams.set("maxPrice", filters.priceRange[1]);
    }

    queryParams.set("page", page);

    fetchDataFromApi(`/api/products?${queryParams.toString()}`)
      .then((res) => {
        setProductData(res.products || []);
        setTotalPages(res.totalPages || 0);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [filters, page, location.search]);



  // Handle page change for pagination
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };



  
  return (
    <div>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar onFilterChange ={setFilters} />

            <div className="content_right">
              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-item-center btnWrapper">
                  <Button onClick={()=>setProductView('one')}>
                    <IoMenuOutline />
                  </Button>
                  <Button onClick={()=>setProductView('two')}>
                    <PiSquaresFourFill />
                  </Button>
                  <Button onClick={()=>setProductView('three')}>
                    <CgMenuGridR />
                  </Button>
                </div>

              
              </div>

              <div className="productListing">
              {productData.map((product) => (
             <ProductItem key={product.id} item={product} itemView= {productView}/>
              ))}
              </div>
              <div className="d-flex align-items-center justify-content-center mt-5">
               <Pagination  
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                  color="secondary"
                  className="pagination"
                  showFirstButton
                  showLastButton
                  size="large" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listing;
