import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import SignupForm from "@/components/auth/SignupForm";
import { TypographyP } from "@/components/ui/typography";
import Link from "next/link";

const Signup = () => {
	return (
		<div className="flex justify-center">
			<div className="flex py-16">
				<Card className="w-[400px]">
					<CardHeader>
						<CardTitle>Register</CardTitle>
					</CardHeader>
					<CardContent>
						<SignupForm></SignupForm>
					</CardContent>
					<CardFooter className="flex justify-between">
						<TypographyP>
							Already have an account?
							<Link
								href={"/login"}
								className="text-neutral-700 hover:text-neutral-900 underline"
							>
								{" "}
								Login here{" "}
							</Link>
						</TypographyP>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Signup;
