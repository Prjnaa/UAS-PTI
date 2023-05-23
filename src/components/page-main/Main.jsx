import Header from "./Header.jsx"
import Topside from "./Topside.jsx"
import Bottomside from "./Bottomside.jsx"
import Upcomming from "./upcoming events/Upcoming.jsx"
import "./Main.css"

function Main() {
    return (
    <div className="container-wrapper bg-lgreen w-screen h-auto grid grid-cols-12 py-5">
        <div className="wrapper col-start-4 col-end-10">
            <Header></Header>
            <div className="container-top">
                <Topside></Topside>
                <Bottomside></Bottomside>
            </div>
            <div className="flex justify-around container-bottom my-36">
                <Upcomming></Upcomming>
            </div>
        </div>
    </div>
    )
}

export default Main