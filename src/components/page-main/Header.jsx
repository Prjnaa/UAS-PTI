import { useEffect, useState } from "react";
import Username from "./Username";

function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const date = new Date();

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
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
    <div className="header px-5 bg-cust-2 radius-xl sticky top-0 flex justify-between pb-4 pt-3 text-dgreen font-normal text-xl">
      <div className="header-username text-start">
        <p className="tracking-wider">Hello,</p>
        <Username></Username>
      </div>
      <div className="header-date text-end">
        <p className="tracking-wider">{currDay},</p>
        <h1 className="2xl:text-3xl/6 xl:text-xl flex flex-wrap font-semibold">
          {currMonth} {date.getDate()} {date.getFullYear()}
        </h1>
      </div>
    </div>
  );
}

export default Header;
