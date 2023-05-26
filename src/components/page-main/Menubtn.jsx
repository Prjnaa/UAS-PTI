import React from "react";
import { useNavigate } from "react-router-dom";

function Menubtn(props) {
  const click = useNavigate();

  const handleClick = () => {
    click(props.goTo);
  };

  return (
    <div className="flex flex-col text-center mx-auto text-lgreen mt-3">
      <img
        className="menubttn bg-lyellow lg:h-28 lg:w-28 md:h-20 md:w-20 sm:h-18 sm:w-18 def:h-14 def:w-14 h-8 w-8 rounded-full"
        src={props.imgURL}
        alt={props.ALT}
        onClick={handleClick}
      />
      <p className="md:text-xl text-2xs font-semibold ">{props.desc}</p>
    </div>
  );
}

export default Menubtn;
