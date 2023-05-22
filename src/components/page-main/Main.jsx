import Header from "./Header.jsx"
import Topside from "./Topside.jsx"
import Bottomside from "./Bottomside.jsx"
import "./Main.css"


function Main() {
    return (
        <div className="container lg:w-3/5 md:w-4/5 font-sans md:px-0 px-3">
            <div className="container-top">
                <Header></Header>
                <Topside></Topside>
            </div>
                <Bottomside></Bottomside>
        </div>
    )
}

export default Main