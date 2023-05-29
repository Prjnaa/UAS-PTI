import React from "react";
import { useNavigate } from "react-router-dom";

function Navbutton(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.navTo);
  };

  return (
    <img
      className="navbtn drop-shadow-text shake-hover"
      src={props.imgURL}
      alt={props.alt}
      onClick={handleClick}
    />
  );
}

export default Navbutton;
