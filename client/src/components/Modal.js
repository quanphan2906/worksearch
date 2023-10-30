import React, { useState } from "react";
import styles from "@/styles/Modal.module.css";

const Modal = ({ isOpen, closeModal, children }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.modal} onClick={closeModal}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
