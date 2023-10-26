import TableWrapper from "@/components/TableWrapper";
import styles from "@/styles/Queries.module.css";

function Queries() {
	return (
		<div className={styles.tablesWrapper}>
			<TableWrapper
				endPoint="top_company_industries"
				title="Top 5 Sectors by number of job posts"
			/>
			<TableWrapper endPoint="top_skills" title="Top demanding skills" />
			<TableWrapper endPoint="top_startups" title="Top startups by job posts" />
			<TableWrapper
				endPoint="top_paying_companies"
				title="Top paying companies"
			/>
			<TableWrapper
				endPoint="top_categories"
				title="Top 5 categories (other than IT/Software Development) based on the volume of postings"
			/>
		</div>
	);
}

export default Queries;
