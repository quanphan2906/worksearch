import TableWrapper from "@/components/TableWrapper";

function Queries() {
	return (
		<div>
			<TableWrapper endPoint="top_company_industries" />
			<TableWrapper endPoint="top_skills" />
			<TableWrapper endPoint="top_startups" />
			<TableWrapper endPoint="top_paying_companies" />
			<TableWrapper endPoint="top_categories" />
		</div>
	);
}

export default Queries;
