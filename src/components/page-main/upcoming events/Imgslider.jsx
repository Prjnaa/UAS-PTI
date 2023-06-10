import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

function Imgslider() {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const apiURL =
    "https://script.googleusercontent.com/macros/echo?user_content_key=j9dndTmPoeP9nVJTUWao7eM1xM1RlncqbTinII4XA_vgkDtn0FHZQU1fBGMFIKcFOn1CE8BO-ZJK8aSlfLQO2qrKjbs-epomm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnL1PrmRfRTdKId1bFATW-W4406ibqV8BkmN793uWb7m97frMHD8RVLkmQ2a4IME0eQftZxC8v6z0Fcjm9TPSvv1XTo-2Ear2Mdz9Jw9Md8uu&lib=M0EFZnq-909yy3F8kAOKfUrpyijN56ziQ";

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((responseData) => {
        setData(responseData.data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    scroll: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    afterChange: (current) => {
      setCurrentSlide(current);
    },
  };

  function clickHandle(webUrl) {
    window.open(webUrl);
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`slider ${currentSlide === index ? "zoomed" : ""}`}
          >
            <div
              className="img-wrapper mx-3 overflow-visible mt-4 mb-3"
              onClick={() => clickHandle(item.url)}
            >
              <img
                className="sliderimg rounded-md"
                src={item.imgurl}
                alt={item.eventid}
              />
              <div className="descbox rounded-md">
                <div>
                  <p className="title font-bold text-white tracking-wider">
                    {item.eventid}
                  </p>
                  <p className="date font-sm text-white">{item.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Imgslider;
