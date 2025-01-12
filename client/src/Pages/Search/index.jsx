import Sidebar from "../../Component/SideBar";
import Button from "@mui/material/Button";
import { IoMenuOutline } from "react-icons/io5";
import { PiSquaresFourFill } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { useEffect, useState ,useRef   } from "react";
import ProductItem from "../../Component/ProductItem";
import Pagination from "@mui/material/Pagination";
import { fetchDataFromApi } from "../../utils/api";

const SearchPage = () => {
  const [productView, setProductView] = useState("three");
  const [page, setCurrentPage] = useState(1); // Track current page
  const [productData, setProductData] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Track total pages
  const [filters, setFilters] = useState({
    name: "",
    brands: [],
    categories: [],
    priceRange: [0, 1000],
  });
  const isInitialRender = useRef(true);

  const handleSearch = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (isInitialRender.current) {
      const queryParams = new URLSearchParams(location.search);
      const search = queryParams.get("search") || "";

      if (search) {
        // Only update filters once
        setFilters((prev) => ({
          ...prev,
          name: search,
        }));
      }
      isInitialRender.current = false; // Mark the initial render as complete
    } else {
      // Fetch data whenever filters or page change
      const queryParams = new URLSearchParams();

      if (filters.name) queryParams.set("name", filters.name);
      if (filters.brands.length) queryParams.set("brand", filters.brands.join(","));
      if (filters.categories.length) queryParams.set("category", filters.categories.join(","));
      queryParams.set("minPrice", filters.priceRange[0]);
      queryParams.set("maxPrice", filters.priceRange[1]);
      queryParams.set("page", page);

      fetchDataFromApi(`/api/products?${queryParams.toString()}`)
        .then((res) => {
          setProductData(res.products || []);
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [filters, page]);

  

  // Handle page change for pagination
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div>
      <section className="product_Listing_Page">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar onFilterChange={setFilters} />

            <div className="content_right">
           

              <div className="showBy mt-3 mb-3 d-flex align-items-center">
                <div className="d-flex align-item-center btnWrapper">
                  <Button onClick={() => setProductView("one")}>
                    <IoMenuOutline />
                  </Button>
                  <Button onClick={() => setProductView("two")}>
                    <PiSquaresFourFill />
                  </Button>
                  <Button onClick={() => setProductView("three")}>
                    <CgMenuGridR />
                  </Button>
                </div>
              </div>

              <div className="productListing">
                {productData.map((product) => (
                  <ProductItem key={product.id} item={product} itemView={productView} />
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
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
