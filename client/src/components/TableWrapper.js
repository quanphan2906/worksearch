import React, { useEffect, useState } from "react";
import Table from "rc-table";
import { getTop } from "@/services/randomQueries";

function TableWrapper({ endPoint }) {
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let res = await getTop(endPoint);
			setTableData(res.data);
		};
		fetchData();
	}, []);

	const columns =
		tableData.length == 0
			? []
			: Object.keys(tableData[0]).map((key) => {
					return {
						title: key,
						dataIndex: key,
					};
			  });

	return (
		<div>
			<Table columns={columns} data={tableData} />
		</div>
	);
}

export default TableWrapper;
