import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { AdminLayout } from "../adminLayout";
import { Role } from "@prisma/client";
import { UserGrid } from "@/components/Admin/UserGrid";
import { getUsers } from "@/actions/admin/getUser";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.adminUserMgmt.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect(`/${lang}/forbidden`);
	}
	if (!(currentUser.role === Role.Admin)) {
		// only visible for admins
		redirect(`/${lang}/forbidden`);
	}

	const dict = await getDictionary(lang);
	const users = await getUsers(Role.Student);

	return (
		<>
			<AdminLayout lang={lang}>
				<UserGrid
					lang={lang}
					currentUser={currentUser}
					users={users}
					adminUserMgmtDict={dict.adminUserMgmt}
				/>
			</AdminLayout>
		</>
	);
};

export default page;
