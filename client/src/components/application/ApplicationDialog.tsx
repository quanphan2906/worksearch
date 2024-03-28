"use client";

import React, { useContext, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Application } from "@/models/models";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { submitApplication } from "@/services/application";
import ErrorMessage from "../common/ErrorMessage";

interface ApplicationDialogProps {
	companyName: string;
	job_id: string;
}

const DEFAULT_COVER_LETTER_ROWS = 12;
const COVER_LETTER_PLACEHOLDER = (companyName: string) =>
	`Write a letter to ${companyName} to say what interests you about them and show them why you are a good fit.`;

function ApplicationDialog({ companyName, job_id }: ApplicationDialogProps) {
	const router = useRouter();
	const { user } = useContext(UserContext);
	const [open, setOpen] = useState(false);
	const [coverLetter, setCoverLetter] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState("");

	if (user === null) {
		router.replace("/");
		return null;
	}

	const onSubmitCoverLetter = async () => {
		const newApplication: Application = {
			user_email: user.email,
			job_id,
			application_date: Date(),
			cover_letter: coverLetter,
		};

		const res = await submitApplication(newApplication);
		if (!res.ok) {
			if (res.message) setErrorMsg(res.message);
			return;
		}

		// Maybe I have to manually add this to the user context
		// Otherwise I will have to tell the applications route to re-fetch
		// every time the user visits the route

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button onClick={() => setOpen(true)}> Apply </Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cover letter to {companyName}</DialogTitle>
				</DialogHeader>
				<ErrorMessage errorMsg={errorMsg} />
				<textarea
					value={coverLetter}
					onChange={(e) => setCoverLetter(e.target.value)}
					className="flex max-h-80 w-full rounded-lg border border-neutral-200 bg-white px-6 py-4 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
					rows={DEFAULT_COVER_LETTER_ROWS}
					placeholder={COVER_LETTER_PLACEHOLDER(companyName)}
				/>
				<DialogFooter className="sm:justify-end">
					<Button onClick={onSubmitCoverLetter}>Submit</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ApplicationDialog;
