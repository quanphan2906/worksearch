import React from "react";
import styles from "@/styles/SearchByDropDown.module.css";

function SearchByDropDown({ searchBy, setSearchBy }) {
	return (
		<div className="search-by-dropdown">
			<select
				value={searchBy}
				onChange={(e) => {
					setSearchBy(e.target.value);
				}}
				className={styles.select}
			>
				<option value="company">Search by Company</option>
				<option value="industry">Search by Industry</option>
				<option value="skills">Search by Skills Required</option>
			</select>
		</div>
	);
}

export default SearchByDropDown;
