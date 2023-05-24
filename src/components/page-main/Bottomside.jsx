import Menubutton from "./Menubtn";

function Bottomside() {
  return (
    <div className="bottombox md:mt-10 mt-6 bg-mgreen flex justify-around lg:px-8 lg:py-3 md:px-6 md:py-2 def:px-4 def:py-1 px-2 pb-2 rounded-xl">
      <Menubutton
        goTo="/calendar"
        ALT="saving.jpg"
        imgURL=""
        desc="Saving"
      />
      <Menubutton 
        goTo="/" 
        ALT="add.jpg" 
        imgURL="" 
        desc="Add"
      />
      <Menubutton 
        goTo="/" 
        ALT="events.jpg" 
        imgURL="" 
        desc="Events"
      />
      <Menubutton 
        goTo="/" 
        ALT="group.jpg" 
        imgURL="" 
        desc="Group"
      />
    </div>
  );
}

export default Bottomside;
