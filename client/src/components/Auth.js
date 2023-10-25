import React, { useState } from "react";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = () => {
		// In a real application, you would send a request to authenticate the user.
		// For simplicity, we'll just simulate a successful login.
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setEmail("");
		setPassword("");
		setIsLoggedIn(false);
	};

	return (
		<div>
			{isLoggedIn ? (
				<div>
					<p>Welcome, {email}!</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
					/>
					<button onClick={handleLogin}>Login</button>
				</div>
			)}
		</div>
	);
}

export default Auth;
