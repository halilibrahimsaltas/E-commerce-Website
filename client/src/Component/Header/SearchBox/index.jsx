import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { fetchDataFromApi } from "../../../utils/api";
import MyContext from "../../../context/MyContext";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
  const [searchFields, setSearchFields] = useState("");
  

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeValue = (e) => {
    setSearchFields(e.target.value);
    //searchProducts();
  };

  const searchProducts = () => {
    navigate(`/search?search=${searchFields}`);
  };

  return (
    <div className="headerSearch ml-3 mr-3">
      <input
        type="text"
        placeholder="Search for products by name or brand..."
        onChange={onChangeValue}
        value={searchFields}
      />
      <Button onClick={searchProducts} >
        { <IoSearch />}
      </Button>
    </div>
  );
};

export default Searchbox;