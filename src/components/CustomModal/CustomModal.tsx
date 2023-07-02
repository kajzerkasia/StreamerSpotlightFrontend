import React from "react";
import Modal from "react-modal";
import "./CustomModal.css";
import { Button } from "../Button/Button";

Modal.setAppElement("#root");

export type CustomModalProps = {
  isOpen: boolean;
  onRequestClose?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  text?: string;
  confirmationText?: string;
  content?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
};

export const CustomModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  text,
  content,
  confirmationText,
  error,
  className,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={className}
      contentLabel="Custom Modal"
      closeTimeoutMS={1200}
      style={{ overlay: { background: "#292a2bbf" } }}
    >
      <h2 className="h2_modal">{text}</h2>
      <div className="modal_content">{content}</div>
      {error && <div className="modal_error">{error}</div>}
      <div className="modal_button">
        <Button onClick={onConfirm}>{confirmationText}</Button>
      </div>
    </Modal>
  );
};
