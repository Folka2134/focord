import { SignedIn, SignedOut } from "@clerk/clerk-react";
import "./App.css";
import { MainSection } from "./components/MainSection/MainSection";
import { SideBar } from "./components/Sidebar/Sidebar";
import { SignIn } from "./components/Authentication/SignIn";

function App() {
  return (
    <div className="flex h-screen">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <SideBar />
        <MainSection />
      </SignedIn>
    </div>
  );
}

export default App;
