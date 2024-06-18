import React from 'react';

const Modal = ({ show, children=null, onClose, header }) => {
  
    // if (!show) {
    //     return null;
    // }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">{header}</h5>
                    <button onClick={onClose} className="button-close">&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
