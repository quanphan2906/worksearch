import React from "react";
import { JobPosting } from "@/models/models";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ApplicationDialog from "../application/ApplicationDialog";

interface JobPreviewProps {
	job: JobPosting;
}

const JobPreview = ({ job }: JobPreviewProps) => {
	// const temp = job.location.split("-");
	return (
		<TableRow>
			<TableCell className="font-medium text-xs"> {job.title} </TableCell>
			<TableCell className="text-xs"> {job.company_name} </TableCell>
			<TableCell className="text-xs"> {job.location} </TableCell>
			<TableCell className="flex space-x-4">
				<ApplicationDialog
					companyName={job.company_name}
					job_id={job.job_id}
				/>
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
