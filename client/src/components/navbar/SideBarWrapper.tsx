"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface SideBarWrapperProps {
	children: React.ReactNode;
}

const SideBarWrapper = ({ children }: SideBarWrapperProps) => {
	const pathname = usePathname();
	const pathsDoNotRenderSidebar = ["/login", "/signup"];

	if (pathsDoNotRenderSidebar.includes(pathname)) {
		return null;
	}

	return <div className="w-1/3">{children}</div>;
};

export default SideBarWrapper;
