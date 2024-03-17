import { JobPosting } from "@/models/models";
import { getJob } from "@/services/jobs";
import { notFound } from "next/navigation";
import {
	TypographyH1,
	TypographyH2,
	TypographyP,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// We can enable static rendering on dynamic routes
// by giving Next all the possible query params
// so that it can render all of the pages at build time
// instead of on-the-fly (i.e dynamic rendering)
export const generateStaticParams = async (): Promise<{ id: string }[]> => {
	// Get the list of all job posting ids at build time
	const res = await fetch("http://localhost:4000/job_postings/");
	const JobPostings: JobPosting[] = await res.json();
	return JobPostings.map((post: JobPosting) => ({
		id: post.job_id,
	}));
};

// Notes:
// 1. The above is only meaningful if we enable data caching in Next
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
// 2. The above won't work on dev server. Only in production.

// What if the user access a dynamic route that is not pre-rendered?
// two strategy:
// 1 throw a 404 page (when, dynamicParams set to false)
// 2 try to fetch the data (when dynamicParams set to true -- default)
export const dynamicParams = true;

const getJobPosting = async (job_id: string): Promise<JobPosting> => {
	const res = await getJob(job_id);

	if (!res.ok || res.data === undefined) {
		// this can only happen when we set the dynamicParams (above) to true
		// i.e, we accept query params that are not pre-rendered
		notFound(); // render our custom 404 page
	}

	return res.data;
};

interface JobDetailsProps {
	params: { id: string }; // this params props is only available when the generateStaticParams function exists
}

const JobDetails = async ({ params }: JobDetailsProps) => {
	const jobPost = await getJobPosting(params.id);

	return (
		<div className="w-4/5 pt-16 pb-16">
			<TypographyH1>{jobPost.title}</TypographyH1>
			<div className="mt-12">
				<TypographyP>
					<strong>Company</strong>: {jobPost.company_name}
				</TypographyP>
				<TypographyP>
					<strong>Location</strong>: {jobPost.location}
				</TypographyP>
				<TypographyP>
					<strong>Categories</strong>:{" "}
					{jobPost.categories?.map((category: string) => (
						<Badge className="ml-1" key={category}>
							{category}
						</Badge>
					))}
				</TypographyP>
				<TypographyP>
					<strong>Skills</strong>:
					{jobPost.skills?.map((skill: string) => (
						<Badge className="ml-1" key={skill}>
							{skill}
						</Badge>
					))}
				</TypographyP>
			</div>

			<div className="mt-8">
				<Button>Apply</Button>
			</div>

			<div>
				<TypographyH2>Description</TypographyH2>
				<TypographyP>{jobPost.description}</TypographyP>
			</div>

			<div>
				<TypographyH2>Requirements</TypographyH2>
				<TypographyP>{jobPost.requirements}</TypographyP>
			</div>
		</div>
	);
};

export default JobDetails;
