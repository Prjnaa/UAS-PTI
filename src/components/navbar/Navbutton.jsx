import React from "react";
import { useNavigate } from "react-router-dom";

function Navbutton(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.navTo);
  };

  return (
    <button className="navbtn drop-shadow-text shake-hover" onClick={handleClick}>
      <img
        className="navbtn-icon"
        src={props.imgURL}
        alt={props.alt}
      />
    </button>
  );
}

export default Navbutton;
