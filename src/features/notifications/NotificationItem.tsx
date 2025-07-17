import { useProfile } from "../profile/ViewProfile/ViewProfileHelpers";
import type { Notification } from "./NotificationHelpers";
import { useWishlistById } from "../wishlists/UserWishlists/UserWishlistsHelpers";
import { Link } from "react-router-dom";
import FriendshipActionButtons from "../../components/ui/FriendshipActionButtons";

interface Props {
  notif: Notification;
}

const NotificationItem = ({ notif }: Props) => {
  const requesterId = notif.data?.requesterId;
  const wishlistId = notif.data?.wishlistId;

  const { data: requester } = useProfile(requesterId || "");
  const { data: wishlist } = useWishlistById(wishlistId || "");

  let contentBeforeText = "";
  let destination = "#";

  if (requesterId) {
    destination = `/profile/${requesterId}`;
    if (requester) contentBeforeText = requester.pseudo;
    else contentBeforeText = requesterId;
  } else if (wishlistId) {
    destination = `/wishlist/${wishlistId}`;
    if (wishlist) contentBeforeText = wishlist.title;
    else contentBeforeText = wishlistId;
  }

  const handleAccept = () => {
    console.log("✅ Accept friend request from", requesterId);
    // TODO: mutation accept
  };

  const handleDecline = () => {
    console.log("❌ Decline friend request from", requesterId);
    // TODO: mutation decline
  };

  return (
    <li className="notification-item">
      <Link to={destination}>
        {!notif.read && "🔵 "}
        {contentBeforeText && <>{contentBeforeText} </>}
        {notif.type?.text || ""}
      </Link>
      {notif.type?.type === "friendship" && (
        <FriendshipActionButtons
          status="pending_received"
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
    </li>
  );
};

export default NotificationItem;
