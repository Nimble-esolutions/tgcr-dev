import LoginForm from "@/components/Auth/LoginForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.loginForm.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();
	const dict = await getDictionary(lang);

	if (currentUser) {
		redirect(`/${lang}/`);
	}
	return (
		<>
			<div className="profile-authentication-area ptb-15">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12">
							<LoginForm lang={lang} loginDict={dict.loginForm} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
