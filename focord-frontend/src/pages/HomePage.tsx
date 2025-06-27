import { MainSection } from "@/components/MainSection/MainSection";
import { SideBar } from "@/components/Sidebar/Sidebar";

const HomePage = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <MainSection />
    </div>
  );
};

export default HomePage;
