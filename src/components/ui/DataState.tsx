import React from "react";

interface DataStateProps {
  loading?: boolean;
  error?: Error | null;
  children: React.ReactNode;
}

const DataState = ({ loading, error, children }: DataStateProps) => {
  const handleReload = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="datastate-overlay">
        <div className="spinner" />
      </div>
    );
  }

  // todo améliorer ça wesh
  if (error) {
    return (
      <div className="datastate-overlay">
        <div className="error-message">
          <h2>Une erreur est survenue</h2>
          <p>{error.message}</p>
          <button onClick={handleReload} className="reload-button">
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataState;
