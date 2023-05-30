import Chat from "./components/Chat";
import '../../index.css'
import Navbar from "../navbar/Navbar";

function ChatApp() {
  return (
    <div className="gradient-bg-1 flex justify-center flex-wrap items-center h-screen">
          <Chat />
          <div className="fixed bottom-0 w-2/3">
            <Navbar />
          </div>
    </div>
  );
}


export default ChatApp
