import Weather from "./Weather"

function Topside(props) {
    return (
        <div className="topbox bg-dgreen flex md:px-10 px-8 md:py-5 py-4 justify-between rounded-xl">
            <div className="schedule text-lyellow my-auto">
                <p className="md:text-base/4 text-sm/5 font-normal tracking-widest">NEXT SCHEDULE</p>
                <h1 className="md:text-4xl/5 text-xl/6 font-semibold md:mt-4 mt-1">Konser Coldplay</h1>
                <div className="md:mt-3 mt-1">
                    <p className="md:text-base/5 text-sm/6 font-normal">Nov 15 2023</p>
                    <p className="md:text-base/5 text-sm/4 font-normal">with, kelompok</p>
                </div>
            </div>
            <Weather/>
        </div>
    )
}

export default Topside