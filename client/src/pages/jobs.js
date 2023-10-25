import React, { useState, useEffect } from "react";
import SearchByDropDown from "@/components/SearchByDropDown";
import SearchBox from "@/components/SearchBox";
import JobPreviewList from "@/components/JobPreviewList";
import JobDetail from "@/components/JobDetail";
import styles from "@/styles/JobPage.module.css";
import getJobs from "@/services/getJobs";

function JobPage() {
	const [jobs, setJobs] = useState([]);
	const [searchBy, setSearchBy] = useState("company");
	const [searchText, setSearchText] = useState("");

	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			const response = await fetch(
	// 				"https://your-backend-api.com/data-endpoint"
	// 			);
	// 			if (!response.ok) {
	// 				throw new Error("Network response was not ok");
	// 			}
	// 			const data = await response.json();
	// 			setData(data);
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	}

	// 	fetchData();
	// }, []);

	const handleSearchSubmit = async () => {
		const res = await getJobs(searchBy, searchText);
		console.log(res);
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
				<JobPreviewList />
				<JobDetail />
			</div>
		</div>
	);
}

export default JobPage;
