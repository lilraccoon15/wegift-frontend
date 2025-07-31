import DataState from "../../components/ui/DataState";
import BackButton from "../../components/ui/BackButton";
import useManageMyExchange from "../../features/exchanges/MyExchange/useManageMyExchange";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";

const MyExchange = () => {
  const {
    loading,
    error,
    exchange,
    BACKEND_URL,
    handleDrawExchange,
    isOwner,
    hasBeenDrawn,
    showAssignment,
    setShowAssignment,
    profiles,
    currentUser,
    confirmCancelOpen,
    setConfirmCancelOpen,
    hasStarted,
    handleCancelDraw,
  } = useManageMyExchange();

  // TODO :
  // - bouton signaler pour utilisateur
  // - bouton supprimer pour admin

  const DEFAULT_PICTURE_URL = "/uploads/exchangePictures/default-exchange.png";
  const assignment = exchange?.assigned?.find(
    (a) => a.userId === currentUser?.id
  );
  const targetName = assignment
    ? profiles[assignment.assignedUserId] ?? ""
    : "";

  return (
    <DataState loading={loading} error={error}>
      {exchange && (
        <>
          <div className="title-return">
            <BackButton />
            {exchange.title && <h1>{exchange.title}</h1>}
          </div>

          <div
            className="exchange-picture"
            style={{
              backgroundImage: `url('${
                exchange.picture?.startsWith("http")
                  ? exchange.picture
                  : exchange.picture
                  ? `${BACKEND_URL}${exchange.picture}`
                  : `${BACKEND_URL}${DEFAULT_PICTURE_URL}`
              }')`,
            }}
          ></div>
          <h2>{exchange.title}</h2>
          <p>{exchange.participantsCount}</p>
          <ul>
            {exchange.participants
              ?.filter((p) => p.userId !== currentUser?.id)
              .map((p) => (
                <li
                  key={p.id}
                  className={`participant ${
                    !p.acceptedAt ? "participant--pending" : ""
                  }`}
                >
                  {profiles[p.userId]}
                </li>
              ))}
          </ul>
          <p>{exchange.description}</p>
          <p>{exchange.endDate}</p>
          <p>{exchange.startDate}</p>

          {!hasBeenDrawn ? (
            isOwner ? (
              <button onClick={handleDrawExchange}>Lancer le tirage</button>
            ) : (
              <p>Tirage à venir</p>
            )
          ) : (
            <>
              {!showAssignment ? (
                <>
                  <button onClick={() => setShowAssignment(true)}>
                    Voir mon assignation
                  </button>
                  {isOwner && !hasStarted && (
                    <>
                      <button
                        onClick={() => setConfirmCancelOpen(true)}
                        style={{
                          marginTop: "1rem",
                          backgroundColor: "crimson",
                          color: "white",
                        }}
                      >
                        ❌ Annuler le tirage
                      </button>
                      {confirmCancelOpen && (
                        <ConfirmModal
                          title="Annuler le tirage ?"
                          message="Êtes-vous sûr ? Cela supprimera toutes les assignations."
                          onConfirm={handleCancelDraw}
                          cancelLabel="Annuler"
                          onClose={() => setConfirmCancelOpen(false)}
                        />
                      )}
                    </>
                  )}
                </>
              ) : (
                <Roulette
                  participants={exchange.participants ?? []}
                  profiles={profiles}
                  target={targetName}
                  currentUserId={currentUser?.id ?? ""}
                />
              )}
            </>
          )}
        </>
      )}
    </DataState>
  );
};

export default MyExchange;

const Roulette = ({
  participants,
  profiles,
  target,
  currentUserId,
}: {
  participants: { userId: string }[];
  profiles: Record<string, string>;
  target: string;
  currentUserId: string;
}) => {
  const [currentName, setCurrentName] = useState("");
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const names = participants
    .filter((p) => p.userId !== currentUserId)
    .map((p) => profiles[p.userId])
    .filter((n): n is string => !!n);

  useEffect(() => {
    if (finished || names.length === 0) return;

    let i = 0;

    intervalRef.current = window.setInterval(() => {
      setCurrentName(names[i % names.length]);
      i++;
    }, 100);

    const stop = window.setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentName(target || "?");
      setFinished(true);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(stop);
    };
  }, [names.length, target, finished]);

  return (
    <div className="assignment-result">
      {finished ? (
        <strong>🎁 {currentName}</strong>
      ) : (
        <span style={{ fontStyle: "italic" }}>{currentName || "🎁 ..."}</span>
      )}
    </div>
  );
};
