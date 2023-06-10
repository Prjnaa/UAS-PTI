import Chat from "./components/Chat";
import '../../index.css'
import Navbar from "../navbar/Navbar";

function ChatApp() {
  return (
    <div className="bg-dom flex justify-center flex-wrap items-center h-screen">
          <Chat />
          <div className="fixed bottom-0 w-full">
            <Navbar />
          </div>
    </div>
  );
}


export default ChatApp
