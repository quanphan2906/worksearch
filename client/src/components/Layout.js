import React, { useState } from "react";
import Navbar from "./NavBar";
import styles from "@/styles/Layout.module.css";
import Modal from "./Modal";
import Auth from "./Auth";

const Layout = ({ children }) => {
	const [isAuthModalOpen, setAuthModal] = useState(false);

	return (
		<>
			<Modal
				isOpen={isAuthModalOpen}
				closeModal={() => {
					setAuthModal(false);
				}}
			>
				<Auth
					closeModal={() => {
						setAuthModal(false);
					}}
				/>
			</Modal>
			<div className={styles.pageLayout}>
				<Navbar
					openModal={() => {
						setAuthModal(true);
					}}
				/>
				<main>{children}</main>
			</div>
		</>
	);
};
export default Layout;
