import Menubutton from "./Menubtn";
import EventListSvg from "../assets/Event List.svg"
import NewEventSvg from "../assets/New Event.svg"
import FriendSvg from "../assets/Friends.svg"
import SavingSvg from "../assets/Saving.svg"

function Bottomside() {
  return (
    <div className="bottombox shadow-box md:mt-10 mt-3 bg-cust-7 flex justify-around lg:px-8 lg:py-3 md:px-6 md:py-2 def:px-4 def:py-1 px-2 pb-2 rounded-xl">
      <Menubutton
        goTo="/saving"
        ALT="saving.jpg"
        imgURL={SavingSvg}
        desc="Saving"
      />
      <Menubutton 
        goTo="/form" 
        ALT="add.jpg" 
        imgURL={NewEventSvg}  
        desc="New Event"
      />
      <Menubutton 
        goTo="/eventlist" 
        ALT="events.jpg" 
        imgURL={EventListSvg}
        desc="Event List"
      />
      <Menubutton 
        goTo="/chat" 
        ALT="friend.jpg" 
        imgURL={FriendSvg} 
        desc="Comunity Chat"
      />
    </div>
  );
}

export default Bottomside;
