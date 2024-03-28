"use client";

import React, { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormFieldWrapper from "@/components/common/FormFieldWrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/context/UserContext";
import { ImageType } from "@/models/models";
import { updateProfile } from "@/services/profile";
import { User } from "@/models/models";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { TypographyP } from "@/components/ui/typography";

const formSchema = z.object({
	email: z.string().email({ message: "Invalid email format." }),
	resume_link: z
		.string()
		.url({ message: "Resume link must be a valid URL." })
		.or(z.literal("")),
	social_link: z
		.string()
		.url({ message: "Social link must be a valid URL." })
		.or(z.literal("")),
	portfolio: z
		.string()
		.url({ message: "Portfolio link must be a valid URL." })
		.or(z.literal("")),
});

const Profile = () => {
	const { user, setUser } = useContext(UserContext);

	const [avatar, setAvatar] = useState<ImageType>({
		file: undefined,
		url: user?.avatar,
	});
	const [errorMsg, setErrorMsg] = useState("");

	// Define form using the form schema
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: user?.email,
			resume_link: user?.resume_link || "",
			social_link: user?.social_link || "",
			portfolio: user?.portfolio || "",
		},
	});

	// Redirect visitors if they have not logged in
	const router = useRouter();
	if (user === null) {
		router.replace("/");
		return null;
	}

	// From here, this route has non-null UserContext

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// values will take on the schema defined above
		// This will be type-safe and validated ✅

		// TODO: Upload the avatar somewhere and retrieve the link

		const oldUser = user;

		const newUser: User = {
			email: values.email || user.email,
			password: user.password,
			avatar: user?.avatar || "", // Store this link above here
			resume_link: values.resume_link || user.resume_link,
			social_link: values.social_link || user.social_link,
			portfolio: values.portfolio || user.portfolio,
		};

		// Optimistic UI
		setUser(newUser);

		const res = await updateProfile(newUser);
		if (!res.ok) {
			if (res.message) setErrorMsg(res.message);
			setUser(oldUser);
			return;
		}

		if (res.data) setUser(res.data);
	};

	const onUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setAvatar({ file, url: URL.createObjectURL(file) });
		}
	};

	return (
		<div className="w-4/5 pt-16 pb-16">
			<div className="mb-8 flex items-center space-x-8">
				<Avatar className="h-20 w-20">
					<AvatarImage
						src={avatar.url || ""}
						alt={user?.email}
						className="object-cover object-center"
					/>
					<AvatarFallback>
						{user?.email.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<label className={buttonVariants({ variant: "outline" })}>
					Upload Image
					<input
						type="file"
						onChange={onUploadAvatar}
						style={{ display: "none" }}
						accept="image/*"
					/>
				</label>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormFieldWrapper
						form={form}
						name="email"
						label="Email"
						placeholder="hello@leads.io"
					/>
					<FormFieldWrapper
						form={form}
						name="resume_link"
						label="Resume link"
						placeholder="Link to your resume"
					/>
					<FormFieldWrapper
						form={form}
						name="social_link"
						label="Social link"
						placeholder="Link to your LinkedIn, Twitter, etc."
					/>
					<FormFieldWrapper
						form={form}
						name="portfolio"
						label="Portfolio"
						placeholder="Link to your portfolio (if any)"
					/>
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

					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>

			<div className="mt-8 space-y-8"></div>
		</div>
	);
};

export default Profile;
