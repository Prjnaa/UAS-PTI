import Weather from "./Weather"

function Topside(props) {
    return (
        <div className="topbox bg-dgreen flex px-5 py-3 justify-between rounded-xl">
            <div className="schedule text-lyellow">
                <p className="text-sm/4 font-normal">NEXT SCHEDULE</p>
                <h1 className="text-2xl/5 font-semibold my-1">Konser Coldplay</h1>
                <p className="text-base/5 font-normal">Nov 15 2023</p>
                <p className="text-base/4 font-normal">with, kelompok</p>
            </div>
            <Weather/>
        </div>
    )
}

export default Topside