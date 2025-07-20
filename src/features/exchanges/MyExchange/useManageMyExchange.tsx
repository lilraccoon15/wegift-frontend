import { useParams } from "react-router-dom";
import { useMyExchangeById } from "../MyExchanges/MyExchangesHelpers";

export const useManageMyExchange = (navigate: any) => {
    const { id } = useParams<{ id: string }>();

    // =======================
    // Queries
    // =======================
    const {
        data,
        isLoading: loadingExchange,
        error: errorExchange,
    } = useMyExchangeById(id ?? "");

    const exchange = data.data.exchange;

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_WISHLIST;

    return { exchange, loadingExchange, errorExchange, BACKEND_URL };
};

export default useManageMyExchange;
