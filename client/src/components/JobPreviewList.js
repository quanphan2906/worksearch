import React from "react";
import JobPreview from "./JobPreview";

function JobPreviewList() {
	const jobPreviews = [
		{
			id: 1,
			title: "Job Title 1",
			company: "Company A",
			location: "City X",
		},
		{
			id: 2,
			title: "Job Title 2",
			company: "Company B",
			location: "City Y",
		},
	];

	return (
		<div>
			{jobPreviews.map((job) => (
				<JobPreview key={job.id} job={job} />
			))}
		</div>
	);
}

export default JobPreviewList;
