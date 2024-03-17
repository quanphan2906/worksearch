import React from "react";
import { JobPosting } from "@/models/models";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
			<TableCell>
				<Button asChild className="px-2">
					<Link href={`/jobs/${job.job_id}`} className="text-xs">
						Learn more
					</Link>
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default JobPreview;
