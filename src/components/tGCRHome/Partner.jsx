"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import Image from "next/image";

const Partner = ({ partners }) => {
	if (partners.length == 0) return;
	return (
		<>
			<div className="partner-area pt-100 pb-70 border-bottom">
				<div className="container">
					<Swiper
						slidesPerView={3}
						spaceBetween={30}
						breakpoints={{
							768: {
								slidesPerView: 4,
							},
							1024: {
								slidesPerView: 6,
							},
						}}
						className="mySwiper partner-slides"
					>
						{partners.map((partner) => (
							<SwiperSlide key={partner.id}>
								<motion.div
									className="single-partner-item"
									initial="hidden"
									whileInView="visible"
									transition={{
										type: "spring",
										duration: 3,
										bounce: 0.3,
									}}
									variants={{
										visible: { opacity: 1, scale: 1 },
										hidden: { opacity: 0, scale: 0 },
									}}
								>
									<Image
										width={150}
										height={60}
										src={partner.image}
										alt={partner.name}
									/>
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
};

export default Partner;
