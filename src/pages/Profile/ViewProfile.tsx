import { useManageViewProfile } from "../../features/profile/ViewProfile/useManageViewProfile";

const ViewProfile = () => {
    
    const {
        loading,
        error,
        currentUser,
        isFriend,
        user
    } = useManageViewProfile();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            {currentUser && user && !isFriend && <button>Ajouter en ami</button>}
            {isFriend && <p>Vous êtes déjà amis</p>}
            {user && <h2>Profile {user.firstName}</h2>}
        </>
    );
};

export default ViewProfile;