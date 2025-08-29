import {
  respondToFriendRequest,
  useFriendshipStatus,
  useProfile,
} from "../profile/ViewProfile/ViewProfileHelpers";
import type { Notification } from "./NotificationHelpers";
import { Link } from "react-router-dom";
import ActionButtons from "../../components/ui/ActionButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatPictureUrl } from "../../utils/formatPictureUrl";
import { BACKEND_URLS, DEFAULT_PICTURES } from "../../config/constants";
import { useAuth } from "../../context/AuthContext";

interface Props {
  notif: Notification;
}

const NotificationItem = ({ notif }: Props) => {
  const data = notif.data as {
    requesterId?: string;
    wishlistId?: string;
    wishlistTitle?: string;
    wishlistPicture?: string;
    exchangeId?: string;
    exchangePicture?: string;
  };

  const requesterId = data.requesterId;
  const wishlistId = data.wishlistId;
  const exchangeId = data.exchangeId;

  const { user: myProfile } = useAuth();

  const { data: requester, isLoading: requesterLoading } = useProfile(
    requesterId || ""
  );

  const { data: friendshipData, isLoading: statusLoading } =
    useFriendshipStatus(
      myProfile?.id || "",
      requesterId || "",
      !!myProfile && !!requesterId
    );

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

  if (requesterLoading || statusLoading) {
    return null;
  }

  const handleAccept = () => {
    if (requesterId) acceptMutation.mutate();
  };

  const handleDecline = () => {
    if (requesterId) declineMutation.mutate();
  };

  // TODO : revérifier l'affichage (nom des listes etc)
  // TODO : un souhait a été pris

  let destination = "#";
  let textContent = notif.type?.text ?? "";
  let pictureUrl: string | undefined = undefined;

  // todo : enquêter sur pourquoi j'ai pas l'url de la photo de profil existante

  if (notif.type?.type?.startsWith("friendship") && requesterId) {
    destination = `/profile/${requesterId}`;
    const name = requester?.pseudo ?? "Quelqu’un";
    textContent = `${name} ${notif.type.text}`;
    pictureUrl = formatPictureUrl(
      requester?.picture ?? DEFAULT_PICTURES.user,
      BACKEND_URLS.user,
      DEFAULT_PICTURES.user
    );
  }

  if (notif.type?.type?.startsWith("wishlist-sub")) {
    console.log(notif);
    destination = `/wishlist/${wishlistId}`;
    const name = requester?.pseudo ?? "Quelqu’un";
    const title = data.wishlistTitle ?? "une wishlist";
    textContent = `${name} ${notif.type.text} ${title}`;
    pictureUrl = formatPictureUrl(
      data.wishlistPicture ?? DEFAULT_PICTURES.wishlist,
      BACKEND_URLS.wishlist,
      DEFAULT_PICTURES.wishlist
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
      BACKEND_URLS.exchange,
      DEFAULT_PICTURES.exchange
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
                  acceptMutation.isPending || declineMutation.isPending
                }
                variant="friendship"
              />
            ) : friendshipData?.status === "friends" ? (
              <div className="btn btn-status">Vous avez accepté la demande</div>
            ) : friendshipData?.status === "rejected" ? (
              <div className="btn btn-status">Vous avez refusé la demande</div>
            ) : null}
          </>
        )}
      </div>
    </li>
  );
};

export default NotificationItem;
