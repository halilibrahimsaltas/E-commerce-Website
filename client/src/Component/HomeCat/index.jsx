import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

const HomeCat = () => {
  return (
    <section className="homeCat">
      <div className="container">
        <h3 className="mb-4 hd ">UNLIMITED ADVANTAGES </h3>
        <Swiper
          modules={[Scrollbar]}
          spaceBetween={10} // Space between slides
          slidesPerView={10} // Number of slides visible
          scrollbar={{ draggable: true }} // Enable draggable scrollbar
        >
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://cdn.dsmcdn.com/mnresize/200/200/homepage/prod/2024-12-03/85e24984-319b-4927-a127-ac3295d0152d.png"  />
              <h6>%50 Discount</h6>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://thumbs.dreamstime.com/b/free-shipping-icon-delivery-truck-isolated-white-background-vector-illustration-196936801.jpg"  />
              <h6>Free Delivery</h6>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F88%2F823%2Fpng-clipart-logo-product-design-brand-trademark-new-product-promotion-blue-text.png&f=1&nofb=1&ipt=9f7b43dc827f9b1b9cee360eba5018093bf3a30ff1895eb30b01c473689d29d4&ipo=images"  />
              <h6>New Brands</h6>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F8521%2F8521337.png&f=1&nofb=1&ipt=be746ecce5075c526ea3baf0b719f8dc24a2e54005811a063c940424a8bcf1a6&ipo=images"  />
              <h6>Live Service</h6>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Feco-food-and-cosmetic-labels-3%2F128%2FFresh_food-512.png&f=1&nofb=1&ipt=1e120441960250905ccbf664fa84fdecddfc2b698e62dc769cfcd99f8b44ec0e&ipo=images"  />
              <h6>Fresh Food</h6>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F3846%2F3846940.png&f=1&nofb=1&ipt=4e2d8fbff8b6ec97982b40e980ae2054bace95e382e9c2d3faa03c95a194f3fe&ipo=images"  />
              <h6>Big Market</h6>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item text-center">
              <img src="https://cdn1.iconfinder.com/data/icons/engineering-aesthetics-vol-1/256/Green_Project-1024.png"  />
              <h6>Green Projects</h6>
            </div>
          </SwiperSlide>
        
          
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
