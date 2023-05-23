import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

function Imgslider() {
  const [data, setData] = useState(null);

  const apiURL =
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=9b9d44e62ca3456cb1a3ffca9e991fe2";

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.articles);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    scroll: true,
    centerode: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    prevArrow: null,
    nextArrow: null,
  };

  function openURL() {}

  return (
    <div className="slider-container">
      {data && (
        <Slider {...settings}>
          {data.map((d, i) => (
            <div key={i} className="slide">
              <div className="img-wrapper mx-3 rounded-lg overflow-visible mt-4 mb-3">
                <img
                  onClick={openURL}
                  className="sliderimg rounded-md"
                  src={d.urlToImage}
                  alt={d.title}
                />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Imgslider;