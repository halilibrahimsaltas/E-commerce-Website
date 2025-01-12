import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter,Route, Routes,useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Listing from './Pages/Listing';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import SignIn from './Pages/SignIn';
import { useState } from "react";
import MyContext from './context/MyContext';
import SignUp from './Pages/SignUp';
import Dashboard from "./Pages/Dashboard";
import ProductUpload from './Pages/ProductUpload';
import ProductEdit from './Pages/ProductEdit';
import ProductList from './Pages/ProductList';
import CategoryAdd from './Pages/CategoryAdd';
import CategoryList from './Pages/CategoryList';
import Checkout from './Pages/Checkout'
import { postData } from './utils/api';
import Toast from "./utils/Toast";
import SearchPage from './Pages/Search';




function App() {

  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [cartData,setCartData] = useState([]);
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const [searchData,setSearchData] = useState([]);
  
 
 const addtoCart = (data) => {
  postData(`/api/cart/add`, data)
    .then((res) => { // Remove the extra closing parenthesis
      setToast({ message: "Product added to your cart!", isVisible: true });
      closeToast();
    })
    .catch((error) => {
      setToast({ message: "Failed to add product to cart.", isVisible: true });
      console.error("Error adding to cart:", error);
    });
};

  const values = {
    isHeaderFooterShow,
    setIsHeaderFooterShow,
    isLogin,
    setIsLogin,
    addtoCart,
    cartData,
    setCartData,
    searchData,
    setSearchData

  };
  const closeToast = () => {
    setTimeout(() => {
      setToast({ message: "", isVisible: false });
    }, 3000); // Delay of 2000ms
  };



  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path="/"  exact element={<Home />} />
            <Route path="/cat/:id"  exact element={<DynamicListing />} />
            <Route path="/product/:id" exact  element={<ProductDetails />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/signIn" exact element={<SignIn />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/product/list" exact element={<ProductList />} />
            <Route path="/product/upload" exact element={<ProductUpload />} />
            <Route path="/product/edit/:id" exact element={<ProductEdit />} />
            <Route path="/category/add"  exact element={<CategoryAdd />} />
            <Route path="/category/list"  exact element={<CategoryList />} />
            <Route path="/checkout"  exact element={<Checkout />} />
            <Route path="/search"  exact element={<SearchPage />} />
            
            



          </Routes>
        {isHeaderFooterShow===true && <Footer />}
        </MyContext.Provider>
        <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
        </BrowserRouter>
    </>
  );
};

const DynamicListing = () => {
  const location = useLocation(); // Use inside a Router context

  return <Listing key={location.pathname + location.search} />;
};


export default App;

