import React, { useState, useEffect } from "react";
import SearchByDropDown from "@/components/SearchByDropDown";
import SearchBox from "@/components/SearchBox";
import JobPreviewList from "@/components/JobPreviewList";
import JobDetail from "@/components/JobDetail";
import styles from "@/styles/JobPage.module.css";
import getJobs from "@/services/getJobs";

function JobPage() {
	const [jobs, setJobs] = useState([]);
	const [mainJob, setMainJob] = useState({});
	const [searchBy, setSearchBy] = useState("industry");
	const [searchText, setSearchText] = useState("Computer Software");

	useEffect(() => {
		const fetchData = async () => {
			const res = await getJobs(searchBy, searchText);
			setJobs(res.data);
			setMainJob(res.data[0]);
		};

		fetchData();
	}, []);

	const handleSearchSubmit = async () => {
		const res = await getJobs(searchBy, searchText);
		setJobs(res.data);
		setMainJob(res.data[0]);
	};

	const handleMainJobChange = (jobIndex) => {
		setMainJob(jobs[jobIndex]);
	};

	return (
		<div>
			<div className={styles.searchWrapper}>
				<SearchByDropDown searchBy={searchBy} setSearchBy={setSearchBy} />
				<SearchBox
					searchText={searchText}
					setSearchText={setSearchText}
					handleSearchSubmit={handleSearchSubmit}
				/>
			</div>
			<div className={styles.mainContent}>
				<JobPreviewList jobs={jobs} handleMainJobChange={handleMainJobChange} />
				<JobDetail job={mainJob} />
			</div>
		</div>
	);
}

export default JobPage;
