import Header from "./Header.jsx";
import Topside from "./Topside.jsx";
import Bottomside from "./Bottomside.jsx";
import Upcomming from "./upcoming events/Upcoming.jsx";
import Logout from "./logout.jsx";

import "./Main.css";

function Main() {
  return (
    <div className="container-wrapper bg-lgreen w-screen grid grid-cols-12 py-3">
      <div className="wrapper lg:col-start-3 sm:col-start-2 col-start-1 lg:col-end-11 sm:col-end-12 col-end-13 px-5">
        <Header></Header>
        <div className="container-top">
          <Topside></Topside>
          <Bottomside></Bottomside>
        </div>
        <div className="justify-around container-bottom mt-32 mb-24">
          <Upcomming></Upcomming>
        </div>
        <div>
          <Logout></Logout>
        </div>
      </div>
    </div>
  );
}

export default Main;
