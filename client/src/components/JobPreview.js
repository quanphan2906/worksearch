import React from "react";

function JobPreview({ job }) {
	return (
		<div className="job-preview">
			<div className="job-info">
				<h3>{job.title}</h3>
				<p>Company: {job.company}</p>
				<p>Location: {job.location}</p>
			</div>
			<div className="job-actions">
				<button>Details</button>
			</div>
		</div>
	);
}

export default JobPreview;
