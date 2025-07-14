import { useManageMyWish } from "../../features/wishlists/MyWish/useManageMyWish";
import DataState from "../../components/ui/DataState";

const MyWish = () => {
    const { id, wish, loading, error } = useManageMyWish();

    if (!id) return <p>Paramètre ID manquant</p>;

    return (
        <DataState loading={loading} error={error}>
            {!wish ? <p>Wish non trouvé</p> : <h1>{wish.title}</h1>}
        </DataState>
    );
};

export default MyWish;
