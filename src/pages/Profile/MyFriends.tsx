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
import { DEFAULT_PICTURES, BACKEND_URLS } from "../../config/constants";

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
                backendUrl={BACKEND_URLS.user}
                defaultPictureUrl={DEFAULT_PICTURES.user}
              />
            ),
          },
          {
            key: "pending",
            label: "En attente",
            content: (
              <PendingTab
                pending={pending ?? []}
                backendUrl={BACKEND_URLS.user}
                defaultPictureUrl={DEFAULT_PICTURES.user}
              />
            ),
          },
        ]}
      />
    </DataState>
  );
};

export default MyFriends;
