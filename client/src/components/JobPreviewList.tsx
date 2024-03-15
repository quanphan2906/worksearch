import React from "react";
import JobPreview from "./JobPreview";
import styles from "@/styles/JobPreviewList.module.css";
import { JobPosting } from "@/models/models";
import getJobs from "@/services/jobs";

interface JobPreviewList {
	query: string;
}

const JobPreviewList = async ({ query }: JobPreviewList) => {
	const res = await getJobs("company", query);
	const jobs = res.data || [];

	return (
		<div className={styles.jobPreviewList}>
			{jobs.map((job: JobPosting, index: number) => (
				<JobPreview key={job.job_id} job={job} jobIndex={index} />
			))}
		</div>
	);
};

export default JobPreviewList;
