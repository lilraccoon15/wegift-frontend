import { useProfile } from "../profile/ViewProfile/ViewProfileHelpers";
import type { Notification } from "./NotificationHelpers";
import { useWishlistById } from "../wishlists/UserWishlists/UserWishlistsHelpers";
import { Link } from "react-router-dom";
import ActionButtons from "../../components/ui/ActionButtons";

interface Props {
  notif: Notification;
}

const NotificationItem = ({ notif }: Props) => {
  const data = notif.data as { requesterId?: string; wishlistId?: string };
  const requesterId: string | undefined = data.requesterId;
  const wishlistId: string | undefined = data.wishlistId;

  const { data: requester } = useProfile(requesterId || "");
  const { data: wishlist } = useWishlistById(wishlistId || "");
  console.log(requester);

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

  const DEFAULT_PICTURE_URL_USER =
    "/uploads/profilePictures/default-profile.jpg";
  const BACKEND_URL_USER = import.meta.env.VITE_BACKEND_URL_USER;

  //   const DEFAULT_PICTURE_URL_WISHLIST =
  //     "/uploads/wishlistPictures/default-wishlist.jpg";
  //   const BACKEND_URL_WISHLIST = import.meta.env.VITE_BACKEND_URL_WISHLIST;

  //   const DEFAULT_PICTURE_URL_EXCHANGE =
  //     "/uploads/exchangePictures/default-wishlist.jpg";
  //   const BACKEND_URL_EXCHANGE = import.meta.env.VITE_BACKEND_URL_EXCHANGE;

  return (
    <li className="notification-item">
      <div className="notif-picture">
        {!notif.read && "🔵 "}
        <Link to={destination}>
          <div
            className="profile-picture"
            style={{
              backgroundImage: `url('${
                requester?.picture?.startsWith("blob:")
                  ? requester?.picture
                  : requester?.picture?.startsWith("http")
                  ? requester?.picture
                  : `${BACKEND_URL_USER}${
                      requester?.picture ?? DEFAULT_PICTURE_URL_USER
                    }`
              }')`,
            }}
          />
        </Link>
      </div>
      <div className="notif-details">
        <div className="notif-text">
          <Link to={destination}>
            <strong>{contentBeforeText && <>{contentBeforeText} </>}</strong>
          </Link>
          {notif.type?.text || ""}
        </div>
        {notif.type?.type === "friendship" && (
          <ActionButtons
            status="pending_received"
            onAccept={handleAccept}
            onDecline={handleDecline}
            variant="friendship"
          />
        )}
      </div>
    </li>
  );
};

export default NotificationItem;
