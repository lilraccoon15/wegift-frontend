import { useParams } from "react-router-dom";
import { useAreFriends, useProfile } from "./ViewProfileHelpers";
import { useMyProfile } from "../MyProfile/MyProfileHelpers";

export const useManageViewProfile = () => {
    const { id } = useParams();

    const { data: user, error, isLoading: loading } = useProfile(id!);
    const { data: currentUser } = useMyProfile();
    const shouldCheckFriend = !!currentUser?.id && !!user?.id;
    const { data: isFriend } = useAreFriends(
    currentUser?.id ?? "",
    user?.id ?? "",
    shouldCheckFriend
    );

    const handleAddFriend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
    }

    return {
        loading,
        error,
        currentUser,
        isFriend,
        user,
        handleAddFriend
    }
}