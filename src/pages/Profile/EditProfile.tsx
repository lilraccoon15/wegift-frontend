import EditProfileForm from "../../features/profile/EditProfile/EditProfileForm";
import { useManageProfile } from "../../features/profile/EditProfile/useManageEditProfile";
import DataState from "../../components/ui/DataState";

const EditProfile = () => {
    const {
        error,
        isLoading,
        pseudo,
        birthDate,
        picturePreview,
        description,
        isSubmitting,
        submitError,
        setPseudo,
        setDescription,
        handleEditSubmit,
        handleBirthDateChange,
        handlePictureChange,
    } = useManageProfile();

    return (
        <DataState loading={isLoading} error={error}>
            <h1>Éditer le profil</h1>
            <EditProfileForm
                pseudo={pseudo}
                birthDate={birthDate}
                picturePreview={picturePreview}
                description={description}
                onPseudoChange={(e) => setPseudo(e.target.value)}
                onBirthDateChange={handleBirthDateChange}
                onDescriptionChange={(e) => setDescription(e.target.value)}
                onPictureChange={handlePictureChange}
                onSubmit={handleEditSubmit}
                error={submitError}
                buttondisabled={isSubmitting}
            />
        </DataState>
    );
};

export default EditProfile;
