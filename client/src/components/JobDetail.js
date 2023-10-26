import React from "react";
import styles from "@/styles/JobDetail.module.css";

function JobDetail({ job }) {
	if (Object.keys(job).length === 0) {
		return <div></div>;
	}

	const temp = job.location.split("-");
	return job ? (
		<div className={styles.jobDetailWrapper}>
			<h2>{job.title}</h2>
			<div>
				<span className={styles.companyName}>{job.company_name}</span> -{""}
				<span className={styles.location}>{temp[temp.length - 1]}</span>
			</div>
			<p>
				<span>{job.career_level}</span> {" | "}
				<span>{job.experience_needed}</span> {" | "}
				<span>{job.education_level}</span>
			</p>
			<h3>About the job</h3>
			<p>{job.description}</p>
			<h3>Pay rate</h3>
			<p>{job.salary}</p>
			<h3>Requirements</h3>
			<p>
				{job.skills.map((skill) => {
					return <span> {skill}, </span>;
				})}
			</p>
			<p>{job.requirements}</p>
		</div>
	) : null;
}

export default JobDetail;
