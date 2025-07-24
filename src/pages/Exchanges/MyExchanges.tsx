import { useNavigate } from "react-router-dom";
import { type Exchange } from "../../features/exchanges/MyExchanges/MyExchangesHelpers";
import { useManageMyExchanges } from "../../features/exchanges/MyExchanges/useManageMyExchanges";
import CreateExchangeForm from "../../features/exchanges/CreateExchange/CreateExchangeForm";
import EditExchangeForm from "../../features/exchanges/EditExchange/EditExchangeForm";
import DataState from "../../components/ui/DataState";
import Modal from "../../components/ui/Modal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import CardList from "../../components/ui/CardList";

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
    exchanges,
    isLoading,
    error,
    currentUser,
    confirmDelete,
    optionsExchangeId,
    toggleOptions,
    showConfirm,
    exchangeToDelete,
    setShowConfirm,
    setExchangeToDelete,
    setOptionsExchangeId,
    handleDeleteButton,
  } = useManageMyExchanges(navigate);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_EXCHANGE;

  return (
    <DataState loading={isLoading} error={error}>
      <CardList<Exchange>
        items={exchanges ?? []}
        backendUrl={BACKEND_URL}
        onAddClick={() => setShowCreate(true)}
        getLink={(item) => `/my-exchange/${item.id}`}
        showEditMenu={(item) => item.userId === currentUser?.id}
        onEditClick={openEditForm}
        onDeleteClick={confirmDelete}
        optionsItemId={optionsExchangeId}
        toggleOptions={toggleOptions}
        getDefaultPicture={() =>
          "/uploads/exchangePictures/default-exchange.png"
        }
        getPictureUrl={(item) =>
          item.picture?.startsWith("http")
            ? item.picture
            : item.picture
            ? `${BACKEND_URL}${item.picture}`
            : `${BACKEND_URL}/uploads/exchangePictures/default-exchange.png`
        }
      />
      {/* TODO : ajouter le statut de l'échange & le nombre de participants ? */}

      {showConfirm && exchangeToDelete && (
        <ConfirmModal
          title="Supprimer cet échange ?"
          message={`Souhaitez-vous vraiment supprimer l'échange "${exchangeToDelete.title}" ?`}
          onClose={() => {
            setShowConfirm(false);
            setExchangeToDelete(null);
            setOptionsExchangeId(null);
          }}
          onConfirm={() => {
            handleDeleteButton(exchangeToDelete);
            setShowConfirm(false);
            setExchangeToDelete(null);
          }}
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
        />
      )}

      {openEdition && exchangeToEdit && (
        <Modal onClose={closeEditForm} title="Editer mon échange">
          <div className="modal-body">
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
          </div>
        </Modal>
      )}

      {showCreate && (
        <Modal onClose={() => setShowCreate(false)} title="Créer un échange">
          <div className="modal-body">
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
          </div>
        </Modal>
      )}
    </DataState>
  );
};

export default MyExchanges;
