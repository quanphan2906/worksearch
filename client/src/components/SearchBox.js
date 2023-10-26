import React from "react";
import styles from "@/styles/SearchBox.module.css";
import Button from "./Button";

function SearchBox({ searchText, setSearchText, handleSearchSubmit }) {
	return (
		<div className={styles.searchBoxWrapper}>
			<input
				className={styles.searchBox}
				type="text"
				value={searchText}
				placeholder="Search Job Title, Skill Sets, Companies, Industries"
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			<Button
				text="Search"
				onClick={handleSearchSubmit}
				className={styles.btn}
			/>
		</div>
	);
}

export default SearchBox;
