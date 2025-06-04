import { ConversationList } from "./ConversationList";

export const SideBar = () => {
  return (
    <div className="h-screen w-1/5 border-r">
      <h1 className="text-2xl font-bold">Sidebar</h1>
      <ConversationList />
      {/* <UserDetails /> */}
    </div>
  );
};
