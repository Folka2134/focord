import type { User } from "@/types/types";

export const Avatar = ({ user }: { user: User | null }) => {
  // TODO: Replace with actual user image URL
  const imageUrl = "https://via.placeholder.com/150";
  // user?.clerkInfo.imageUrl ||

  return (
    <div>
      <img
        src={imageUrl}
        alt={user?.username || "User Avatar"}
        className="h-12 w-12 rounded-full object-cover"
      />
    </div>
  );
};
