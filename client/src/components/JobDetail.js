import React from "react";

function JobDetail({ job }) {
	return job ? (
		<div className="job-detail">
			<h2>{job.title}</h2>
			<p>{job.company_name}</p>
		</div>
	) : null;
}

export default JobDetail;
