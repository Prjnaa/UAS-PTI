import Header from "./Header.jsx"
import Topside from "./Topside.jsx"
import Bottomside from "./Bottomside.jsx"
import "./Main.css"


function Main() {
    return (
        <div className="container ">
            <div className="container-top">
                <Header></Header>
                <Topside></Topside>
            </div>
                <Bottomside></Bottomside>
        </div>
    )
}

export default Main