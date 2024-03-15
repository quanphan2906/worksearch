"use client";

import React, { useState, useEffect, useRef } from "react";
import JobPreview from "./JobPreview";
import styles from "@/styles/JobPreviewList.module.css";
import { JobPosting } from "@/models/models";
import getJobs from "@/services/jobs";
import Spinner from "../common/Spinner";

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
		<div className={styles.jobPreviewList}>
			{jobs.map((job: JobPosting, index: number) => (
				<JobPreview key={index} job={job} jobIndex={index} />
			))}
			{hasMore ? (
				<div ref={loader}>
					<Spinner />
				</div>
			) : null}
		</div>
	);
};

export default JobPreviewList;
