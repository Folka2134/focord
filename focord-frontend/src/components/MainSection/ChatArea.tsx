import { MessageItem } from "./MessageItem";

export const ChatArea = () => {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        <ul>
          {/* TODO: CONTEXT: map through conversation messages */}
          <MessageItem />
        </ul>
      </div>
    </div>
  );
};
