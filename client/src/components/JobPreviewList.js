import React from "react";
import JobPreview from "./JobPreview";

function JobPreviewList({ jobs, handleMainJobChange }) {
	return (
		<div>
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
