import { Avatar } from "./Avatar";

export const UserDetails = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">User Details</h2>
      <div className="flex items-center space-x-4">
        <Avatar />
        <div>
          <h3 className="text-lg font-medium">Username</h3>
        </div>
      </div>
    </div>
  );
};
