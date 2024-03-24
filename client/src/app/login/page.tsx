import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import { TypographyP } from "@/components/ui/typography";
import Link from "next/link";

const Login = () => {
	return (
		<div className="flex justify-center">
			<div className="flex py-16">
				<Card className="w-[400px]">
					<CardHeader>
						<CardTitle>Login</CardTitle>
					</CardHeader>
					<CardContent>
						<LoginForm></LoginForm>
					</CardContent>
					<CardFooter className="flex justify-between">
						<TypographyP>
							Don&#39;t have an account?{" "}
							<Link
								href={"/signup"}
								className="text-neutral-700 hover:text-neutral-900 underline"
							>
								{" "}
								Sign up
							</Link>
						</TypographyP>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Login;
