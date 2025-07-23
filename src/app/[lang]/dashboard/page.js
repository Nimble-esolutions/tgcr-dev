import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Role } from "@prisma/client";

// this page is only used as a redirect for the dashboard
const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}

	switch (currentUser.role) {
		case Role.Instructor:
			redirect(`/${lang}/teacher/dashboard`);
		case Role.Student:
			redirect(`/${lang}/student/dashboard`);
		case Role.Admin:
			redirect(`/${lang}/admin/dashboard`);
		case Role.Manager:
			redirect(`/${lang}/manager/dashboard`);
		default:
			redirect(`/${lang}/forbidden`);
	}
};

export default page;
