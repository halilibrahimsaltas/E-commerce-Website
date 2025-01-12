import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { FaRegCreditCard } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import { newEditData, fetchDataFromApi,deleteData } from "../../utils/api";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  let [cartFields, setcartFields] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const context = useContext(MyContext);
  const goToCheckout = () => {
    navigate("/checkout", { state: { totalPrice } });
  };

  useEffect(() => {
    fetchDataFromApi(`/api/cart`)
      .then((res) => {
        setCartData(res.cart || res); // Adjust based on backend structure
        calculateTotal(res.cart || res);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.subTotal, 0);
    setTotalPrice(total);
  };

  const quantityChange = (item, newQuantity) => {
    setProductQuantity(newQuantity);

    const user = JSON.parse(localStorage.getItem("user"));

    cartFields.productTitle = item?.productTitle;
    cartFields.image = item?.image;
    cartFields.price = item?.price;
    cartFields.quantity = newQuantity;
    cartFields.subTotal = parseInt(item?.price * newQuantity);
    cartFields.productId = item?.id;
    cartFields.userId = user?.userId;

    // Update cart data in the backend and refresh the cart page
    newEditData(`/api/cart/${item?._id}`, cartFields).then((res) => {
      if (res) {
        // Refresh the cart data after updating
        fetchDataFromApi(`/api/cart`)
          .then((res) => {
            setCartData(res);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error fetching cart data:", error);
          });
      }
    });
  };
  const removeCartItem = (id) => {
    deleteData(`/api/cart/${id}`)
      .then((res) => {
        if (res.success) {
          
          window.location.reload();
          // Optional: Reload the cart data
          fetchDataFromApi(`/api/cart`)
            .then((updatedCart) => {
              setCartData(updatedCart); // Update cart state
                

            })
            .catch((error) =>
              console.error("Error reloading cart data:", error)
            );
        } else {
          alert("Failed to remove item. Please try again.");
        }
      })
      .catch((error) => console.error("Error removing item:", error));
  };

  return (
    <>
      <section className="section cartPage">
        <div className="container">
          <h2 className="hd mb-1">Your Cart</h2>
          <div className="row">
            <div className="col-md-9 pr-5">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th width="14%">Unit Price</th>
                      <th width="14%">Quantity</th>
                      <th width="10%">Subtotal</th>
                      <th width="10%">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData?.length !== 0 &&
                      cartData?.map((item, index) => (
                        <tr key={index}>
                          <td width="45%">
                            <Link to={`/product/${item.ProductId}`}>
                              <div className="d-flex align-items -center cartItemimgWrapper">
                                <div className="imgWrapper">
                                  <img
                                    src={item?.image}
                                    className="w-100"
                                    alt={item?.productTitle}
                                  />
                                </div>
                                <div className="info px-3">
                                  <h6>
                                    {item?.productTitle?.substr(0, 50) + "..."}
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td width="10%">${item?.price}</td>
                          <td width="16%">
                            <input
                              type="number"
                              value={item?.quantity}
                              onChange={(e) =>
                                quantityChange(item, parseInt(e.target.value))
                              }
                              min="1"
                              style={{
                                width: "60px",
                                padding: "5px",
                                textAlign: "center",
                              }}
                            />
                          </td>
                          <td width="12%">${item?.subTotal}</td>
                          <td width="9%">
                            <button
                              className="remove btn btn-danger"
                              onClick={() => removeCartItem(item?._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border p-3 cartDetails">
                <h4>CART TOTALS</h4>
                <div className="d-flex align-items-center mb-3">
                  <span>Subtotal</span>
                  <span className="ml-auto text-red font-weight-bold">
                  ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span>Shipping</span>
                  <span className="ml-auto">
                    <b>Free</b>
                  </span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <span>Total</span>
                  <span className="ml-auto text-red font-weight-bold">
                  ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <br />
                <Button
                  className="btn-purple btn-lg btn-big"
                  variant="outlined"
                  onClick={goToCheckout}
                >
                  <FaRegCreditCard /> &nbsp; Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
