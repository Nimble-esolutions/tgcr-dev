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

export const sendPaymentSuccess = async ({
  email,
  orderNumber,
  amount,
  currency = "€",
  paymentId,
}) => {
  const cartDetailsSession = sessionStorage.getItem('cartMailDetails');
  const cartDetails = JSON.parse(cartDetailsSession);
  const rows = Object.values(cartDetails)
    .flatMap((teacherGroup) =>
      teacherGroup.items.map((item) => {
        const date = new Date(item.startTime).toLocaleString("en-IN", {
          timeZone: item.studentTimezoneIdentifier || "UTC",
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
			<tr>
			  <td style="border: 1px solid #ddd; padding: 8px;">${item.teacherName}</td>
			  <td style="border: 1px solid #ddd; padding: 8px;">${date}</td>
			  <td style="border: 1px solid #ddd; padding: 8px;">${item.classLevelName}</td>
			  <td style="border: 1px solid #ddd; padding: 8px;">${currency} ${item.price}</td>
			</tr>
		  `;
      })
    )
    .join("");

  const mailOptions = {
    from: `"Your Company" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Payment Successful - Order ${orderNumber}`,
    html: `
		<h2>Thank you for your payment!</h2>
		<p>Your payment for order <strong>${orderNumber}</strong> was successful.</p>
		<p><strong>Amount Paid:</strong> ${currency} ${amount}</p>
		<p><strong>Payment ID:</strong> ${paymentId}</p>
		<h3>Session Details:</h3>
		<table style="border-collapse: collapse; width: 100%;">
		  <thead>
			<tr>
			  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Teacher</th>
			  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Time & Date</th>
			  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Class Level</th>
			  <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Price</th>
			</tr>
		  </thead>
		  <tbody>
			${rows}
		  </tbody>
		</table>
		<p>If you have any questions, please contact our support team.</p>
	  `,
  };

  try {
    await transporter.sendMail(mailOptions);
	sessionStorage.removeItem('cartMailDetails');
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
  currency = "€",
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
