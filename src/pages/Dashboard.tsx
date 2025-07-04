import { useState } from "react";
import MyExchanges from "./Exchanges/MyExchanges";
import MyWishlists from "./Wishlists/MyWishlists";

const Dashboard = () => {
    const [tab, setTab] = useState(1);

    return (
        <>
            <h2>Dashboard</h2>

            <p onClick={() => setTab(1)}>Mes listes</p>
            <p onClick={() => setTab(2)}>Mes échanges</p>

            {tab == 1 && <MyWishlists />}

            {tab == 2 && <MyExchanges />}
        </>
    );
};

export default Dashboard;
