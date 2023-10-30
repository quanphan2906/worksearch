import React, { useContext, useState } from "react";
import Button from "./Button";
import styles from "@/styles/Auth.module.css";
import { UserContext } from "@/context/UserContext";

function Auth({ closeModal }) {
	const { login, signup } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = async () => {
		const res = await signup({ email, password });
		alert(res);
		closeModal();
	};

	const handleLogin = async () => {
		const res = await login({ email, password });
		alert(res);
		closeModal();
	};

	return (
		<div className={styles.authForm}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<Button className={styles.btn} onClick={handleLogin} text="Login" />
			<Button className={styles.btn} onClick={handleSignUp} text="Sign up" />
		</div>
	);
}

export default Auth;
