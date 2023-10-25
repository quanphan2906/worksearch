import Auth from "@/components/auth";
import React, { useState } from "react";

function Apply() {
	return (
		<div>
			<Auth />
			<label for="jobId">Job ID:</label>
			<input type="text" id="jobId" name="jobId" required />

			<label for="coverLetter">Cover Letter:</label>
			<textarea
				id="coverLetter"
				name="coverLetter"
				rows="4"
				required
			></textarea>

			<button type="submit">Submit Application</button>
		</div>
	);
}

export default Apply;
