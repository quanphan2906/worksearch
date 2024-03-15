"use client";

import React, { useState } from "react";
import styles from "@/styles/SearchBox.module.css";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

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
		<form onSubmit={handleSearchSubmit}>
			<Input
				type="text"
				value={currentQuery || ""}
				placeholder="Search..."
				onChange={(e) => {
					setCurrentQuery(e.target.value);
				}}
			/>
		</form>
	);
};

export default SearchBox;
