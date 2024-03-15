import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";

import Sidebar from "@/components/navbar/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Leads",
	description: "Go-to for software engineering jobs in Egypt",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<UserProvider>
					<body className={`flex m-0 w-full ${inter.className}`}>
						<div className="w-1/4">
							<Sidebar />
						</div>
						<div className="flex-4 w-full flex flex-col items-center justify-center">
							{children}
						</div>
					</body>
				</UserProvider>
			</ThemeProvider>
		</html>
	);
}
