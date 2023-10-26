import Auth from "@/components/Auth";
import { apply } from "@/services/application";
import React, { useState } from "react";

function Apply() {
	const [userEmail, setUserEmail] = useState("");
	const [jobId, setJobId] = useState("");
	const [coverLetter, setCoverLetter] = useState("");

	const handleApplication = async () => {
		const res = await apply(userEmail, jobId, coverLetter);
		alert("Apply succeed!");
	};

	return (
		<div>
			<Auth />
			<label>User email:</label>
			<input
				type="text"
				value={userEmail}
				onChange={(e) => setUserEmail(e.target.value)}
				required
			/>

			<label>Job ID:</label>
			<input
				type="text"
				value={jobId}
				onChange={(e) => setJobId(e.target.value)}
				required
			/>

			<label for="coverLetter">Cover Letter:</label>
			<textarea
				id="coverLetter"
				name="coverLetter"
				rows="4"
				value={coverLetter}
				onChange={(e) => setCoverLetter(e.target.value)}
			></textarea>

			<button type="submit" onClick={handleApplication}>
				Submit Application
			</button>
		</div>
	);
}

export default Apply;
