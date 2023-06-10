import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css"

function Menubtn(props) {
  const click = useNavigate();

  const handleClick = () => {
    click(props.goTo);
  };

  return (
    <div className="flex flex-col text-center mx-auto text-cust-2 mt-3">
      <img
        className="menubttn mx-auto drop-shadow-text lg:h-20 lg:w-20 md:h-20 md:w-20 sm:h-18 sm:w-18 def:h-14 def:w-14 h-8 w-8 shake-hover"
        src={props.imgURL}
        alt={props.ALT}
        onClick={handleClick}
      />
      <p className="md:text-xl text-2xs text-white">{props.desc}</p>
    </div>
  );
}

export default Menubtn;
