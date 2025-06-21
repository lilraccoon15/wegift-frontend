import { useManageViewProfile } from "../../features/profile/ViewProfile/useManageViewProfile";

const ViewProfile = () => {
    const {
        loading,
        error,
        currentUser,
        user,
        friendshipStatus,
        handleAddFriend,
        isSubmitting,
    } = useManageViewProfile();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    const renderFriendButton = () => {
        if (!currentUser || !user) return null;

        switch (friendshipStatus) {
            case "none":
                return (
                    <button disabled={isSubmitting} onClick={handleAddFriend}>
                        {isSubmitting
                            ? "Envoi en cours..."
                            : "Envoyer une demande d'amitié"}
                    </button>
                );
            case "pending_sent":
                return <p>Demande d’amitié envoyée</p>;
            case "pending_received":
                return <p>Cette personne vous a envoyé une demande</p>;
            case "friends":
                return <p>Vous êtes amis</p>;
            case "rejected":
                return <p>Demande refusée</p>;
            default:
                return null;
        }
    };

    return (
        <>
            {renderFriendButton()}
            {user && <h2>Profil de {user.firstName}</h2>}
        </>
    );
};

export default ViewProfile;
