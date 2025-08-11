"use client";

import React from "react";
import FunFacts from "./FunFacts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const FeedbackSliderWithFunFacts = ({
  testimonials = [],
  homepage: { feedbackSection },
}) => {
  return (
    <>
      <div className="funfacts-and-feedback-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="feedback-content">
                <span className="sub-title">{feedbackSection.subTitle}</span>
                <h2>{feedbackSection.heading}</h2>
                <p>{feedbackSection.helpText}</p>

                <Swiper
                  pagination={{
                    dynamicBullets: true,
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper feedback-slides"
                >
                  {testimonials.length > 0 &&
                    testimonials.map((teste) => (
                      <SwiperSlide key={teste.id}>
                        <div className="single-feedback-item">
                          <p>{teste.description}</p>

                          <div className="client-info d-flex align-items-center">
                            <Image
                              src={teste.image}
                              width={200}
                              height={200}
                              className="rounded-circle"
                              alt="image"
                            />
                            <div className="title">
                              <h3>{teste.name}</h3>
                              <span>{teste.bioTitle}</span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <FunFacts {...feedbackSection} />
            </div>
          </div>
        </div>

        <div className="shape2">
          <Image
            src="/images/shape2.png"
            width={206}
            height={258}
            alt="image"
          />
        </div>
        <div className="shape3">
          <Image
            src="/images/shape3.png"
            width={150}
            height={150}
            alt="image"
          />
        </div>
        <div className="shape4">
          <Image src="/images/shape4.png" width={62} height={62} alt="image" />
        </div>
        <div className="shape9">
          <Image src="/images/shape8.svg" width={22} height={22} alt="image" />
        </div>
      </div>
    </>
  );
};

export default FeedbackSliderWithFunFacts;
