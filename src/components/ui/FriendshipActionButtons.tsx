interface FriendshipActionButtonsProps {
    status:
        | "none"
        | "pending_sent"
        | "pending_received"
        | "friends"
        | "rejected";
    isSubmitting?: boolean;
    onAdd?: () => void;
    onAccept?: () => void;
    onDecline?: () => void;
}

const FriendshipActionButtons = ({
    status,
    isSubmitting = false,
    onAdd,
    onAccept,
    onDecline,
}: FriendshipActionButtonsProps) => {
    switch (status) {
        case "none":
            return (
                <button className="btn" disabled={isSubmitting} onClick={onAdd}>
                    {isSubmitting ? "Envoi en cours…" : "Ajouter en ami(e)"}
                </button>
            );

        case "pending_sent":
            return (
                <div className="btn btn-friendship-status">Demande envoyée</div>
            );

        case "pending_received":
            return (
                <div className="friendship-buttons">
                    <button className="btn-action" onClick={onAccept}>
                        Accepter
                    </button>
                    <button
                        className="btn-action btn-secondary"
                        onClick={onDecline}
                    >
                        Refuser
                    </button>
                </div>
            );

        case "friends":
            return (
                <div className="btn btn-friendship-status">Vous êtes amis</div>
            );

        case "rejected":
            return (
                <div className="btn btn-friendship-status">Demande refusée</div>
            );

        default:
            return null;
    }
};

export default FriendshipActionButtons;
