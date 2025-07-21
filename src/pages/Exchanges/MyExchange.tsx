import { useNavigate } from "react-router-dom";
import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import useManageMyExchange from "../../features/exchanges/MyExchange/useManageMyExchange";

const MyExchange = () => {
  const navigate = useNavigate();

  const { loadingExchange, errorExchange, exchange, BACKEND_URL } =
    useManageMyExchange(navigate);

  return (
    <DataState loading={loadingExchange} error={errorExchange}>
      {exchange && (
        <>
          <div className="title-return">
            <BackButton />
            {exchange.title && <h1>{exchange.title}</h1>}
          </div>

          <div
            className=""
            style={{
              backgroundImage: `url('${
                exchange.picture?.startsWith("http")
                  ? exchange.picture
                  : exchange.picture
                  ? `${BACKEND_URL}${exchange.picture}`
                  : "/default-exchange-picture.jpg"
              }')`,
            }}
          ></div>
          {exchange.title}
          {exchange.participantCount}
          {exchange.participants}
          {exchange.description}
          {exchange.endDate}
          {exchange.startDate}
          {exchange.status}
        </>
      )}
    </DataState>
  );
};

export default MyExchange;
