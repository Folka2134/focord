import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const { isLoggingOut, logout } = useAuthStore();

  return (
    <div>
      <Button
        onClick={logout}
        disabled={isLoggingOut}
        className="cursor-pointer"
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
