import {
  respondToFriendRequest,
  useProfile,
} from "../profile/ViewProfile/ViewProfileHelpers";
import type { Notification } from "./NotificationHelpers";
import { useWishlistById } from "../wishlists/UserWishlists/UserWishlistsHelpers";
import { Link } from "react-router-dom";
import ActionButtons from "../../components/ui/ActionButtons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

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
  const wishlistId = data.wishlistId;
  const exchangeId = data.exchangeId;

  const { data: requester } = useProfile(requesterId || "");
  const { data: wishlist } = useWishlistById(wishlistId || "");

  const [responseStatus, setResponseStatus] = useState<
    "none" | "accepted" | "rejected"
  >("none");

  const acceptMutation = useMutation({
    mutationFn: () => respondToFriendRequest(requesterId!, "accept"),
    onSuccess: () => setResponseStatus("accepted"),
  });

  const declineMutation = useMutation({
    mutationFn: () => respondToFriendRequest(requesterId!, "reject"),
    onSuccess: () => setResponseStatus("rejected"),
  });

  const handleAccept = () => {
    if (requesterId) acceptMutation.mutate();
  };

  const handleDecline = () => {
    if (requesterId) declineMutation.mutate();
  };

  // TODO : revérifier l'affichage
  // TODO : possibilité de supprimer une notif

  const DEFAULT_PICTURE_URL_USER =
    "/uploads/profilePictures/default-profile.jpg";
  const BACKEND_URL_USER = import.meta.env.VITE_BACKEND_URL_USER;

  const DEFAULT_PICTURE_URL_WISHLIST =
    "/uploads/wishlistPictures/default-wishlist.png";
  const BACKEND_URL_WISHLIST = import.meta.env.VITE_BACKEND_URL_WISHLIST;

  const DEFAULT_PICTURE_URL_EXCHANGE =
    "/uploads/exchangePictures/default-wishlist.jpg";
  const BACKEND_URL_EXCHANGE = import.meta.env.VITE_BACKEND_URL_EXCHANGE;

  let destination = "#";
  let textContent = notif.type?.text ?? "";
  let pictureUrl = DEFAULT_PICTURE_URL_USER;

  if (notif.type?.type?.startsWith("friendship") && requesterId) {
    destination = `/profile/${requesterId}`;
    const name = requester?.pseudo ?? "Quelqu’un";
    textContent = `${name} ${notif.type.text}`;
    pictureUrl = requester?.picture?.startsWith("blob:")
      ? requester.picture
      : requester?.picture?.startsWith("http")
      ? requester.picture
      : `${BACKEND_URL_USER}${requester?.picture ?? DEFAULT_PICTURE_URL_USER}`;
  }

  if (notif.type?.type?.startsWith("wishlist") && wishlistId) {
    destination = `/wishlist/${wishlistId}`;
    const title = wishlist?.title ?? "une wishlist";
    textContent = `${notif.type.text} ${title}`;
    pictureUrl = wishlist?.picture?.startsWith("blob:")
      ? wishlist.picture
      : wishlist?.picture?.startsWith("http")
      ? wishlist.picture
      : `${BACKEND_URL_WISHLIST}${
          wishlist?.picture ?? DEFAULT_PICTURE_URL_WISHLIST
        }`;
  }

  if (notif.type?.type?.startsWith("exchange") && exchangeId) {
    destination = `/exchange/${exchangeId}`;
    textContent = notif.type.text ?? "Notification d’échange";
    pictureUrl = data.exchangePicture?.startsWith("blob:")
      ? data.exchangePicture
      : data.exchangePicture?.startsWith("http")
      ? data.exchangePicture
      : `${BACKEND_URL_EXCHANGE}${
          data.exchangePicture ?? DEFAULT_PICTURE_URL_EXCHANGE
        }`;
  }

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
            {responseStatus === "none" ? (
              <ActionButtons
                status="pending_received"
                onAccept={handleAccept}
                onDecline={handleDecline}
                isSubmitting={
                  acceptMutation.isPending || declineMutation.isPending
                }
                variant="friendship"
              />
            ) : responseStatus === "accepted" ? (
              <div className="btn btn-status">Vous avez accepté la demande</div>
            ) : (
              <div className="btn btn-status">Vous avez refusé la demande</div>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default NotificationItem;
