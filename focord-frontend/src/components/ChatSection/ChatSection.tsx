import { ChatArea } from "./ChatArea";
import { ChatInput } from "./ChatInput";
import { ChatNavbar } from "./ChatNavbar";

export const ChatSection = () => {
  return (
    <div className="flex h-full w-4/5 flex-col justify-between bg-purple-500">
      <div className="flex h-full w-full flex-col">
        <ChatNavbar />
        <ChatArea />
      </div>
      <ChatInput />
    </div>
  );
};
