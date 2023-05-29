import React from "react";
import { useNavigate } from "react-router-dom";

function Navbutton(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.navTo);
  };

  return (
    <img
      className="navbtn drop-shadow-text transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
      src={props.imgURL}
      alt={props.alt}
      onClick={handleClick}
    />
  );
}

export default Navbutton;
