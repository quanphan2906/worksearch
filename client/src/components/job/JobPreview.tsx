import React from "react";
import { JobPosting } from "@/models/models";
import { TableCell, TableRow } from "@/components/ui/table";

interface JobPreviewProps {
	job: JobPosting;
}

const JobPreview = ({ job }: JobPreviewProps) => {
	// const temp = job.location.split("-");
	return (
		<TableRow>
			<TableCell className="font-medium"> {job.title} </TableCell>
			<TableCell> {job.company_name} </TableCell>
			<TableCell> {job.location} </TableCell>
		</TableRow>
	);
};

export default JobPreview;
