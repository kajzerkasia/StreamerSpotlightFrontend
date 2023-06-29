import React from "react";
import Modal from "react-modal";
import './CustomModal.css'
import {Button} from "../Button/Button";

Modal.setAppElement('#root');

export type CustomModalProps = {
    isOpen: boolean;
    onRequestClose?: () => void | Promise<void>;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    text?: string;
    confirmationText?: string;
    content?: React.ReactNode;
};

export const CustomModal = ({isOpen, onRequestClose, onConfirm, onCancel, text, content, confirmationText}: CustomModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="custom_modal"
            contentLabel="Custom Modal"
            closeTimeoutMS={1200}
            style={{overlay: {background: '#292a2bbf'}}}
        >
            <h2>{text}</h2>
            <div className="modal_content">
                {content}
            </div>
            <div className="modal_button">
                <Button onClick={onConfirm}>{confirmationText}</Button>
            </div>
        </Modal>
    );
};