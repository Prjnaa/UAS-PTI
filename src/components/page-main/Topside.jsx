import Weather from "./Weather";
import "./Main.css"

function Topside() {
  return (
    <div className="topbox shadow-box mt-3 bg-cust-5 flex lg:px-14 px-4 py-4 justify-between rounded-xl">
      <div className="schedule text-cust-1 my-auto">
        <p className="md:text-base/7 text-xs/3 font-normal tracking-widest">
          NEXT SCHEDULE
        </p>
        <h1 className="md:text-4xl/6 text-base/5 font-semibold md:mt-4 mt-1">
          Konser Coldplay
        </h1>
        <div className="md:mt-3 def:mt-1">
          <p className="md:text-base/6 text-xs/5 font-normal">Nov 15 2023</p>
        </div>
      </div>
      <Weather />
    </div>
  );
}

export default Topside;
