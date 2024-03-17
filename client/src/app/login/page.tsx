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
							Havent had an account? Sign up here.
						</TypographyP>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default Login;
