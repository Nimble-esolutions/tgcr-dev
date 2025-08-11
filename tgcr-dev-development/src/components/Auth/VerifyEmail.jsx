"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

const VerifyEmail = ({ lang, verifyEmail }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [message, setMessage] = useState(verifyEmail.pleaseWait);

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		watch,
		formState: { errors, isValid, isLoading },
	} = useForm({
		defaultValues: {
			token: token,
			lang: lang,
		},
	});

	useEffect(() => {
		if (token && lang) {
			axios
				.post("/api/auth/verify-email", {
					token: token,
					lang: lang,
				})
				.then((response) => {
					toast.success(verifyEmail.success);
					router.replace("/auth/login");
				})
				.catch((error) => {
					setMessage(error.response.data.message);
				});
		} else {
			setMessage(verifyEmail.badRequest);
		}
	}, [token, lang, router, verifyEmail]);

	return (
		<div className="login-form">
			<p>{message}</p>
		</div>
	);
};

export default VerifyEmail;
