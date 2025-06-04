import { MessageItem } from "./MessageItem";

export const ChatArea = () => {
  return (
    <div className="flex h-full w-full flex-col bg-green-400 p-4">
      <div className="flex-1 overflow-y-auto">
        <p className="text-gray-700">Chat messages will be displayed here.</p>
        <MessageItem />
      </div>
    </div>
  );
};
