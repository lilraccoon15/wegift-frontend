import Spaces from "../features/profile/Spaces";

const Dashboard = () => {
  // TODO (si le temps) : Montrer les actus des amis, SINON montrer les espaces
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
