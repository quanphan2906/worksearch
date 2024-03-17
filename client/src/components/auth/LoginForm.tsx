"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";

// Define form schema
const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

const LoginForm = () => {
	// Define form using the form schema
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// values will take on the schema defined above
		// This will be type-safe and validated ✅
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormFieldWrapper
					form={form}
					name="username"
					label="Username"
					placeholder="hello@leads.io"
				/>
				<FormFieldWrapper
					form={form}
					name="password"
					label="Password"
					placeholder="not12345678"
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
