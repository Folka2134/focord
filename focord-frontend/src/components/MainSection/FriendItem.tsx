import type { User } from "@/types/types";
import { Avatar } from "../Sidebar/Avatar";

export const FriendItem = ({ friend }: { friend: User }) => {
  return (
    // TODO: Display friend data
    <li className="flex items-center space-x-4 p-2 hover:bg-gray-100">
      <Avatar user={friend} />
      <div className="flex flex-col">
        <span className="font-semibold">Friend Name</span>
        <span className="text-sm text-gray-500">Last message or status</span>
      </div>
      {/* TODO: Add User options (e.g., chat, remove friend) */}
    </li>
  );
};
