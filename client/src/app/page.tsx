import React, { useState, useEffect } from "react";
// import SearchByDropDown from "@/components/SearchByDropDown";
import SearchBox from "@/components/SearchBox";
// import JobPreviewList from "@/components/JobPreviewList";
// import JobDetail from "@/components/JobDetail";
import styles from "@/styles/JobPage.module.css";
import JobPreviewList from "@/components/JobPreviewList";
// import getJobs from "@/services/getJobs";
// import Spinner from "@/components/Spinner";

interface PageInterface {
	searchParams: { [key: string]: string | string[] | undefined };
}

const Home = ({ searchParams }: PageInterface) => {
	const query =
		searchParams !== undefined ? (searchParams["q"] as string) : "";

	return (
		<div>
			<div className={styles.searchWrapper}>
				{/* <SearchByDropDown
					searchBy={searchBy}
					setSearchBy={setSearchBy}
				/> */}
				<SearchBox />
			</div>
			<div className={styles.mainContent}>
				<JobPreviewList query={query} />
				{/* <JobDetail job={mainJob} /> */}
			</div>
		</div>
	);
};

export default Home;
