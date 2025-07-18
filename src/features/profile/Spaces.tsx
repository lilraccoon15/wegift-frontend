import MyWishlists from "../../pages/Wishlists/MyWishlists";
import MyExchanges from "../../pages/Exchanges/MyExchanges";
import TabSwitcher from "../../components/ui/TabSwitcher";

const Spaces = () => {
  return (
    <TabSwitcher
      tabs={[
        {
          key: "wishlists",
          label: "Mes listes",
          content: <MyWishlists />,
        },
        {
          key: "exchanges",
          label: "Mes échanges",
          content: <MyExchanges />,
        },
      ]}
    />
  );
};

export default Spaces;
