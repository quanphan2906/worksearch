"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ApplicationDialogProps {
	companyName: string;
}

const DEFAULT_COVER_LETTER_ROWS = 12;
const COVER_LETTER_PLACEHOLDER = (companyName: string) =>
	`Write a letter to ${companyName} to say what interests you about them and show them why you are a good fit.`;

function ApplicationDialog({ companyName }: ApplicationDialogProps) {
	const [coverLetter, setCoverLetter] = useState<string>("");
	return (
		<Dialog>
			<DialogTrigger>
				<Button> Apply </Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cover letter to {companyName}</DialogTitle>
				</DialogHeader>
				<textarea
					value={coverLetter}
					onChange={(e) => setCoverLetter(e.target.value)}
					className="flex w-full rounded-lg border border-neutral-200 bg-white px-6 py-4 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
					rows={DEFAULT_COVER_LETTER_ROWS}
					placeholder={COVER_LETTER_PLACEHOLDER(companyName)}
				/>
				<DialogFooter className="sm:justify-end">
					<DialogClose asChild>
						<Button>Submit</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ApplicationDialog;
