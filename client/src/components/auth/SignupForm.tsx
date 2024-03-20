"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { User } from "@/models/models";
import { signup } from "@/services/auth";
import { useRouter } from "next/navigation";

// Define form schema
const formSchema = z.object({
	email: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters.",
	}),
});

const SignupForm = () => {
	const router = useRouter();

	// Define form using the form schema
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// values will take on the schema defined above
		// This will be type-safe and validated ✅

		const newUser: User = {
			email: values.email,
			password: values.password,
		};

		const res = await signup(newUser);

		if (res.ok) {
			router.push("/");
		}

		if (!res.ok) {
			// TODO: error handling
			console.log(res);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormFieldWrapper
					form={form}
					name="email"
					label="Email"
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

export default SignupForm;
