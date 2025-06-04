import "./App.css";
import { MainSection } from "./components/MainSection/MainSection";
import { SideBar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <MainSection />
    </div>
  );
}

export default App;
