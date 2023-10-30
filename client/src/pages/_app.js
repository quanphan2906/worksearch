import "@/styles/globals.css";
import Layout from "@/components/Layout";
import AppContextProvider from "@/context/AppContextProvider";

export default function App({ Component, pageProps }) {
	return (
		<AppContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppContextProvider>
	);
}
