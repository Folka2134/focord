import { useAuthStore } from "@/store/useAuthStore";
import LogoutButton from "../Authentication/LogoutButton";

export const UserDetails = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="bg-[#202020] p-6">
      <div className="flex items-center space-x-4">
        {/* <Avatar user={user} /> */}
        <div>
          <h3 className="text-lg font-medium">{authUser?.userName}</h3>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
