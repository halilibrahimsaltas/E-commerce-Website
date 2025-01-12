import React, { useEffect, useState, useContext, useRef } from "react";
import Sidebar from "../../Component/Dashboard/Sidebar";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BsCloudUploadFill } from "react-icons/bs";
import { newEditData, fetchDataFromApi } from "../../utils/api";
import { useParams } from "react-router-dom";

const ProductEdit = () => {
  const [catData, setCatData] = useState([]);
  const [categoryVal, setcategoryVal] = useState("");
  const [error_, setError] = useState(false);
  const [success_, setSuccess] = useState(false);
  const [productImagesArr, setproductImagesArr] = useState([]);
  let { id } = useParams();
  const formData = new FormData();
  
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    countInStock: "",
    images: [],
  });
  
  const productImages = useRef();

  useEffect(() => {
    window.scroll(0,0);
    fetchDataFromApi('/api/categories/').then((res)=>{
      setCatData(res);
    });

    fetchDataFromApi(`/api/products/${id}`).then((res)=>{
      setFormFields({
        name: res.name ,
        description: res.description ,
        brand: res.brand ,
        price: res.price ,
        oldPrice: res.oldPrice ,
        category: res.category.id ,
        countInStock: res.countInStock ,
        images: res.images
      });
      setcategoryVal(res.category.id);
    })
    .catch((err) => console.error("Error fetching product:", err));

  }, []);

    
const handleChangeCategory = (event) => {
  const selectedCategory = event.target.value; // This should be a category ID (string or number)
  setcategoryVal(selectedCategory); // Update the category value state
  setFormFields((prevFields) => ({
    ...prevFields,
    category: selectedCategory, // Set the category value in formFields
  }));
   };


 const editProduct = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    const categoryId = formFields.category.id || formFields.category;
    
    formData.append("name", formFields.name);
    formData.append("description", formFields.description);
    formData.append("brand", formFields.brand);
    formData.append("price", formFields.price);
    formData.append("oldPrice", formFields.oldPrice);
    formData.append("category", categoryId);
    formData.append("countInStock", formFields.countInStock);
    

    formFields.images = productImagesArr;
   
    if (
      formFields.name !== "" &&
      formFields.category !== "" &&
      formFields.countInStock !== "" &&
      formFields.price !== ""
    ) {
       newEditData(`/api/products/${id}`,formFields).then((data) => {
            setSuccess(true); 
            setFormFields({
            name: "",
            description: "",
            brand: "",
            price: 0,
            oldPrice: 0,
            category: "",
            countInStock: 0,
            images: [],
          });
          setproductImagesArr([]);
          })
          .catch((error) => {
              console.log(error);
          });
        }
  };
  const addProductImages = () => {
    // Add the new image URL to the productImagesArr state
    setproductImagesArr((prevArray) => [
      ...prevArray,
      productImages.current.value,
    ]);
  
    // Clear the input field
    productImages.current.value = "";
  };
  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="main d-flex mt-4">
      <div className="sidebarWrapper">
        <Sidebar />
      </div>
      <div className="content w-100 ">
        <div className="card  shadow border-0 p-3 mt-4">
          <h3>Product Edit</h3>
        </div>
        <form className="form" onSubmit={editProduct}>
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
                        value={formFields.category || ''}
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
                                {cat.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>BRAND</h6>
                      <input type="text" name="brand"   value={formFields.brand} onChange={inputChange} />
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
export default ProductEdit;