"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { User } from "@/models/models";
import { signup } from "@/services/auth";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { TypographyP } from "../ui/typography";
import { UserContext } from "@/context/UserContext";

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
	const { setUser } = useContext(UserContext);
	const [errorMsg, setErrorMsg] = useState("");

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

		if (!res.ok) {
			if (res.message) setErrorMsg(res.message);
			return;
		}

		const user = res.data as unknown as User;
		setUser(user);
		router.push("/");
	};

	return (
		<Form {...form}>
			{errorMsg === "" ? null : (
				<div className="flex text-red-500 dark:text-red-900 mb-4">
					<span className="flex items-center mr-2">
						<MdErrorOutline />
					</span>
					<span>
						<TypographyP> {errorMsg} </TypographyP>
					</span>
				</div>
			)}

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
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default SignupForm;
