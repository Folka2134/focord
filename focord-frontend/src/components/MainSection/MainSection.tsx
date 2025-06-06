import { ChatSection } from "./ChatSection";
import { FriendList } from "./FriendList";

export const MainSection = () => {
  // TODO: CONTEXT: Check context for selected conversation
  const selectedConversation = true; // Placeholder for selected conversation state

  return (
    <div className="flex h-full w-4/5 flex-col justify-between">
      {selectedConversation ? (
        <ChatSection />
      ) : (
        <div>
          <h1 className="mb-4 text-2xl font-bold">Welcome to Focord</h1>
          <FriendList />
        </div>
      )}
    </div>
  );
};
