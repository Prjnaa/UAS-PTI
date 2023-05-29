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
        className="menubttn drop-shadow-text lg:h-28 lg:w-28 md:h-20 md:w-20 sm:h-18 sm:w-18 def:h-14 def:w-14 h-8 w-8 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
        src={props.imgURL}
        alt={props.ALT}
        onClick={handleClick}
      />
      <p className="md:text-xl text-2xs font-semibold text-white">{props.desc}</p>
    </div>
  );
}

export default Menubtn;
