import { Nunito_Sans } from "next/font/google";
import "@/app/styles/bootstrap.min.css";
import "@/app/styles/animate.min.css";
import "@/app/styles/boxicons.min.css";
import "@/app/styles/flaticon.css";
import "next-cloudinary/dist/cld-video-player.css";
import "@/app/styles/dashboard.css";
import "@/app/styles/nprogress.css";
import "swiper/css";
import "swiper/css/bundle";
import "@/app/styles/style.css";
import "@/app/styles/responsive.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TosterProvider from "@/providers/TosterProvider";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import LanguageSwitcher from "@/components/Layout/LanguageSwitcher";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { baseUrl } from "@/libs/constants";

const nunito = Nunito_Sans({
	subsets: ["latin"],
	display: "swap",
	adjustFontFallback: false,
});

// TODO: Update metadata - as defined in the dictionaries/en.js file
export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const metadata = dict.metadata;

	return {
		metadataBase: new URL(`${baseUrl}`),
		alternates: {
			canonical: "/",
		},
		title: {
			template: metadata.titleTemplate,
			default: metadata.titleDefault,
		},
		keywords: metadata.keywords,
		description: metadata.description,
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				noimageindex: true,
			},
		},
		openGraph: {
			title: metadata.titleDefault,
			url: `${baseUrl}`,
			images: [
				// TODO: Update the image URL to a valid one
				"https://res.cloudinary.com/dev-empty/image/upload/v1707717581/znronmo1rj2gexfrmnmy.jpg",
			],
			locale: lang === "en" ? "en_US" : "nl_NL",
			type: "website",
		},
	};
}

export default async function RootLayout({ children, params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const metadata = dict.metadata;
	const currentUser = await getCurrentUser();

	return (
		<html lang={lang} suppressHydrationWarning={true}>
			<head>
				<meta name="description" content={metadata.description} />
				<meta name="keywords" content={metadata.keywords.join(", ")} />
				<meta name="author" content={metadata.author} />
				<meta name="title" content={metadata.titleDefault} />
				<link rel="icon" href="/images/favicon.ico" type="image/x-icon" sizes="64x64" />
				<script src="https://8x8.vc/external_api.js" async></script>
			</head>
			<body className={nunito.className} suppressHydrationWarning={true}>
				<TosterProvider />
				<Navbar currentUser={currentUser} lang={lang} dict={dict.navbar} />
				<LanguageSwitcher lang={lang} />
				{children}
				<Footer lang={lang} dict={dict.footer} />
			</body>
		</html>
	);
}
