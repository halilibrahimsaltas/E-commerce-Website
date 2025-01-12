import HomeBanner from "../../Component/HomeBanner";
import { Button } from "@mui/material";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import ProductItem from "../../Component/ProductItem";
import HomeCat from "../../Component/HomeCat";
import banner1 from "../../assets/images/back1.webp";
import banner2 from "../../assets/images/back2.webp";
import { fetchDataFromApi } from "../../utils/api";
import "swiper/css";
import "swiper/css/scrollbar";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productData,setProductData] = useState([]);



  useEffect(() => {
    fetchDataFromApi(`/api/products/featured`).then((res) => {
      if (Array.isArray(res)) {
        setFeaturedProducts(res);
      } else {
        console.error("Unexpected API response format:", res);
      }
    });

    fetchDataFromApi(`/api/products/`).then((res) => {
        setProductData(res);
    });
  }, []);

  return (
    <>
      <HomeBanner />
      <HomeCat />

      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-12 productRow">
              <div className="d-flex align-items-center">
                <div className="info w-75">
                  <h3 className="mb-0 hd">FEATURED PRODUCTS</h3>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100 mt-4">
                {/* Swiper with Scrollbar */}
                <Swiper
                  modules={[Scrollbar]}
                  spaceBetween={10} // Space between slides
                  slidesPerView={5} // Number of slides visible
                  scrollbar={{ draggable: true }} // Enable draggable scrollbar
                >
                  {featuredProducts?.length !== 0 &&
                    featuredProducts?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100 mt-4">
                {/* Swiper with Scrollbar */}
                <Swiper
                  modules={[Scrollbar]}
                  spaceBetween={10} // Space between slides
                  slidesPerView={5} // Number of slides visible
                  scrollbar={{ draggable: true }} // Enable draggable scrollbar
                >  {
                    productData?.products?.length !== 0 &&
                    productData?.products?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))}
                  
                </Swiper>
              </div>

              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">Flash Products</h3>
                </div>
                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row w-100 mt-4">
                {/* Swiper with Scrollbar */}
                <Swiper
                  modules={[Scrollbar]}
                  spaceBetween={10} // Space between slides
                  slidesPerView={5} // Number of slides visible
                  scrollbar={{ draggable: true }} // Enable draggable scrollbar
                >
                   {
                    productData?.products?.length !== 0 &&
                    productData?.products?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProductItem item={item} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner ">
                  <img src={banner1} className="cursor w-100" />
                </div>
                <div className="banner">
                  <img src={banner2} className="cursor w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
