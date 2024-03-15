import React from "react";
import styles from "@/styles/JobPreview.module.css";
import { JobPosting } from "@/models/models";

interface JobPreviewProps {
	job: JobPosting;
	jobIndex: number;
}

const JobPreview = ({ job, jobIndex }: JobPreviewProps) => {
	const temp = job.location.split("-");
	return (
		<div className={styles.jobPreviewWrapeer}>
			<p className={styles.title}>{job.title}</p>
			<div>
				<span className={styles.companyName}>{job.company_name}</span> -
				{""}
				<span className={styles.location}>{temp[temp.length - 1]}</span>
			</div>
		</div>
	);
};

export default JobPreview;
