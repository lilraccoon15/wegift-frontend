import { useProfile } from "../profile/ViewProfile/ViewProfileHelpers";
import type { Notification } from "./NotificationHelpers";
import { useWishlistById } from "../wishlists/UserWishlists/UserWishlistsHelpers";
import { Link } from "react-router-dom";

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

    return (
        <Link to={destination}>
            <li className="notification-item">
                {!notif.read && "🔵 "}
                {contentBeforeText && <>{contentBeforeText} </>}
                {notif.type?.text || ""}
            </li>
        </Link>
    );
};

export default NotificationItem;
