import Navbutton from "./Navbutton";
import Logout from "./Logout";
import HomeSvg from "../assets/Home.svg";
import LogoutSvg from "../assets/Logout.svg";
import AboutUsSvg from "../assets/About Us.svg";

import "./nav.css";

function Navbar() {
  return (
    <div className="navbar-container h-24 bg-comp flex flex-row justify-around items-center">
      <Navbutton imgURL={HomeSvg} navTo="/main" alt="Home" />
      <Navbutton imgURL={AboutUsSvg} navTo="/aboutUs" />
      <Logout imgURL={LogoutSvg} alt="Logout" />
    </div>
  );
}

export default Navbar;
