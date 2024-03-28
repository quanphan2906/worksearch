import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

interface TabProps {
	children: React.ReactNode;
	href: string;
}

const Tab = ({ children, href }: TabProps) => {
	return (
		<div className="flex items-center py-4 px-8 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800/50 transition-colors rounded hover:cursor-pointer">
			<Link href={href}>{children}</Link>
		</div>
	);
};

const SideBar = () => {
	return (
		<aside className="h-full border-r border-notion-grey notion-sidebar-bg-color">
			<nav className="flex flex-col py-12">
				<div className="flex items-center py-4 px-8 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800/50 transition-colors rounded hover:cursor-pointer">
					<UserAvatar />
				</div>
				<Tab href="/">Job postings</Tab>
				<Tab href="/applications">My applications</Tab>
				<Tab href="/topx">Top X</Tab>
			</nav>
		</aside>
	);
};

export default SideBar;
