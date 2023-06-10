import Imgslider from "./Imgslider";

function Upcoming() {
  return (
    <div className="upcoming mt-5 h-[30rem]">
      <h1 className="text-comp drop-shadow-text text-center text-4xl lg:text-3xl md:text-2xl sm:text-xl font-semibold mb-1">
        U P C O M I N G<br />E V E N T S
      </h1>
      <Imgslider />
    </div>
  );
}

export default Upcoming;
