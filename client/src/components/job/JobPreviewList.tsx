"use client";

import React, { useState, useEffect, useRef } from "react";
import JobPreview from "./JobPreview";
import styles from "@/styles/JobPreviewList.module.css";
import { JobPosting } from "@/models/models";
import getJobs from "@/services/jobs";
import Spinner from "../common/Spinner";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface JobPreviewList {
	query: string;
}

const JobPreviewList = ({ query }: JobPreviewList) => {
	const [jobs, setJobs] = useState<JobPosting[]>([]);
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState(true); // State to track if more items are available
	const loader = useRef(null);

	// set up intersection observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entities: IntersectionObserverEntry[]) => {
				const target = entities[0];
				if (target.isIntersecting) {
					setPage((prevPage) => prevPage + 1);
				}
			},
			{
				threshold: 0.5,
			}
		);
		if (loader.current) {
			observer.observe(loader.current);
		}

		return () => observer.disconnect();
	}, []);

	// fetch new jobs whenever the query or the page changes
	useEffect(() => {
		const fetchJobs = async () => {
			const res = await getJobs("company", query, page);

			if (res.ok && res.data) {
				const { next, jobPostings } = res.data;

				if (!next) setHasMore(false);
				setJobs((prevJobs) => [...prevJobs, ...jobPostings]);
			}

			if (!res.ok) {
				const message = res.message || "Error";
				console.log(message);
			}
		};

		if (hasMore) fetchJobs();
	}, [query, page, hasMore]);

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Position</TableHead>
						<TableHead>Company</TableHead>
						<TableHead>Location</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{jobs.map((job: JobPosting, index: number) => (
						<JobPreview job={job} key={index} />
					))}
				</TableBody>
			</Table>

			{hasMore ? (
				<div ref={loader}>
					<Spinner />
				</div>
			) : null}
		</div>
	);
};

export default JobPreviewList;
