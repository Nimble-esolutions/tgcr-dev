"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../FormHelpers/Input";
import TextArea from "../FormHelpers/TextArea";

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			const url = `/api/contact`;
			const response = await axios.post(url, data);
			toast.success(response.data.message, {
				style: {
					border: "1px solid #4BB543",
					padding: "16px",
					color: "#4BB543",
				},
				iconTheme: {
					primary: "#4BB543",
					secondary: "#FFFAEE",
				},
			});
			reset();
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message, {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		}
	};

	return (
		<>
			<div className="contact-form">
				<h2>Ready to Get Started?</h2>
				<p>
					Your email address will not be published. All fields are
					required.
				</p>

				<form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
					<div className="row">
						<div className="col-lg-6 col-md-6">
							<Input
								label="Full Name"
								id="name"
								labelShow={false}
								disabled={isSubmitting}
								register={register}
								errors={errors}
								required
							/>
						</div>

						<div className="col-lg-6 col-md-6">
							<Input
								label="Email"
								id="email"
								labelShow={false}
								disabled={isSubmitting}
								register={register}
								errors={errors}
								required
							/>
						</div>

						<div className="col-lg-12 col-md-6">
							<Input
								label="Phone"
								id="phone"
								labelShow={false}
								disabled={isSubmitting}
								register={register}
								errors={errors}
								required
							/>
						</div>

						<div className="col-lg-12 col-md-12">
							<Input
								label="Subject"
								id="subject"
								labelShow={false}
								disabled={isSubmitting}
								register={register}
								errors={errors}
								required
							/>
						</div>

						<div className="col-lg-12 col-md-12">
							<TextArea
								id="subject"
								disabled={isSubmitting}
								register={register}
								errors={errors}
								required
							/>
						</div>

						<div className="col-lg-12 col-sm-12 text-center">
							<button
								type="submit"
								className="default-btn"
								disabled={!isValid}
							>
								Send Message
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default ContactForm;
