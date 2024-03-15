import Link from "next/link";
import styles from "@/styles/Navbar.module.css";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
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
				<li className={styles.li}>
					<Link className={styles.a} href="/application">
						My applications
					</Link>
				</li>
				<UserAvatar />
			</ul>
		</nav>
	);
};

export default Navbar;
