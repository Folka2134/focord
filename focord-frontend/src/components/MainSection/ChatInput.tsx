// TODO: Create a send message function and handle input submission
export const ChatInput = () => {
  return (
    <div className="flex w-full items-center border-t p-4">
      {/* TODO: Add send on enter functionality */}
      <input
        type="text"
        placeholder="Type your message here..."
        className="flex-1 rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {/* <button className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"> */}
      {/*   Send */}
      {/* </button> */}
    </div>
  );
};
