import { useAuth } from "@/context/AuthContext";
// import { Avatar } from "./Avatar";
import { SignOutButton } from "@clerk/clerk-react";

export const UserDetails = () => {
  const { user } = useAuth();

  return (
    <div className="bg-[#202020] p-6">
      <div className="flex items-center space-x-4">
        {/* <Avatar user={user} /> */}
        <div>
          <h3 className="text-lg font-medium">{user?.fullName}</h3>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
};
