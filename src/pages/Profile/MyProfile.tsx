import { Link } from "react-router-dom";
import { useMyProfile } from "../../features/profile/MyProfile/MyProfileHelpers";

const MyProfile = () => {
    const { data: user, error, isLoading: loading } = useMyProfile();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            {user && <h2>Profile {user.firstName}</h2>}
            <Link to="/edit-profile">Modifier mon profil</Link>
        </>
    );
};

export default MyProfile;