// sending emails
import { baseUrl, baseMailFrom } from "@/libs/constants";
import { SendMailClient } from "zeptomail";

const sendMail = async (mailTo, mailTemplateKey, mailMergeInfo) => {
	// generic send mail function
	const mailFrom = process.env.EMAIL_USER;
	const mailFromName = baseMailFrom;
	const url = process.env.EMAIL_ZOHO_URL;
	const token = process.env.EMAIL_ZOHO_TOKEN;

	var client = new SendMailClient({ url, token });

	// await client.sendMail({
	// 	from: {
	// 		address: mailFrom,
	// 		name: mailFromName,
	// 	},
	// 	to: [
	// 		{
	// 			email_address: {
	// 				address: mailTo,
	// 			},
	// 		},
	// 	],
	// 	subject: mailSubject,
	// 	htmlbody: mailBody,
	// });

	await client.sendMailWithTemplate({
		mail_template_key: mailTemplateKey,
		from: {
			address: mailFrom,
			name: mailFromName,
		},
		to: [
			{
				email_address: {
					address: mailTo,
				},
			},
		],
		merge_info: mailMergeInfo,
	});
};

export const sendVerifyEmailToken = async (mailTo, verificationToken, lang) => {
	// sending emails for email address confirmation
	var mailTemplateKey;
	switch (lang) {
		case "en":
			mailTemplateKey =
				"13ef.3600a04ee0351328.k1.32cb9bd0-6557-11f0-aad3-76699466976f.1982773e60d";
			break;
		default: // default to English
			mailTemplateKey =
				"13ef.3600a04ee0351328.k1.32cb9bd0-6557-11f0-aad3-76699466976f.1982773e60d";
	}

	try {
		await sendMail(mailTo, mailTemplateKey, {
			token: `${baseUrl}/${lang}/auth/verify-email?token=${verificationToken}`,
		});
	} catch (error) {
		throw error;
	}
};

export const sendTemporaryPassword = async (mailTo, tempPassword, lang) => {
	// sending emails with a temporary password
	var mailTemplateKey;
	switch (lang) {
		case "en":
			mailTemplateKey =
				"13ef.3600a04ee0351328.k1.af5e2f60-655b-11f0-aad3-76699466976f.19827914d56";
			break;
		default: // default to English
			mailTemplateKey =
				"13ef.3600a04ee0351328.k1.af5e2f60-655b-11f0-aad3-76699466976f.19827914d56";
	}

	try {
		await sendMail(mailTo, mailTemplateKey, {
			password: `${tempPassword}`,
		});
	} catch (error) {
		throw error;
	}
};
