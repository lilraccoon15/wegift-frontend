import { useState } from "react";
import MyWishlists from "../../pages/Wishlists/MyWishlists";
import MyExchanges from "../../pages/Exchanges/MyExchanges";

const Spaces = () => {
  const [tab, setTab] = useState(1);

  return (
    <>
      <div className="dashboard-nav">
        <div
          onClick={() => setTab(1)}
          className={`tab ${tab === 1 ? "active" : ""}`}
        >
          {" "}
          Mes listes
        </div>
        <div
          onClick={() => setTab(2)}
          className={`tab ${tab === 2 ? "active" : ""}`}
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

export default Spaces;
