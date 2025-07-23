import { getDictionary } from "@/app/[lang]/dictionaries";
import CheckoutForm from "@/components/Store/CheckoutForm";

export async function generateMetadata({ params }) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: dict.checkoutCart.pageTitle,
	};
}

const page = async ({ params }) => {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<>
			<div className="ptb-15">
				<div className="container">
					<h2 className="mb-4">{dict.checkoutCart.pageTitle}</h2>
					<div className="row">
						<CheckoutForm lang={lang} dict={dict.checkoutCart} />
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
