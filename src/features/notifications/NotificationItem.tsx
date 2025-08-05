import {
    respondToFriendRequest,
    useFriendshipStatus,
    useProfile,
} from "../profile/ViewProfile/ViewProfileHelpers";
import type { Notification } from "./NotificationHelpers";
import { useWishlistById } from "../wishlists/UserWishlists/UserWishlistsHelpers";
import { Link } from "react-router-dom";
import ActionButtons from "../../components/ui/ActionButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CLIENT_ENV } from "../../config/clientEnv";
import { useMyProfile } from "../profile/MyProfile/MyProfileHelpers";
import { formatPictureUrl } from "../../utils/formatPictureUrl";

interface Props {
    notif: Notification;
}

const NotificationItem = ({ notif }: Props) => {
    const data = notif.data as {
        requesterId?: string;
        wishlistId?: string;
        exchangeId?: string;
        exchangePicture?: string;
    };

    const requesterId = data.requesterId;
    const { data: myProfile } = useMyProfile();

    const wishlistId = data.wishlistId;
    const exchangeId = data.exchangeId;

    const { data: friendshipData, isLoading: statusLoading } =
        useFriendshipStatus(
            myProfile?.id || "",
            requesterId || "",
            !!myProfile && !!requesterId
        );

    const { data: requester } = useProfile(requesterId || "");
    const { data: wishlist } = useWishlistById(wishlistId || "");

    const queryClient = useQueryClient();

    const acceptMutation = useMutation({
        mutationFn: () => respondToFriendRequest(requesterId!, "accept"),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["friendshipStatus", myProfile?.id, requesterId],
            });
        },
    });

    const declineMutation = useMutation({
        mutationFn: () => respondToFriendRequest(requesterId!, "reject"),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["friendshipStatus", myProfile?.id, requesterId],
            });
        },
    });

    const handleAccept = () => {
        if (requesterId) acceptMutation.mutate();
    };

    const handleDecline = () => {
        if (requesterId) declineMutation.mutate();
    };

    // TODO : revérifier l'affichage (nom des listes etc)
    // TODO : un souhait a été pris

    const DEFAULT_PICTURE_URL_USER =
        "/uploads/profilePictures/default-profile.jpg";
    const BACKEND_URL_USER = CLIENT_ENV.VITE_BACKEND_URL_USER;

    const DEFAULT_PICTURE_URL_WISHLIST =
        "/uploads/wishlistPictures/default-wishlist.png";
    const BACKEND_URL_WISHLIST = CLIENT_ENV.VITE_BACKEND_URL_WISHLIST;

    const DEFAULT_PICTURE_URL_EXCHANGE =
        "/uploads/exchangePictures/default-exchange.png";
    const BACKEND_URL_EXCHANGE = CLIENT_ENV.VITE_BACKEND_URL_EXCHANGE;

    let destination = "#";
    let textContent = notif.type?.text ?? "";
    let pictureUrl: string | undefined = undefined;
    // console.log(notif);
    // console.log(data);
    // console.log(wishlistId);
    if (notif.type?.type?.startsWith("wishlist-sub")) {
        console.log(data);
    }

    // todo : enquêter sur pourquoi j'ai pas l'url de la photo de profil existante

    if (notif.type?.type?.startsWith("friendship") && requesterId) {
        destination = `/profile/${requesterId}`;
        const name = requester?.pseudo ?? "Quelqu’un";
        textContent = `${name} ${notif.type.text}`;
        pictureUrl = formatPictureUrl(
            requester?.picture,
            BACKEND_URL_USER,
            DEFAULT_PICTURE_URL_USER
        );
    }

    if (notif.type?.type?.startsWith("wishlist") && wishlistId) {
        console.log(notif);
        destination = `/wishlist/${wishlistId}`;
        const title = wishlist?.title ?? "une wishlist";
        textContent = `${notif.type.text} ${title}`;
        pictureUrl = formatPictureUrl(
            wishlist?.picture,
            BACKEND_URL_WISHLIST,
            DEFAULT_PICTURE_URL_WISHLIST
        );
    }

    // if (notif.type?.type?.startsWith("wish") && wishId) {
    //   destination = `/wish/${wishId}`;
    //   const title = wishlist?.title ?? "un souhait";
    //   textContent = `${notif.type.text} ${title}`;
    //   pictureUrl = formatPictureUrl(
    //     wish?.picture,
    //     BACKEND_URL_WISH,
    //     DEFAULT_PICTURE_URL_WISH
    //   );
    // }

    if (notif.type?.type?.startsWith("exchange") && exchangeId) {
        destination = `/exchange/${exchangeId}`;
        textContent = notif.type.text ?? "Notification d’échange";
        pictureUrl = formatPictureUrl(
            data.exchangePicture,
            BACKEND_URL_EXCHANGE,
            DEFAULT_PICTURE_URL_EXCHANGE
        );
    }

    // console.log(pictureUrl);

    return (
        <li className="notification-item">
            <div className="notif-picture">
                {!notif.read && "🔵 "}
                <Link to={destination}>
                    <div
                        className="profile-picture"
                        style={{
                            backgroundImage: `url('${pictureUrl}')`,
                        }}
                    />
                </Link>
            </div>
            <div className="notif-details">
                <div className="notif-text">
                    <Link to={destination}>{textContent}</Link>
                </div>

                {notif.type?.type === "friendship" && (
                    <>
                        {statusLoading ? null : friendshipData?.status ===
                          "pending_received" ? (
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
                        ) : friendshipData?.status === "friends" ? (
                            <div className="btn btn-status">
                                Vous avez accepté la demande
                            </div>
                        ) : friendshipData?.status === "rejected" ? (
                            <div className="btn btn-status">
                                Vous avez refusé la demande
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </li>
    );
};

export default NotificationItem;
