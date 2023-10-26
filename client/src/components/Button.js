import React from "react";
import styles from "@/styles/Button.module.css";

const Button = ({ text, onClick, className, disabled }) => {
	return (
		<button
			className={`${styles.btn} ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
