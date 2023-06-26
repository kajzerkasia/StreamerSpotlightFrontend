import React from "react";
import Modal from "react-modal";
import {TbAlertTriangle} from "react-icons/tb";
import {IconContext} from "react-icons";
import './ErrorModal.css'
import {Button} from "../Button/Button";

Modal.setAppElement('#root');

export type ErrorModalProps = {
    isOpen: boolean;
    onRequestClose: () => void | Promise<void>;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void | Promise<void>;
    text: string;
};

export const ErrorModal = ({isOpen, onRequestClose, onConfirm, onCancel, text}: ErrorModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="error_modal"
            contentLabel="Error Modal"
            closeTimeoutMS={1200}
            style={{overlay: {background: '#292a2bbf'}}}
        >
            <h2>{text}</h2>
            <IconContext.Provider value={{className: 'icon-modal'}}>
                <TbAlertTriangle/>
            </IconContext.Provider>
            <div className="modal_button">
                <Button onClick={onConfirm}>OK</Button>
            </div>
        </Modal>
    );
};