import { ConversationList } from "./ConversationList";
import { UserDetails } from "./UserDetails";
// import { UserDetails } from "./UserDetails";

export const SideBar = () => {
  return (
    <div className="flex h-screen w-1/5 flex-col justify-between border-r">
      <ConversationList />
      <UserDetails />
    </div>
  );
};
