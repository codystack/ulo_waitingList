// src/components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "lg" | "xl"; // new prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "sm",
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-lg", // for forms
    lg: "max-w-4xl", // for mid-size content
    xl: "max-w-6xl", // for large video
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div
        className={`bg-white rounded-2xl shadow-lg w-full ${sizeClasses[size]} p-6 relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 z-999 right-4 bg-[#8B5E3C]/80 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#8B5E3C]/60 transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
