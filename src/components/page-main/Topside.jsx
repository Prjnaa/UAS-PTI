import Weather from "./Weather";
import "./Main.css"

function Topside() {
  return (
    <div className="topbox bg-dgreen flex md:px-8 md:py-4 px-3 py-2 justify-between rounded-xl">
      <div className="schedule text-lyellow my-auto">
        <p className="md:text-base/7 text-xs/3 font-normal tracking-widest">
          NEXT SCHEDULE
        </p>
        <h1 className="md:text-4xl/6 text-base/4 font-semibold md:mt-4 mt-1">
          Konser Coldplay
        </h1>
        <div className="md:mt-3 sm:mt-1">
          <p className="md:text-base/6 text-sm/6 font-normal">Nov 15 2023</p>
          <p className="md:text-base/5 text-sm/4 font-normal">with, kelompok</p>
        </div>
      </div>
      <Weather />
    </div>
  );
}

export default Topside;
