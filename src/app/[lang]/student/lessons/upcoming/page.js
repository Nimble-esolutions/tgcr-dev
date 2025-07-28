import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getStudentLessonRequests } from "@/actions/student/getStudents.ts";
import { getDictionary } from "@/app/[lang]/dictionaries";
import LessonsLayout from "@/app/[lang]/student/lessons/lessonsLayout";
import LessonRequestForm from "@/components/Lesson/LessonRequestForm";
import { Role } from "@prisma/client";
import { LESSON_TYPE_QVALUE } from "@/libs/constants";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.myLessons.pageTitle,
  };
}

const page = async ({ params }) => {
  const { lang } = await params;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/${lang}/forbidden`);
  }
  if (!(currentUser.role === Role.Student)) {
    // only visible for students
    redirect(`/${lang}/forbidden`);
  }

  // fetch additional attributes which are required to be shown on the screen
  const studentLessonRequests = await getStudentLessonRequests(
    currentUser.id,
    LESSON_TYPE_QVALUE.Upcoming
  );
  const dict = await getDictionary(lang);

  return (
    <>
      <LessonsLayout lang={lang}>
        <div className="row">
          <div className="col-lg-12">
            <LessonRequestForm
              lang={lang}
              currentUser={currentUser}
              lessonRequests={studentLessonRequests}
              lessonType={LESSON_TYPE_QVALUE.Upcoming}
              myLessonsDict={dict.myLessons}
            />
          </div>
        </div>
        <Link
          href={`/${lang}/student/all-transactions`}
          className={`default-btn`}
        >
          {dict.myLessons.myTransactionsLinkText || "My Transactions"}
        </Link>
      </LessonsLayout>
    </>
  );
};

export default page;
