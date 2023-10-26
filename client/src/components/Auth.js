import { signup } from "@/services/auth";
import React, { useState } from "react";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignUp = async () => {
		const res = await signup({ email, password });
		alert(res.message);
	};

	return (
		<div>
			<div>
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
				<button onClick={handleSignUp}>Sign up</button>
			</div>
		</div>
	);
}

export default Auth;
