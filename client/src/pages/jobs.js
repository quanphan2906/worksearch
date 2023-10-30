import React, { useState, useEffect } from "react";
import SearchByDropDown from "@/components/SearchByDropDown";
import SearchBox from "@/components/SearchBox";
import JobPreviewList from "@/components/JobPreviewList";
import JobDetail from "@/components/JobDetail";
import styles from "@/styles/JobPage.module.css";
import getJobs from "@/services/getJobs";
import Spinner from "@/components/Spinner";

function JobPage() {
	const [jobs, setJobs] = useState([]);
	const [mainJob, setMainJob] = useState({});
	const [searchBy, setSearchBy] = useState("skills");
	const [searchText, setSearchText] = useState("React");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getJobs(searchBy, searchText);
			setJobs(res.data);
			setMainJob(res.data[0]);
			setLoading(false);
		};

		fetchData();
	}, []);

	const handleSearchSubmit = async () => {
		setLoading(true);
		const res = await getJobs(searchBy, searchText);
		setJobs(res.data);
		setMainJob(res.data[0]);
		setLoading(false);
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
				{loading ? (
					<Spinner />
				) : (
					<>
						<JobPreviewList
							jobs={jobs}
							handleMainJobChange={handleMainJobChange}
						/>
						<JobDetail job={mainJob} />
					</>
				)}
			</div>
		</div>
	);
}

export default JobPage;
