import Menubutton from "./Menubtn";

function Bottomside() {
  return (
    <div className="bottombox shadow-box md:mt-10 mt-3 bg-cust-2 flex justify-around lg:px-8 lg:py-3 md:px-6 md:py-2 def:px-4 def:py-1 px-2 pb-2 rounded-xl">
      <Menubutton
        goTo="/saving"
        ALT="saving.jpg"
        imgURL=""
        desc="Saving"
      />
      <Menubutton 
        goTo="/form" 
        ALT="add.jpg" 
        imgURL=""   
        desc="New Event"
      />
      <Menubutton 
        goTo="/eventlist" 
        ALT="events.jpg" 
        imgURL="" 
        desc="Event List"
      />
      <Menubutton 
        goTo="/friend" 
        ALT="group.jpg" 
        imgURL="" 
        desc="Friend List"
      />
    </div>
  );
}

export default Bottomside;
