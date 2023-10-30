import TableWrapper from "@/components/TableWrapper";
import styles from "@/styles/Queries.module.css";

function Queries() {
	return (
		<div className={styles.tablesWrapper}>
			<TableWrapper
				endPoint="top_company_industries"
				title="Top 5 Sectors by number of job posts"
				columnNames={["Industry", "Number of job posts", "Average Salary"]}
				dataIndices={["industry", "job_post_count", "average_salary"]}
			/>
			<TableWrapper
				endPoint="top_skills"
				title="Top demanding skills"
				columnNames={["Skill", "Number of job posts required this skill"]}
				dataIndices={["skill", "count"]}
			/>
			<TableWrapper
				endPoint="top_startups"
				title="Top startups by job posts"
				columnNames={["Company name", "Established year", "Vacancies"]}
				dataIndices={["company_name", "established_year", "vacancies"]}
			/>
			<TableWrapper
				endPoint="top_paying_companies"
				title="Top paying companies"
				columnNames={["Company name", "Average Salary"]}
				dataIndices={["company_name", "average_salary"]}
			/>
			<TableWrapper
				endPoint="top_categories"
				title="Top 5 categories (other than IT/Software Development) based on the volume of postings"
				columnNames={["Category", "Number of job posts"]}
				dataIndices={["category", "postings_count"]}
			/>
		</div>
	);
}

export default Queries;
