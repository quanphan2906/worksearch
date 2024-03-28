import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";

import Sidebar from "@/components/navbar/SideBar";
import SideBarWrapper from "@/components/SideBarWrapper";

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
			<body className={`min-h-screen flex m-0 w-full ${inter.className}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<UserProvider>
						<SideBarWrapper>
							<Sidebar />
						</SideBarWrapper>
						<main className="w-full mx-16 flex justify-center">
							{children}
						</main>
					</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
