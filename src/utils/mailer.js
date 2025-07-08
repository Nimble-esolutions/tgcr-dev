// sending emails
import { getDictionary } from "@/app/[lang]/dictionaries";
import { baseUrl } from "@/libs/constants";

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SMTP_HOST,
	port: process.env.EMAIL_SMTP_PORT,
	secure: process.env.EMAIL_SMTP_SECURE === "true",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// sending emails for email address confirmation
export const sendVerifyEmailToken = async (email, token, lang) => {
	const dict = await getDictionary(lang);

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: dict.verifyEmail.emailSubject,
		//text: `${dict.verifyEmail.emailText}: ${baseUrl}/api/verify-email?token=${token}&lang=${lang}`,
		text: dict.verifyEmail.emailText.replace(
			"{token}",
			`${baseUrl}/${lang}/auth/verify-email?token=${token}`
		),
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		throw error;
	}
};

// sending emails with a temporary password
export const sendTemporaryPassword = async (email, password, lang) => {
	const dict = await getDictionary(lang);

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: dict.forgotPassword.emailSubject,
		text: dict.forgotPassword.emailText.replace("{password}", `${password}`),
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		throw error;
	}
};
