import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SideBar = () => {
	return (
		<aside className="h-full">
			<nav className="h-full flex flex-col border-r shadow-sm py-12">
				<div className="flex items-center py-2 px-6 font-medium hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors rounded">
					<Avatar>
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<p className="m-4 text-sm">Quan Phan</p>
				</div>
				<div className="flex items-center py-4 px-6 font-medium hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors rounded">
					<p className="text-sm">Job postings</p>
				</div>
				<div className="flex items-center py-4 px-6 font-medium hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors rounded">
					<p className="text-sm">My application</p>
				</div>
				<div className="flex items-center py-4 px-6 font-medium hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors rounded">
					<p className="text-sm">Top X</p>
				</div>
			</nav>
		</aside>
	);
};

export default SideBar;
