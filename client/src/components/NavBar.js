import React from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

function Navbar() {
	return (
		<nav className={styles.navbar}>
			<ul className={styles.ul}>
				<li className={styles.li}>
					<Link className={styles.a} href="/jobs">
						Jobs
					</Link>
				</li>
				<li className={styles.li}>
					<Link className={styles.a} href="/queries">
						Queries
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
