import React, { useEffect, useState, useContext, useRef } from "react";
import Sidebar from "../../Component/Dashboard/Sidebar";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BsCloudUploadFill } from "react-icons/bs";
import { fetchDataFromApi } from "../../utils/api";
import { postData } from "../../utils/api";


const ProductUpload = () => {
  const [catData, setCatData] = useState([]);
  const [categoryVal, setcategoryVal] = useState("");
  const [error_, setError] = useState(false);
  const [success_, setSuccess] = useState(false);
  const [productImagesArr, setproductImagesArr] = useState([]);
  


  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi("/api/categories/")
      .then((data) => {
        setCatData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    oldPrice: 0,
    category: "",
    countInStock: 0,
    images:[],
  });

  const productImages = useRef();

  const handleChangeCategory = (event) => {
    setcategoryVal(event.target.value);
    setFormFields(() => ({
      ...formFields,
      category: event.target.value,
    }));
  };

  const addProductImages = () => {
    // Add the new image URL to the productImagesArr state
    setproductImagesArr((prevArray) => [
      ...prevArray,
      productImages.current.value,
    ]);
  
    // Clear the input field
    productImages.current.value = [];
  };

  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const addProduct = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    formFields.images = productImagesArr;
    if(formFields.name!=="" && formFields.category!=="" && formFields. countInStock!=="" && formFields.price!==""  ){
        postData('/api/products/create',formFields).then((data) => {
          setFormFields({
            name: "",
            description: "",
            brand: "",
            price: 0,
            oldPrice: 0,
            category: "",
            countInStock: 0,
            images:[],
          });
          setSuccess(true);
      })
      .catch((error) => {
          console.log(error);
      });
    }else{
      setError(true);
    }

  
  };

  return (
    <div className="main d-flex mt-4">
      <div className="sidebarWrapper">
        <Sidebar />
      </div>

      <div className="content w-100 ">
        <div className="card  shadow border-0 p-3 mt-4">
          <h3>Product Upload</h3>
        </div>

        <form className="form" onSubmit={addProduct}>
          <div className="row">
            <div className="col">
              <div className="card p-4">
                <h5 className="mb-4">Informations</h5>
                {error_ === true && (
                  <p className="text-danger">Please fill all the fields !</p>
                )}
                {success_ === true && (
                  <p className="text-success">Successfully !</p>
                )}
                <div className="form-group mt-3">
                  <h6>PRODUCT NAME</h6>
                  <input type="text" name="name" value={formFields.name} onChange={inputChange} />
                </div>
                <div className="form-group mt-3">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    name="description"
                    value={formFields.description}
                    id=""
                    cols="30"
                    rows="10"
                    onChange={inputChange}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <Select
                        value={categoryVal}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {catData?.categoryList?.length !== 0 &&
                          catData?.categoryList?.map((cat, index) => {
                            return (
                              <MenuItem
                                className="text-capitalize"
                                value={cat.id}
                                key={index}
                              >
                                {cat.name}{" "}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>BRAND</h6>
                      <input type="text" name="brand"   value={formFields.brand}onChange={inputChange} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>OLD PRICE</h6>
                      <input
                        type="text "
                        name="oldPrice"
                        value={formFields.oldPrice}
                        onChange={inputChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>NET PRICE</h6>
                      <input type="text" name="price" value={formFields.price} onChange={inputChange} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>STOCK</h6>
                      <input
                        type="text"
                        name="countInStock"
                        value={formFields.countInStock}
                        onChange={inputChange}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>IMAGE URL</h6>
                      <div
                        className="imageAddButton"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <input
                          type="text"
                          name="images"
                          ref={productImages}
                          onChange={inputChange}
                          style={{ flex: "1" }}
                        />
                        <Button
                          className="btn-purple"
                          onClick={addProductImages}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    <div>
                      {productImagesArr.length > 0 && <h4>Product Images</h4>}
                      <div className="d-flex imgGrid" id="imgGrid">
                        {productImagesArr.map((image, index) => (
                          <div className="img" key={index}>
                            <img
                              src={image}
                              alt={`Product ${index + 1}`}
                              className="w-100"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <br />

                <Button type="submit" className="btn-purple btn-lg btn-big">
                  <BsCloudUploadFill /> &nbsp; PUBLISH
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
