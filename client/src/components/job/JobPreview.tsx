import React from "react";
import styles from "@/styles/JobPreview.module.css";
import { JobPosting } from "@/models/models";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface JobPreviewProps {
	job: JobPosting;
	jobIndex: number;
}

const JobPreview = ({ job, jobIndex }: JobPreviewProps) => {
	// const temp = job.location.split("-");
	return (
		<Card>
			<CardHeader>
				<CardTitle>{job.title}</CardTitle>
				<CardDescription>
					{job.company_name} - {job.location}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default JobPreview;
