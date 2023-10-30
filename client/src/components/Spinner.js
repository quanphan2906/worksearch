import React from "react";
import styles from "@/styles/Spinner.module.css";

const Spinner = () => (
	<div className={styles.spinnerContainer}>
		<div className={styles.spinner}></div>
	</div>
);

export default Spinner;
