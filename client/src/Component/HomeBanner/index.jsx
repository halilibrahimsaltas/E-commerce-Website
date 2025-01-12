import React from "react";
import Slider from "react-slick";

const  HomeBanner= ()=>{
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true, 
        autoplay:true
      };
    return( 
          <div className=" mt-3"> 
          <div className="homeBannerSection">
           <Slider {...settings}>
             <div className="item">
            
              <img src="https://m.media-amazon.com/images/I/71CtV-IknvL._SX3000_.jpg" className="w-100" />

              </div>    

              <div className="item">
                 <img src="https://m.media-amazon.com/images/I/81in2jMG2UL._SX3000_.jpg" className="w-100" />   
              
              </div>     
              <div className="item">
                 <img src="https://m.media-amazon.com/images/I/81DuLuSk7tL._SX3000_.jpg" className="w-100" />   
              
              </div> 
              <div className="item">
                 <img src="https://m.media-amazon.com/images/I/81jo-+2mhnL._SX3000_.jpg" className="w-100" />   
              
              </div> 
              <div className="item">
            
            <img src="https://m.media-amazon.com/images/I/71Tfszeu0DL._SX3000_.jpg" className="w-100" />

            </div>   
              <div className="item">
                 <img src="https://m.media-amazon.com/images/I/71rt87Bh8xL._SX3000_.jpg" className="w-100" />   
              
              </div> 
              <div className="item">
                 <img src="https://m.media-amazon.com/images/I/71zpBcCjKPL._SX3000_.jpg" className="w-100" />   
              
              </div> 
              <div className="item">
                 <img src="https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg" className="w-100" />   
              
              </div> 
           </Slider>
         </div>

          </div>
        
        
    )
}

export default HomeBanner;