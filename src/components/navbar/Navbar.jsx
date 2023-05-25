import Navbutton from "./Navbutton"
import Logout from "./logout"
import HomeSvg from "../assets/Home.svg"
import LogoutSvg from "../assets/Logout.svg"

import "./nav.css"

function Navbar() {
    return (
        <div className="sticky bottom-0 bg-lyellow w-2/3 lg:h-32 md:h-28 h-20 py-4 shadow-box rounded-xl flex flex-row justify-around mx-auto">
            <Navbutton imgURL={HomeSvg} navTo="/main" alt="Home" />

            <Logout imgURL={LogoutSvg} alt="Logout" />
        </div>
    )
}

export default Navbar