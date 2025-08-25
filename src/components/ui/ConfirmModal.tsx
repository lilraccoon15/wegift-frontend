interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmModal = ({
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir effectuer cette action ?",
  confirmLabel = "Oui",
  cancelLabel,
}: ConfirmModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-title">
          <h2>{title}</h2>
          <button onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
          <div className="action-buttons">
            {cancelLabel && (
              <button className="btn-action btn-secondary" onClick={onClose}>
                {cancelLabel}
              </button>
            )}
            <button onClick={onConfirm} className="btn-action btn-delete">
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
