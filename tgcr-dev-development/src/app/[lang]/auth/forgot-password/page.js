import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import { getDictionary } from "@/app/[lang]/dictionaries";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.forgotPassword.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<>
			<div className="profile-authentication-area ptb-15">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12">
							<ForgotPasswordForm lang={lang} {...dict} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
