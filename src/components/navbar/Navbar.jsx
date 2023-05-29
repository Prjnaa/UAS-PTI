import Navbutton from "./Navbutton";
import Logout from "./Logout";
import HomeSvg from "../assets/Home.svg";
import LogoutSvg from "../assets/Logout.svg";
import AboutUsSvg from "../assets/About Us.svg";

import "./nav.css";

function Navbar() {
  return (
    <div className="navbar-container bg-cust-2 sticky bottom-0 w-2/4 lg:h-24 md:h-20 h-14 shadow-box rounded-xl flex flex-row justify-around mx-auto">
      <Navbutton imgURL={HomeSvg} navTo="/main" alt="Home" />
      <Navbutton imgURL={AboutUsSvg} navTo="/aboutUs" />
      <Logout imgURL={LogoutSvg} alt="Logout" />
    </div>
  );
}

export default Navbar;
