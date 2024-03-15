import React from "react";
// import SearchByDropDown from "@/components/SearchByDropDown";
import SearchBox from "@/components/job/SearchBox";
// import JobDetail from "@/components/JobDetail";
import styles from "@/styles/JobPage.module.css";
import JobPreviewList from "@/components/job/JobPreviewList";

interface PageInterface {
	searchParams: { [key: string]: string | string[] | undefined };
}

const Home = async ({ searchParams }: PageInterface) => {
	const query =
		searchParams !== undefined ? (searchParams["q"] as string) : "";

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full py-16">
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
