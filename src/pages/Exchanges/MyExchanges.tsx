import { Link, useNavigate } from "react-router-dom";
import { useMyExchanges } from "../../features/exchanges/MyExchanges/MyExchangesHelpers";
import { useManageMyExchanges } from "../../features/exchanges/MyExchanges/useManageMyExchanges";
import CreateExchangeForm from "../../features/exchanges/CreateExchange/CreateExchangeForm";
import EditExchangeForm from "../../features/exchanges/EditExchange/EditExchangeForm";

const MyExchanges = () => {
  const navigate = useNavigate();

  const {
    title,
    description,
    picturePreview,
    isSubmitting,
    submitError,
    showCreate,
    openEdition,
    exchangeToEdit,
    setTitle,
    setDescription,
    setShowCreate,
    handlePictureChange,
    handleCreateSubmit,
    handleEditSubmit,
    handleDelete,
    openEditForm,
    closeEditForm,
    participants,
    startDate,
    endDate,
    setParticipants,
    setEndDate,
    setStartDate,
    availableRules,
    selectedRuleIds,
    setSelectedRuleIds,
    budget,
    setBudget,
  } = useManageMyExchanges(navigate);

  const { data: exchanges, error } = useMyExchanges();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_EXCHANGES;

  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <ul className="card-list">
        <li onClick={() => setShowCreate(true)} className="card">
          <div className="new-card">
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="card-infos">
            <h2>Créer un échange</h2>
          </div>
        </li>
        {exchanges && exchanges?.length > 0 && (
          <>
            {exchanges.map((e) => (
              <li key={e.id} className="card">
                <Link to={`/wishlist/${e.id}`}>
                  {e.picture ? (
                    <img
                      src={`${BACKEND_URL}${e.picture}`}
                      alt={`${e.title} picture`}
                    />
                  ) : (
                    <div className="replace-card-picture"></div>
                  )}
                </Link>
                <div className="card-infos">
                  <h2>{e.title}</h2>
                  <span>{e.participantCount} participants</span>
                </div>

                <button onClick={() => openEditForm(e)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </li>
            ))}
          </>
        )}
      </ul>

      {openEdition && exchangeToEdit && (
        <div>
          <EditExchangeForm
            onSubmit={handleEditSubmit}
            title={title}
            onTitleChange={(e) => setTitle(e.target.value)}
            onPictureChange={handlePictureChange}
            description={description}
            onDescriptionChange={(e) => setDescription(e.target.value)}
            picturePreview={picturePreview}
            error={submitError}
            buttondisabled={isSubmitting}
            handleDelete={handleDelete}
            participants={participants}
            setParticipants={setParticipants}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            availableRules={availableRules}
            selectedRuleIds={selectedRuleIds}
            setSelectedRuleIds={setSelectedRuleIds}
            budget={budget}
            setBudget={setBudget}
          />
          <button onClick={closeEditForm}>Annuler</button>
        </div>
      )}

      {showCreate && (
        <CreateExchangeForm
          onSubmit={handleCreateSubmit}
          title={title}
          onTitleChange={(e) => setTitle(e.target.value)}
          onPictureChange={handlePictureChange}
          description={description}
          onDescriptionChange={(e) => setDescription(e.target.value)}
          picturePreview={picturePreview}
          error={submitError}
          buttondisabled={isSubmitting}
          participants={participants}
          setParticipants={setParticipants}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          availableRules={availableRules}
          selectedRuleIds={selectedRuleIds}
          setSelectedRuleIds={setSelectedRuleIds}
          budget={budget}
          setBudget={setBudget}
        />
      )}
    </>
  );
};

export default MyExchanges;
