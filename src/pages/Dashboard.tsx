import { useState } from "react";
import MyExchanges from "./Exchanges/MyExchanges";
import MyWishlists from "./Wishlists/MyWishlists";

const Dashboard = () => {
    const [tab, setTab] = useState(1);

    return (
        <>
            <div className="dashboard-nav">
                <div
                    onClick={() => setTab(1)}
                    className={`btn ${tab === 1 ? "active" : ""}`}
                >
                    {" "}
                    Mes listes
                </div>
                <div
                    onClick={() => setTab(2)}
                    className={`btn ${tab === 2 ? "active" : ""}`}
                >
                    {" "}
                    Mes échanges
                </div>
            </div>

            <div className="dashboard-content">
                {tab == 1 && <MyWishlists />}

                {tab == 2 && <MyExchanges />}
            </div>
        </>
    );
};

export default Dashboard;
