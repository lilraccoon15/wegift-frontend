import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

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
    onDecline?: () => void;
    variant?: "friendship" | "invite" | "custom" | "exchange";
    onCancel?: () => void;
    onToggleMenu?: () => void;
    showMenu?: boolean;
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
    exchange: {
        pendingSent: "Envoyée",
        pendingReceivedAccept: "Accepter",
        pendingReceivedDecline: "Refuser",
        accepted: "Vous avez accepté de participer à l'échange",
        rejected: "Vous avez refusé de participer à l'échange",
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
    onCancel,
    onToggleMenu,
    showMenu,
}: ActionButtonsProps) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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
                    {onCancel && (
                        <button
                            className="btn-action btn-secondary"
                            disabled={isSubmitting}
                            onClick={onCancel}
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
            return (
                <div className="dropdown-wrapper">
                    <button
                        className="btn btn-status"
                        disabled={isSubmitting}
                        onClick={onToggleMenu}
                    >
                        {accepted}
                    </button>

                    {showMenu && (
                        <div className="dropdown-menu">
                            <button
                                onClick={onCancel}
                                className="btn-action btn-danger"
                            >
                                Supprimer l’ami
                            </button>
                        </div>
                    )}
                </div>
            );

        case "rejected":
            return <div className="btn btn-status">{rejected}</div>;

        case "subscribed":
            return (
                <>
                    <div className="action-buttons">
                        <div className="btn-action btn-status">{accepted}</div>
                        {onDecline && (
                            <button
                                className="btn-action btn-secondary"
                                disabled={isSubmitting}
                                onClick={() => setShowConfirmModal(true)}
                            >
                                {cancel}
                            </button>
                        )}
                    </div>
                    {showConfirmModal && (
                        <ConfirmModal
                            title="Confirmer le désabonnement"
                            message="Êtes-vous sûr(e) de vouloir vous désabonner ?"
                            confirmLabel="Oui, me désabonner"
                            cancelLabel="Annuler"
                            onClose={() => setShowConfirmModal(false)}
                            onConfirm={() => {
                                setShowConfirmModal(false);
                                onDecline?.();
                            }}
                        />
                    )}
                </>
            );

        case "not_subscribed":
            return (
                <button
                    className="btn btn-action"
                    disabled={isSubmitting}
                    onClick={onAdd}
                >
                    {isSubmitting ? "Chargement..." : add}
                </button>
            );

        case "loading":
            return <div className="btn-status">Chargement…</div>;

        default:
            return null;
    }
};

export default ActionButtons;
