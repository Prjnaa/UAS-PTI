import Menubutton from "./Menubtn";

function Bottomside() {
  return (
    <div className="bottombox md:mt-10 mt-6 bg-mgreen flex md:px-10 px-8 md:py-5 py-4 justify-between rounded-xl">
      <Menubutton ALT="saving.jpg" imgURL="" desc="Saving"></Menubutton>
      <Menubutton ALT="add.jpg" imgURL="" desc="Add"></Menubutton>
      <Menubutton ALT="events.jpg" imgURL="" desc="Events"></Menubutton>
      <Menubutton ALT="group.jpg" imgURL="" desc="Group"></Menubutton>
    </div>
  );
}

export default Bottomside;
