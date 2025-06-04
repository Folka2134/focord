import "./App.css";
import { ChatSection } from "./components/ChatSection/ChatSection";
import { SideBar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <ChatSection />
    </div>
  );
}

export default App;
