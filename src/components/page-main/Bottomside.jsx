import Menubutton from "./Menubtn";
import EventListSvg from "../assets/Event List.svg"
import NewEventSvg from "../assets/New Event.svg"
import FriendSvg from "../assets/Friends.svg"
import SavingSvg from "../assets/Saving.svg"

function Bottomside() {
  return (
    <div className="bottombox md:mt-10 mt-3 bg-acc flex justify-around pb-2 shadow-box">
      <Menubutton
        goTo="/saving"
        ALT="saving.jpg"
        imgURL={SavingSvg}
        desc="Savings"
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
        desc="Chat"
      />
    </div>
  );
}

export default Bottomside;
