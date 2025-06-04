import { ConversationItem } from "./ConversationItem";

export const ConversationList = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Conversations</h2>
      <ul className="space-y-2">
        <ConversationItem />
      </ul>
    </div>
  );
};
