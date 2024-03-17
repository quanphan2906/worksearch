import React from "react";
// import SearchByDropDown from "@/components/SearchByDropDown";
import SearchBox from "@/components/job/SearchBox";
import JobPreviewList from "@/components/job/JobPreviewList";
import { getJobs } from "@/services/jobs";
import Error from "@/components/common/Error";

interface PageInterface {
	searchParams: { [key: string]: string | string[] | undefined };
}

const Home = async ({ searchParams }: PageInterface) => {
	const query =
		searchParams !== undefined ? (searchParams["q"] as string) : "";

	const res = await getJobs("company", query, 1);
	if (!res.ok || res.data === undefined) {
		return <Error />;
	}
	const jobPostings = res.data.jobPostings;

	return (
		<div className="flex flex-col items-center">
			<div className="w-full py-16">
				{/* <SearchByDropDown
					searchBy={searchBy}
					setSearchBy={setSearchBy}
				/> */}

				<SearchBox />
			</div>
			<div className="w-full">
				<JobPreviewList query={query} initialJobs={jobPostings} />
			</div>
		</div>
	);
};

export default Home;
