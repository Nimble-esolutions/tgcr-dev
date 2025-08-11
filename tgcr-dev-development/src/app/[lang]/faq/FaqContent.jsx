"use client";

import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemPanel,
	AccordionItemButton,
} from "react-accessible-accordion";

const FaqContent = () => {
	return (
		<div className="faq-area ptb-100">
			<div className="container">
				<div className="faq-accordion">
					<Accordion allowZeroExpanded preExpanded={["a"]}>
						<AccordionItem uuid="a">
							<AccordionItemHeading>
								<AccordionItemButton>
									How can I contact a school directly?
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<p>
									You can contact a school by filling out a{" "}
									<a href="contact.html">“Contact Us”</a>{" "}
									form. This form can be found to the right of
									both the institute and education program
									profiles and also at the bottom of these
									profiles.
								</p>
							</AccordionItemPanel>
						</AccordionItem>

						<AccordionItem uuid="b">
							<AccordionItemHeading>
								<AccordionItemButton>
									Where should I study abroad?
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<p>
									You can contact a school by filling out a{" "}
									<a href="contact.html">“Contact Us”</a>{" "}
									form. This form can be found to the right of
									both the institute and education program
									profiles and also at the bottom of these
									profiles.
								</p>
							</AccordionItemPanel>
						</AccordionItem>

						<AccordionItem uuid="c">
							<AccordionItemHeading>
								<AccordionItemButton>
									How do I find a study abroad program on
									eLearniv.com?
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<p>
									You can contact a school by filling out a{" "}
									<a href="contact.html">“Contact Us”</a>{" "}
									form. This form can be found to the right of
									both the institute and education program
									profiles and also at the bottom of these
									profiles.
								</p>
							</AccordionItemPanel>
						</AccordionItem>

						<AccordionItem uuid="d">
							<AccordionItemHeading>
								<AccordionItemButton>
									How do I find a school where I want to
									study?
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<p>
									You can contact a school by filling out a{" "}
									<a href="contact.html">“Contact Us”</a>{" "}
									form. This form can be found to the right of
									both the institute and education program
									profiles and also at the bottom of these
									profiles.
								</p>
							</AccordionItemPanel>
						</AccordionItem>

						<AccordionItem uuid="e">
							<AccordionItemHeading>
								<AccordionItemButton>
									Am I eligible for admission?
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel>
								<p>
									You can contact a school by filling out a{" "}
									<a href="contact.html">“Contact Us”</a>{" "}
									form. This form can be found to the right of
									both the institute and education program
									profiles and also at the bottom of these
									profiles.
								</p>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default FaqContent;
