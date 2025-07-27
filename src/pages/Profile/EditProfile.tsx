import EditProfileForm from "../../features/profile/EditProfile/EditProfileForm";
import { useManageProfile } from "../../features/profile/EditProfile/useManageEditProfile";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";

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
            <div className="title-return">
                <BackButton />
                <h1>Éditer le profil</h1>
            </div>
            <div className="frame">
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
            </div>
        </DataState>
    );
};

export default EditProfile;
