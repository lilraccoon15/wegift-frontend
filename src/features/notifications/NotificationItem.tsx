import {
    respondToFriendRequest,
    useProfile,
} from "../profile/ViewProfile/ViewProfileHelpers";
import type { Notification } from "./NotificationHelpers";
import { useWishlistById } from "../wishlists/UserWishlists/UserWishlistsHelpers";
import { Link } from "react-router-dom";
import ActionButtons from "../../components/ui/ActionButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
    notif: Notification;
}

const NotificationItem = ({ notif }: Props) => {
    const data = notif.data as { requesterId?: string; wishlistId?: string };
    const requesterId: string | undefined = data.requesterId;
    const wishlistId: string | undefined = data.wishlistId;

    const { data: requester } = useProfile(requesterId || "");
    const { data: wishlist } = useWishlistById(wishlistId || "");

    const [responseStatus, setResponseStatus] = useState<
        "none" | "accepted" | "rejected"
    >("none");

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

    const acceptMutation = useMutation({
        mutationFn: () => respondToFriendRequest(requesterId!, "accept"),
        onSuccess: () => {
            setResponseStatus("accepted");
        },
    });

    const declineMutation = useMutation({
        mutationFn: () => respondToFriendRequest(requesterId!, "reject"),
        onSuccess: () => {
            setResponseStatus("rejected");
        },
    });

    const handleAccept = () => {
        if (requesterId) acceptMutation.mutate();
    };

    const handleDecline = () => {
        if (requesterId) declineMutation.mutate();
    };

    const DEFAULT_PICTURE_URL_USER =
        "/uploads/profilePictures/default-profile.jpg";
    const BACKEND_URL_USER = import.meta.env.VITE_BACKEND_URL_USER;

      const DEFAULT_PICTURE_URL_WISHLIST =
        "/uploads/wishlistPictures/default-wishlist.png";
      const BACKEND_URL_WISHLIST = import.meta.env.VITE_BACKEND_URL_WISHLIST;

      const DEFAULT_PICTURE_URL_EXCHANGE =
        "/uploads/exchangePictures/default-wishlist.jpg";
      const BACKEND_URL_EXCHANGE = import.meta.env.VITE_BACKEND_URL_EXCHANGE;

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
                                          requester?.picture ??
                                          DEFAULT_PICTURE_URL_USER
                                      }`
                            }')`,
                        }}
                    />
                </Link>
            </div>
            <div className="notif-details">
                <div className="notif-text">
                    <Link to={destination}>
                        <strong>
                            {contentBeforeText && <>{contentBeforeText} </>}
                        </strong>
                    </Link>
                    {notif.type?.text || ""}
                </div>
                {notif.type?.type === "friendship" && (
                    <>
                        {responseStatus === "none" ? (
                            <ActionButtons
                                status="pending_received"
                                onAccept={handleAccept}
                                onDecline={handleDecline}
                                isSubmitting={
                                    acceptMutation.isPending ||
                                    declineMutation.isPending
                                }
                                variant="friendship"
                            />
                        ) : responseStatus === "accepted" ? (
                            <div className="btn btn-status">
                                Vous avez accepté la demande
                            </div>
                        ) : (
                            <div className="btn btn-status">
                                Vous avez refusé la demande
                            </div>
                        )}
                    </>
                )}
            </div>
        </li>
    );
};

export default NotificationItem;
