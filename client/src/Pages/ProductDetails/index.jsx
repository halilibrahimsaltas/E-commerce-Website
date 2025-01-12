import Rating from "@mui/material/Rating";
import QuantityBox from "../../Component/QuantityBox";
import { fetchDataFromApi } from "../../utils/api";
import { Button } from "@mui/material";
import { IoCart } from "react-icons/io5";
import { useEffect, useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [productData, setProductData] = useState([]);
  let [cartFields, setcartFields]= useState({});
  let [productQuantity, setProductQuantity]= useState(1);

  const { id } = useParams();

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(`/api/products/${id}`)
      .then((res) => {
        setProductData(res); // Set product data
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  const quantity=(val)=>{
    setProductQuantity(val)

  }

  const addtoCart = (data) => {

    const user =JSON.parse(localStorage.getItem("user"));
    
    cartFields.productTitle=productData?.name
    cartFields.image=productData?.images[0]
    cartFields.price=productData?.price
    cartFields.quantity=productQuantity
    cartFields.subTotal=parseInt(productData?.price * productQuantity )
    cartFields.productId=productData?.id
    cartFields.userId=user?.userId
    context.addtoCart(cartFields);
  };



  return (
    <>
      <section className={"productDetails section  "}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 pl-5">
              <img
                src={productData?.images}
                className="w-100"
                alt="Product 1"
              />
            </div>

            <div className="col-md-7 pl-5 pr-5">
              <h2 className="hd text-capitalize">{productData?.name}</h2>
              <ul className="list list-inline d-flex align-items-center">
                <li className="list-inline-item">
                  <div className="d-flex align-items-center">
                    <Rating
                      name="read-only"
                      value={
                        productData?.rating !== undefined
                          ? productData?.rating
                          : 0
                      } // Always provide a defined value
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </div>
                </li>
              </ul>

              <div className="d-flex info mb-2">
                <span className="oldPrice text-danger">
                  ${productData?.oldPrice}
                </span>
                <span className="newPrice ml-3">${productData?.oldPrice}</span>
              </div>

              <span className="badge ">Brands: {productData?.brand}</span>

              <p className="mt-3 description">{productData?.description}</p>

              <div className="d-flex align-items-center mt-4">
                <QuantityBox  quantity={quantity} />
                <Button
                  onClick={() => addtoCart(productData)}
                  className="btn-purple btn-lg btn-big btn-round ml-3"
                  variant="outlined"
                >
                  <IoCart /> &nbsp; Add to cart
                </Button>
                {context?.added === true && (
                <p className="text-success">Product Added</p>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
