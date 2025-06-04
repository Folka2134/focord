import { FriendItem } from "./FriendItem";

export const FriendList = () => {
  return (
    <div>
      {/* TODO: Fetch and map over friends */}
      <ul className="space-y-2">
        <FriendItem />
      </ul>
    </div>
  );
};
