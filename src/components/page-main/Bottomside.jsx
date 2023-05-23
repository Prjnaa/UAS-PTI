import Menubutton from "./Menubtn"

function Bottomside() {
    return (
        <div className="bottombox md:mt-10 mt-6 bg-mgreen flex md:px-10 px-8 md:py-5 py-4 justify-between rounded-xl">
            <Menubutton imgURL="" desc="Saving"></Menubutton>
            <Menubutton imgURL="" desc="Add"></Menubutton>
            <Menubutton imgURL="" desc="Events"></Menubutton>
            <Menubutton imgURL="" desc="Group"></Menubutton>
        </div>
    )
}

export default Bottomside