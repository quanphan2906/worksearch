import React from "react";
import JobPreview from "./JobPreview";
import styles from "@/styles/JobPreviewList.module.css";

function JobPreviewList({ jobs, handleMainJobChange }) {
	return (
		<div className={styles.jobPreviewList}>
			{jobs.map((job, index) => (
				<JobPreview
					key={job.job_id}
					job={job}
					jobIndex={index}
					handleMainJobChange={handleMainJobChange}
				/>
			))}
		</div>
	);
}

export default JobPreviewList;
