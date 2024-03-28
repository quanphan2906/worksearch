import React from "react";
import { TypographyP } from "../ui/typography";
import { MdErrorOutline } from "react-icons/md";

interface ErrorMessageProps {
	errorMsg: string;
}

const ErrorMessage = ({ errorMsg }: ErrorMessageProps) => {
	if (errorMsg === "") {
		return null;
	}

	return (
		<div className="flex text-red-500 dark:text-red-900 mb-4">
			<span className="flex items-center mr-2">
				<MdErrorOutline />
			</span>
			<span>
				<TypographyP> {errorMsg} </TypographyP>
			</span>
		</div>
	);
};

export default ErrorMessage;
