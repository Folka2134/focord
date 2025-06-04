import { ChatArea } from "./ChatArea";
import { ChatInput } from "./ChatInput";
import { ChatNavbar } from "./ChatNavbar";

export const ChatSection = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col">
        <ChatNavbar />
        <ChatArea />
      </div>
      <ChatInput />
    </div>
  );
};
