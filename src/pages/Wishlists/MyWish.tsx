import { useManageMyWish } from "../../features/wishlists/MyWish/useManageMyWish";

const MyWish = () => {

    const {
        id,
        wish,
        loadingWish,
    } = useManageMyWish();

    if (!id) return <p>Paramètre ID manquant</p>;

    if (loadingWish) return <p>Chargement...</p>;
    if (!wish) return <p>Wish non trouvé</p>;

    return (
        <>
            <h1>{wish.title}</h1>
        </>
    )
};

export default MyWish;