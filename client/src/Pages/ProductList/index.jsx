import React, { useEffect, useState } from "react";
import Sidebar from "../../Component/Dashboard/Sidebar";
import { Button } from "@mui/material";
import { FaPen } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import Pagination from "@mui/material/Pagination";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";



const ProductList = () => {

  const [productList, setProductList] = useState([]);
  const [formFields, setformFields] = useState({
      name: "",
    });
  const [categories, setCategories] = useState([]);
  


  const navigate = useNavigate();
  const handleEdit = (id) => {
    
  
    navigate(`/product/edit/${id}`);
  };
  

  useEffect(() => {
    window.scroll(0, 0);
    
    fetchDataFromApi("/api/products/")
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((error) => {
        console.log(error);
      });

    }, []);

    const getCategoryName = (itemId) => {
      fetchDataFromApi(`/api/products/${itemId}`).then((data) => {
        setformFields({
          name: data.category.name
        });
         return formFields
      });
    };

    const deleteProduct = (id)=>{

      deleteData(`/api/products/${id}`).then(res=>{
        fetchDataFromApi("/api/products/")
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((error) => {
        console.log(error);
      });
        
        
    })
    };

    const handleChange = (event, value) => {
        fetchDataFromApi(`/api/products?page=${value}`).then((res)=>{
            setProductList(res);
    
        })
    };

    
      

  return (
    <div className="main d-flex mt-4">
      <div className="sidebarWrapper">
        <Sidebar />
      </div>

      <div className="content w-100 ">
        <div className="card  shadow border-0 p-3 mt-4">
          <h3>Product List</h3>


          <div className="table-responsive mt-4 ">
            <table className="table table-bordered v-align ">
              <thead className="thead-dark darkest">
                <tr>
                  <th className="pl-5">UID</th>
                  <th>PRODUCT</th>
                  <th>DESCRIPTION</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
              {productList?.products?.length !== 0 &&
                  productList?.products?.map((item, index) => {
                    return (
                      <tr key={index} >
                        <td className="pl-5">{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.countInStock}</td>
                        <td>
                          <div className="actions d-flex align-items-center">
                              
                          <Button className="success" color="success" 
                            onClick={() => handleEdit(item.id)} >
                            
                              <FaPen />
                            </Button>
                            
                              
                            <Button className="error" color="error"  onClick={()=>deleteProduct(item.id)}>
                              <RiDeleteBinFill />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center pt-3 tableFooter">
              <Pagination
                count={productList?.totalPages}
                color="secondary"
                className="pagination"
                showFirstButton
                showLastButton
                 onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
