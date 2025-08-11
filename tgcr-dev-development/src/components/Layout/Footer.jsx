"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { baseSiteName } from "@/libs/constants";

const Footer = ({ lang, dict }) => {
	const currentYear = new Date().getFullYear();
	return (
		<>
			<footer className="footer-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-md-6 col-sm-6">
							<div className="single-footer-widget">
								<Link href={`/${lang}/`} className="logo">
									<Image
										src="/images/logo-tgcr-bw.png"
										width={120}
										height={40}
										alt="logo"
									/>
								</Link>

								<p>{dict.tagLine}</p>

								<ul className="social-link">
									<li>
										<a
											href="https://facebook.com/eduBridge.nl/"
											className="d-block"
											target="_blank"
											rel="noreferrer"
										>
											<i className="bx bxl-facebook"></i>
										</a>
									</li>
									<li>
										<a
											href="https://instagram.com/eduBridge.nl/"
											className="d-block"
											target="_blank"
											rel="noreferrer"
										>
											<i className="bx bxl-instagram"></i>
										</a>
									</li>
									<li>
										<a
											href="https://nl.linkedin.com/company/edubridge"
											className="d-block"
											target="_blank"
											rel="noreferrer"
										>
											<i className="bx bxl-linkedin"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-2 col-md-6 col-sm-6 offset-lg-1">
							<div className="single-footer-widget">
								<h3>{dict.explore}</h3>
								<ul className="footer-links-list">
									<li>
										<Link href={`/${lang}/`}>{dict.home}</Link>
									</li>
									<li>
										<Link href={`/${lang}/about-us`}>{dict.about}</Link>
									</li>
									<li>
										<Link href={`/${lang}/contact`}>{dict.contact}</Link>
									</li>
									<li>
										<Link href={`/${lang}/faq`}>{dict.faq}</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 col-sm-6">
							<div className="single-footer-widget">
								<h3>{dict.address}</h3>
								<ul className="footer-contact-info">
									<li>
										<i className="bx bx-map"></i>
										Van der Boechorststraat 26, 1081 BT Amsterdam, Netherlands
									</li>
									<li>
										<i className="bx bx-phone-call"></i>
										<a href="tel:+31612345678">+31 6 1234 5678</a>
									</li>
									<li>
										<i className="bx bx-envelope"></i>
										<a href="mailto:hello@edubridge.nl">hello@edubridge.nl</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="footer-bottom-area">
						<div className="row align-items-center">
							<div className="col-lg-6 col-md-6">
								<p>
									<i className="bx bx-copyright"></i>
									{currentYear} {baseSiteName.replace("{addition}", " | ")}
									<a target="_new" href="https://edubridge.nl/" rel="noreferrer">
										edubridge.nl
									</a>
								</p>
							</div>

							<div className="col-lg-6 col-md-6">
								<ul>
									<li>
										<Link href={`/${lang}/privacy-policy`}>{dict.pp}</Link>
									</li>
									<li>
										<Link href={`/${lang}/terms-conditions`}>{dict.tnc}</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
