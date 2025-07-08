import { getPartners } from "@/actions/admin/getPartners";
import { getTestimonials } from "@/actions/admin/getTestimonials";
import { getBannerCourses, getHomepageCourses } from "@/actions/getCourses";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Banner from "@/components/tGCRHome/Banner";
import ASpot from "@/components/tGCRHome/ASpot";
import GetStarted from "@/components/tGCRHome/GetStarted";
import StepsToLearn from "@/components/tGCRHome/StepsToLearn";
import AboutUs from "@/components/tGCRHome/AboutUs";
import PopularCourses from "@/components/tGCRHome/PopularCourses";
import FeedbackSliderWithFunFacts from "@/components/tGCRHome/FeedbackSliderWithFunFacts";
import GetInstantCourses from "@/components/tGCRHome/GetInstantCourses";
import Partner from "@/components/tGCRHome/Partner";
import AffordableCertification from "@/components/tGCRHome/AffordableCertification";
import SubscribeForm from "@/components/Shared/SubscribeForm";

// export async function generateMetadata({ params }) {
// 	const { lang } = await params;
// 	const dict = await getDictionary(lang);

// 	return {
// 		title: dict.homepage.pageTitle,
// 	};
// }

const page = async ({ params }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	const currentUser = await getCurrentUser();

	// const { courses } = await getBannerCourses();
	// const { home_courses } = await getHomepageCourses();
	// const { partners } = await getPartners();
	// const { testimonials } = await getTestimonials();

	return (
		<>
			{/* error! <Banner currentUser={currentUser} courses={courses} {...dict} lang={lang} /> */}
			{/* error! <PopularCourses
				currentUser={currentUser}
				courses={home_courses}
				lang={lang}
				{...dict}
			/> */}
			{/* error! <FeedbackSliderWithFunFacts testimonials={testimonials} {...dict} /> */}
			{/* error! <Partner partners={partners} /> */}
			<ASpot currentUser={currentUser} lang={lang} featureDict={dict.homepage.feature} />
			<GetStarted
				currentUser={currentUser}
				lang={lang}
				getStartedDict={dict.homepage.getStarted}
			/>
			<StepsToLearn
				currentUser={currentUser}
				lang={lang}
				stepsToLearnDict={dict.homepage.stepsToLearn}
			/>
			{/* <AboutUs currentUser={currentUser} lang={lang} aboutUsDict={dict.homepage.aboutUs} /> */}
			{/* <GetInstantCourses currentUser={currentUser} lang={lang} {...dict} /> */}
			{/* <AffordableCertification {...dict} /> */}
			{/* <SubscribeForm {...dict} /> */}
		</>
	);
};

export default page;
