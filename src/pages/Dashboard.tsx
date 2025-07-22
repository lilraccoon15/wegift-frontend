import Spaces from "../features/profile/Spaces";

const Dashboard = () => {
  // TODO : Montrer les actus des amis, SINON montrer les espaces
  // TODO : Montre les souhaits qu'on a réservé rip
  // TODO : garder pour plus tard le coup des anonyme ou pas
  return (
    <>
      <div className="title-return">
        <h1>Mes espaces</h1>
      </div>
      <Spaces />
    </>
  );
};

export default Dashboard;
