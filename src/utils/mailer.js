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

// Payment success student
export const sendPaymentSuccess = async ({
	email,
	orderNumber,
	amount,
	currency = "eur",
	paymentId,
}) => {
	const mailOptions = {
		from: `"Your Company" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: `Payment Successful - Order ${orderNumber}`,
		html: `
			<h2>Thank you for your payment!</h2>
			<p>Your payment for order <strong>${orderNumber}</strong> was successful.</p>
			<p>Amount: ${currency} ${amount}</p>
			<p>Payment ID: ${paymentId}</p>
			<p>If you have any questions, contact support.</p>
		`,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Error sending payment email:", error);
		throw error;
	}
};

// Payment success teacher
export const sendPaymentSuccessTeacher = async ({
	email,
	orderNumber,
	amount,
	currency = "EUR",
	paymentId,
	studentName,
	sessionDateTime, 
}) => {
	const mailOptions = {
		from: `"Your Company" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: `New Lesson Booked - Order ${orderNumber}`,
		html: `
			<h2>Hello!</h2>
			<p>You have a new session booking.</p>
			<p><strong>Student:</strong> ${studentName}</p>
			<p>Please check your dashboard for more details.</p>
			<p>Thank you for teaching with us!</p>
		`,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Error sending teacher booking email:", error);
		throw error;
	}
};

