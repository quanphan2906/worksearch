import React from "react";
import styles from "@/styles/Button.module.css";

interface ButtonProps {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement> | (() => void);
	className: string;
	disabled?: boolean;
}

const Button = ({ text, onClick, className, disabled = true }: ButtonProps) => {
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
