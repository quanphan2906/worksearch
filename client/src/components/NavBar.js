import React, { useContext } from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import Button from "./Button";
import { UserContext } from "@/context/UserContext";

function Navbar({ openModal }) {
	const { user, logout } = useContext(UserContext);
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
				{user ? (
					<Button text="Logout" className={styles.btn} onClick={logout} />
				) : (
					<Button text="Login" className={styles.btn} onClick={openModal} />
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
