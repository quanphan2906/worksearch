import React, { useEffect, useState } from "react";
import Table from "rc-table";
import { getTop } from "@/services/randomQueries";
import styles from "@/styles/TableWrapper.module.css";

function TableWrapper({ title, columnNames, dataIndices, endPoint }) {
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
		<Table
			columns={columns}
			data={tableData}
			className={styles.table}
			title={() => {
				return title;
			}}
		/>
	);
}

export default TableWrapper;
