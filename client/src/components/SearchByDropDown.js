import React from "react";

function SearchByDropDown({ searchBy, setSearchBy }) {
	return (
		<div className="search-by-dropdown">
			<label htmlFor="searchBy">Search By:</label>
			<select
				value={searchBy}
				onChange={(e) => {
					setSearchBy(e.target.value);
				}}
			>
				<option value="company">Company</option>
				<option value="industry">Industry</option>
				<option value="skills">Skills Required</option>
			</select>
		</div>
	);
}

export default SearchByDropDown;
