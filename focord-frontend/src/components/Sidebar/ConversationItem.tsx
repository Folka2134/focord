import { Avatar } from "./Avatar";

export const ConversationItem = () => {
  // TODO: Pull conversation data from context
  // TODO: Display conversation data

  return (
    <li className="flex flex-col items-center justify-between p-2 hover:bg-gray-100">
      <div className="flex items-center space-x-2">
        <ul>
          {/* TODO: Map through conversation members and display their avatars (max of 3) */}
          <Avatar />
        </ul>
        <span className="font-medium">Conversation Title</span>
      </div>
      <span className="text-sm text-gray-500">Last message preview...</span>
    </li>
  );
};
