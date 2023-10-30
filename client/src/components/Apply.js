import { UserContext } from "@/context/UserContext";
import { apply } from "@/services/application";
import React, { useContext, useState } from "react";

function Apply({ jobId, closeModal }) {
	const { user } = useContext(UserContext);
	const [coverLetter, setCoverLetter] = useState("");

	const handleApplication = async () => {
		const res = await apply(user.email, jobId, coverLetter);
		alert("Apply succeed!");
		closeModal();
	};

	return (
		<div>
			<label htmlFor="coverLetter">Cover Letter:</label>
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
