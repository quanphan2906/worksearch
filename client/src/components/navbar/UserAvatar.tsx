"use client";

import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
	const { user } = useContext(UserContext);

	if (user === null) {
		return null;
	}

	return (
		<>
			<Avatar className="h-8 w-8">
				<AvatarImage
					src={user.avatar || ""}
					alt={user?.email}
					className="object-cover object-center"
				/>
				<AvatarFallback>
					{user?.email.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="ml-4">{user?.email}</div>
		</>
	);
};

export default UserAvatar;
