import type { UserResource } from "@clerk/types";

export const Avatar = ({ user }: { user: UserResource | null }) => {
  const imageUrl = user?.imageUrl || "https://via.placeholder.com/150";

  return (
    <div>
      <img
        src={imageUrl}
        alt={user?.fullName || "User Avatar"}
        className="h-12 w-12 rounded-full object-cover"
      />
    </div>
  );
};
