interface ActionButtonsProps {
  status: string;
  isSubmitting?: boolean;
  labels?: Partial<{
    add: string;
    pendingSent: string;
    pendingReceivedAccept: string;
    pendingReceivedDecline: string;
    accepted: string;
    rejected: string;
    cancel: string;
  }>;
  onAdd?: () => void;
  onAccept?: () => void;
  onDecline?: () => void; // utilisé aussi pour "Annuler"
  variant?: "friendship" | "invite" | "custom";
}

const defaultLabelsByVariant: Record<
  NonNullable<ActionButtonsProps["variant"]>,
  Partial<ActionButtonsProps["labels"]>
> = {
  friendship: {
    add: "Ajouter en ami(e)",
    pendingSent: "Envoyée",
    pendingReceivedAccept: "Accepter",
    pendingReceivedDecline: "Refuser",
    accepted: "Vous êtes amis",
    rejected: "Demande refusée",
    cancel: "Annuler",
  },
  invite: {
    add: "Inviter",
    pendingSent: "Envoyée",
    pendingReceivedAccept: "Rejoindre",
    pendingReceivedDecline: "Décliner",
    accepted: "Inscrit(e)",
    rejected: "Invitation refusée",
    cancel: "Annuler l'invitation",
  },
  custom: {},
};

const ActionButtons = ({
  status,
  isSubmitting = false,
  labels = {},
  onAdd,
  onAccept,
  onDecline,
  variant = "custom",
}: ActionButtonsProps) => {
  const mergedLabels = {
    ...defaultLabelsByVariant[variant],
    ...labels,
  };

  const {
    add = "Ajouter",
    pendingSent = "En attente",
    pendingReceivedAccept = "Accepter",
    pendingReceivedDecline = "Refuser",
    accepted = "Accepté",
    rejected = "Refusé",
    cancel = "Annuler",
  } = mergedLabels;

  switch (status) {
    case "none":
      return (
        <button className="btn" disabled={isSubmitting} onClick={onAdd}>
          {isSubmitting ? "Envoi en cours…" : add}
        </button>
      );

    case "pending_sent":
      return (
        <div className="action-buttons">
          <div className="btn-status">{pendingSent}</div>
          {onDecline && (
            <button
              className="btn-action btn-secondary"
              disabled={isSubmitting}
              onClick={onDecline}
            >
              {cancel}
            </button>
          )}
        </div>
      );

    case "pending_received":
      return (
        <div className="action-buttons">
          <button
            className="btn-action"
            disabled={isSubmitting}
            onClick={onAccept}
          >
            {pendingReceivedAccept}
          </button>
          <button
            className="btn-action btn-secondary"
            disabled={isSubmitting}
            onClick={onDecline}
          >
            {pendingReceivedDecline}
          </button>
        </div>
      );

    case "accepted":
    case "friends":
      return <div className="btn btn-status">{accepted}</div>;

    case "rejected":
      return <div className="btn btn-status">{rejected}</div>;

    default:
      return null;
  }
};

export default ActionButtons;
