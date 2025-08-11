"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SubscribeForm = ({
	homepage: {
		subscribeArea: {
			subTitle,
			heading,
			helpText,
			placeholder,
			subscribeNow,
		},
	},
}) => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<div className="subscribe-area bg-f9f9f9 ptb-100">
				<div className="container">
					<div className="subscribe-content">
						<span className="sub-title">{subTitle}</span>
						<h2>{heading}</h2>
						<p>{helpText}</p>

						<form
							className="newsletter-form"
							onSubmit={handleSubmit}
						>
							<input
								type="email"
								className="input-newsletter"
								placeholder={placeholder}
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<motion.button
								type="submit"
								className="default-btn"
								whileTap={{ scale: 0.5 }}
							>
								<i className="flaticon-user"></i> {subscribeNow}{" "}
								<span></span>
							</motion.button>
						</form>
					</div>
				</div>

				<div className="shape13" data-speed="0.06" data-revert="true">
					<Image
						src="/images/shape12.png"
						width={103}
						height={103}
						alt="image"
					/>
				</div>
			</div>
		</>
	);
};

export default SubscribeForm;
