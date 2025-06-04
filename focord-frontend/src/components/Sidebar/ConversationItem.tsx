export const ConversationItem = () => {
  return (
    <li className="flex items-center justify-between p-2 hover:bg-gray-100">
      <h1>ConversationItem</h1>
      <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="h-10 w-10 rounded-full"
        />
        <span className="font-medium">Conversation Title</span>
      </div>
      <span className="text-sm text-gray-500">Last message preview...</span>
    </li>
  );
};
