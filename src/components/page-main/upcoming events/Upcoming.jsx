import Imgslider from "./Imgslider";

function Upcomming() {
  return (
    <div className="upcoming">
      <h1 className="text-black drop-shadow-text text-center xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl def:text-base text-sm tracking-widest font-semibold mb-2">
        UPCOMING EVENTS
      </h1>
      <Imgslider></Imgslider>
    </div>
  );
}

export default Upcomming;
