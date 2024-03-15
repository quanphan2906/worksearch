"use client";

import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Button from "@/components/common/Button";
import styles from "@/styles/Navbar.module.css";

const UserAvatar = () => {
	const { user, logout } = useContext(UserContext);
	return (
		<>
			{user ? (
				<Button text="Logout" className={styles.btn} onClick={logout} />
			) : (
				<Button
					text="Login"
					className={styles.btn}
					onClick={() => {}}
				/>
			)}
		</>
	);
};

export default UserAvatar;
