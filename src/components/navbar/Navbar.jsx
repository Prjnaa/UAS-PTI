import Navbutton from "./Navbutton";
import Logout from "./Logout";
import HomeSvg from "../assets/Home.svg";
import LogoutSvg from "../assets/Logout.svg";

import "./nav.css";

function Navbar() {
  return (
    <div className="navbar-container sticky bottom-0 bg-lyellow w-2/3 lg:h-24 md:h-20 h-14 shadow-box rounded-xl flex flex-row justify-around mx-auto">
      <Navbutton imgURL={HomeSvg} navTo="/main" alt="Home" />

      <Logout imgURL={LogoutSvg} alt="Logout" />
    </div>
  );
}

export default Navbar;
