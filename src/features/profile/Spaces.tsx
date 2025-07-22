import MyWishlists from "../../pages/Wishlists/MyWishlists";
import MyExchanges from "../../pages/Exchanges/MyExchanges";
import TabSwitcher from "../../components/ui/TabSwitcher";
import MyWishes from "../../pages/Wishlists/MyWishes";

const Spaces = () => {
  return (
    <TabSwitcher
      tabs={[
        {
          key: "wishlists",
          label: "Listes",
          content: <MyWishlists />,
        },
        {
          key: "exchanges",
          label: "Echanges",
          content: <MyExchanges />,
        },
        {
          key: "wishes",
          label: "Souhaits",
          content: <MyWishes />,
        },
      ]}
    />
  );
};

export default Spaces;
