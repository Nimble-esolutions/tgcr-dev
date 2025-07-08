import RegisterForm from "@/components/Auth/RegisterForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.registerForm.pageTitleStudent,
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
							<RegisterForm
								lang={lang}
								registerAs={Role.Student}
								registerForm={dict.registerForm}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
