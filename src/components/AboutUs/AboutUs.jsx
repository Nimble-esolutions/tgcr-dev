"use client";

import React from "react";
import Image from "next/image";

const AboutUs = () => {
	return (
		<>
			<div className="about-area ptb-100">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-12">
							<div className="about-image">
								<div className="image">
									<Image
										src="/images/about-img1.png"
										alt="image"
										width="100"
										height="100"
									/>
								</div>
							</div>
						</div>

						<div className="col-lg-6 col-md-12">
							<div className="about-content">
								<span className="sub-title">DISTANCE LEARNING</span>
								<h2>
									89% of people learning for professional development report
									career benefits like getting a promotion, starting a new career
								</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</p>

								<p>
									Sed ut perspiciatis unde omnis iste natus error sit voluptatem
									accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
									quae ab illo inventore veritatis et quasi architecto beatae
									vitae dicta sunt explicabo.
								</p>

								<ul className="features-list">
									<li>
										<span>
											<i className="flaticon-experience"></i> Expert Trainers
										</span>
									</li>
									<li>
										<span>
											<i className="flaticon-time-left"></i> Lifetime Acces
										</span>
									</li>
									<li>
										<span>
											<i className="flaticon-tutorials"></i> Remote Learning
										</span>
									</li>
									<li>
										<span>
											<i className="flaticon-self-growth"></i> Self
											Development
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutUs;
