import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import Button from "./Button";

function Navbar() {
	const router = useRouter();
	return (
		<nav className={styles.navbar}>
			<div className={styles.pageTitle}>
				<p>Egypt Geek Space</p>
			</div>
			<ul className={styles.ul}>
				<li className={styles.li}>
					<Link className={styles.a} href="/jobs">
						Openings
					</Link>
				</li>
				<li className={styles.li}>
					<Link className={styles.a} href="/queries">
						Top X
					</Link>
				</li>
				<Button
					text="Apply"
					className={styles.btn}
					onClick={() => {
						router.push("/apply");
					}}
				/>
			</ul>
		</nav>
	);
}

export default Navbar;
