import { useEffect, useState } from "react";
import Username from "./Username";
import LogoSvg from "../assets/Logo.svg";

function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const date = new Date();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = date.getDay();
  let month = date.getMonth();
  let currDay = days[day];
  let currMonth = months[month];

  return (
    <div className="header padding_r bg-comp flex h-[8rem] pb-4 pt-3 text-acc font-normal text-xl mx-auto">
      <img src={LogoSvg} className="logo-small my-auto" />
      <div className="flex justify-between w-screen">
          <Username></Username>
        <div className="header-date text-end">
          <p className="tracking-wider">{currDay},</p>
          <h1 className="2xl:text-3xl/8 xl:text-xl flex flex-wrap font-semibold">
            {currMonth} {date.getDate()} {date.getFullYear()}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
