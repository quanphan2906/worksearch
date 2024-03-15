"use client";

import React, { useState } from "react";
import styles from "@/styles/SearchBox.module.css";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchBox = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchQuery = useSearchParams();
	const query = searchQuery.get("q");
	const [currentQuery, setCurrentQuery] = useState<string | null>(query);

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push(`${pathname}?q=${currentQuery}`);
	};

	return (
		<form className={styles.searchBoxWrapper} onSubmit={handleSearchSubmit}>
			<input
				className={styles.searchBox}
				type="text"
				value={currentQuery || ""}
				placeholder="Search Job Title, Skill Sets, Companies, Industries"
				onChange={(e) => {
					setCurrentQuery(e.target.value);
				}}
			/>
		</form>
	);
};

export default SearchBox;
