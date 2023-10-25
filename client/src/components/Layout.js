import React from "react";
import Navbar from "./NavBar";
import styles from "@/styles/Layout.module.css";

const Layout = ({ children }) => {
	return (
		<div className={styles.pageLayout}>
			<Navbar />
			<main>{children}</main>
		</div>
	);
};
export default Layout;
