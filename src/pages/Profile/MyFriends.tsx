import {
  useMyFriends,
  useMyPendingFriends,
} from "../../features/profile/MyProfile/MyProfileHelpers";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import TabSwitcher from "../../components/ui/TabSwitcher";
import FriendsTab from "./FriendsTab";
import PendingTab from "./PendingTab";
import { useCombinedState } from "../../hooks/useCombineState";
import { CLIENT_ENV } from "../../config/clientEnv";

const MyFriends = () => {
  const {
    data: friends,
    error: errorFriends,
    isLoading: isLoadingFriends,
  } = useMyFriends();
  const {
    data: pending,
    error: pendingError,
    isLoading: isLoandingPending,
  } = useMyPendingFriends();

  const BACKEND_URL = CLIENT_ENV.VITE_BACKEND_URL_USER;
  const DEFAULT_PICTURE_URL = "/uploads/profilePictures/default-profile.jpg";

  const { loading, error } = useCombinedState([
    { loading: isLoadingFriends, error: errorFriends },
    { loading: isLoandingPending, error: pendingError },
  ]);

  return (
    <DataState loading={loading} error={error}>
      <div className="title-return">
        <BackButton />
        <h1>Mes amis</h1>
      </div>

      <TabSwitcher
        tabs={[
          {
            key: "friends",
            label: "Amis",
            content: (
              <FriendsTab
                friends={friends ?? []}
                backendUrl={BACKEND_URL}
                defaultPictureUrl={DEFAULT_PICTURE_URL}
              />
            ),
          },
          {
            key: "pending",
            label: "En attente",
            content: (
              <PendingTab
                pending={pending ?? []}
                backendUrl={BACKEND_URL}
                defaultPictureUrl={DEFAULT_PICTURE_URL}
              />
            ),
          },
        ]}
      />
    </DataState>
  );
};

export default MyFriends;
