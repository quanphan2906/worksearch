import React from "react";
import styles from "@/styles/Application.module.css";

const Application = ({ application, index }) => {
	const temp = application.job_location.split("-");
	return (
		<div className={styles.applicationPreviewWrapeer} key={index}>
			<p className={styles.title}>{application.job_title}</p>
			<div>
				<span className={styles.companyName}>{application.company_name}</span> -
				{""}
				<span className={styles.location}>{temp[temp.length - 1]}</span>
			</div>
			<p className={styles.appDate}>
				Applied on {application.application_date}
			</p>
		</div>
	);
};

export default Application;
