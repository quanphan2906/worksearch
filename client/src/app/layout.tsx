import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/context/UserContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/navbar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Worksearch",
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
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<UserProvider>
					<body className={inter.className}>
						{/* <Navbar /> */}
						{children}
					</body>
				</UserProvider>
			</ThemeProvider>
		</html>
	);
}
