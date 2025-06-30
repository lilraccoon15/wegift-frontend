import EditProfileForm from "../../features/profile/EditProfile/EditProfileForm";
import { useManageProfile } from "../../features/profile/EditProfile/useManageEditProfile";

const EditProfile = () => {
    const {
        error,
        firstName,
        lastName,
        birthDate,
        picturePreview,
        description,
        isSubmitting,
        submitError,
        setFirstName,
        setLastName,
        setDescription,
        handleEditSubmit,
        handleBirthDateChange,
        handlePictureChange,
    } = useManageProfile();

    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h1>éditer le profil</h1>
            <EditProfileForm
                firstName={firstName}
                lastName={lastName}
                birthDate={birthDate}
                picturePreview={picturePreview}
                description={description}
                onFirstNameChange={(e) => setFirstName(e.target.value)}
                onLastNameChange={(e) => setLastName(e.target.value)}
                onBirthDateChange={handleBirthDateChange}
                onDescriptionChange={(e) => setDescription(e.target.value)}
                onPictureChange={handlePictureChange}
                onSubmit={handleEditSubmit}
                buttonClassName="bg-green-600 hover:bg-green-700"
                error={submitError}
                buttondisabled={isSubmitting}
            />
        </>
    );
};

export default EditProfile;
