import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyP } from "../ui/typography";

interface TabProps {
	children: React.ReactNode;
}

const Tab = ({ children }: TabProps) => {
	return (
		<div className="flex items-center py-4 px-6 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800/50 transition-colors rounded">
			<TypographyP className="text-sm">{children}</TypographyP>
		</div>
	);
};

const SideBar = () => {
	return (
		<aside className="h-full border-r border-notion-grey notion-sidebar-bg-color">
			<nav className="flex flex-col py-12">
				<div className="flex items-center py-2 px-6 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800/50 transition-colors rounded">
					<Avatar>
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<TypographyP className="m-4 text-sm">Quan Phan</TypographyP>
				</div>
				<Tab>Job postings</Tab>
				<Tab>My applications</Tab>
				<Tab>Top X</Tab>
			</nav>
		</aside>
	);
};

export default SideBar;
