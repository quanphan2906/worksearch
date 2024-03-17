import React from "react";

interface TypographyProps {
	children: React.ReactNode;
	className?: string;
}

export function TypographyH1({ children }: TypographyProps) {
	return (
		<h1
			className={`scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl`}
		>
			{children}
		</h1>
	);
}

export function TypographyH2({ children }: TypographyProps) {
	return (
		<h2
			className={`scroll-m-20 pb-2 text-2xl font-semibold tracking-tight mt-8 mb-4`}
		>
			{children}
		</h2>
	);
}

export function TypographyP({ children, className }: TypographyProps) {
	return (
		<p
			className={`leading-7 [&:not(:first-child)]:mt-2 text-sm ${className}`}
		>
			{children}
		</p>
	);
}
