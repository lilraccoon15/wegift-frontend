import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
}

const Modal = ({ onClose, children, title, onBack }: ModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <div>
            {onBack && (
              <button onClick={onBack}>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            )}
            {title && <h2>{title}</h2>}
          </div>
          <button onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
