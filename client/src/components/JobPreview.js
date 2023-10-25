import React from "react";

function JobPreview({ job, jobIndex, handleMainJobChange }) {
	return (
		<div className="job-preview">
			<div className="job-info">
				<h3>{job.title}</h3>
				<p>Company: {job.company_name}</p>
				<p>Location: {job.location}</p>
			</div>
			<div className="job-actions">
				<button
					onClick={() => {
						handleMainJobChange(jobIndex);
					}}
				>
					Details
				</button>
			</div>
		</div>
	);
}

export default JobPreview;
