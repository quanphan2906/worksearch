import React from "react";

function SearchBox({ searchText, setSearchText, handleSearchSubmit }) {
	return (
		<div className="search-box">
			<input
				type="text"
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<button onClick={handleSearchSubmit}>Search</button>
		</div>
	);
}

export default SearchBox;
