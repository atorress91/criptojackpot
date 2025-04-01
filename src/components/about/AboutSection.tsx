import aboutThumb from "@/../public/images/howit/about-thumb.png";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import MotionFadeLeft from "../motionEffect/MotionFadeLeft";
import MotionFadeTopToDown from "../motionEffect/MotionFadeTopToDown";
import MotionStaggerEffectUl from "../motionEffect/MotionStaggerEffectUl";
import Link from "next/link";

const AboutSection = () => {
  return (
    <div className="about-section pt-120 pb-120 n0-bg overflow-hidden">
      <div className="container">
        <div className="about-wrapper-core">
          <div className="row g-xxl-12 g-xl-6 g-5">
            <div className="col-lg-6">
              <MotionFadeLeft className="about-thumb-core" data-aos="zoom-in" data-aos-duration="1600">
                <Image src={aboutThumb} alt="img" />
              </MotionFadeLeft>
            </div>
            <div className="col-lg-6">
              <div className="about-content-core">
                <MotionFadeTopToDown className="section__title mb-xxl-8 mb-6">
                  <span className="display-four d-block n4-clr mb-xxl-4 mb-xl-3 mb-2">
                    News &{" "}
                    <span className="act4-clr act4-underline" data-aos="zoom-in-left" data-aos-duration="1000">
                      Analysis{" "}
                    </span>
                  </span>
                  <p className="fs20 n3-clr" data-aos="fade-up-right" data-aos-duration="1400">
                    Welcome to Lottovibe, where luck meets excitement in the world of lotteries! We are passionate about creating a thrilling and secure platform that brings the joy of winning to
                    players around the globe
                  </p>
                </MotionFadeTopToDown>
                <ul className="about-list d-grid gap-xxl-4 gap-3 mb-xxl-10 mb-xl-8 mb-7">
                  <MotionStaggerEffectUl id={1} className="d-flex align-items-center gap-xxl-4 gap-3" data-aos="zoom-in-up" data-aos-duration="1200">
                    <span className="icon cmn-40 d-center p1-bg radius-circle">
                      <Check className="ph ph-check n4-clr"></Check>
                    </span>
                    <span className="fs20 fw_600 n1-clr">Playing It Global for Over a Decade</span>
                  </MotionStaggerEffectUl>
                  <MotionStaggerEffectUl id={2} className="d-flex align-items-center gap-xxl-4 gap-3" data-aos="zoom-in-up" data-aos-duration="1400">
                    <span className="icon cmn-40 d-center p1-bg radius-circle">
                      <Check className="ph ph-check n4-clr"></Check>
                    </span>
                    <span className="fs20 fw_600 n1-clr">Play from Anywhere in the World</span>
                  </MotionStaggerEffectUl>
                  <MotionStaggerEffectUl id={3} className="d-flex align-items-center gap-xxl-4 gap-3" data-aos="zoom-in-up" data-aos-duration="1600">
                    <span className="icon cmn-40 d-center p1-bg radius-circle">
                      <Check className="ph ph-check n4-clr"></Check>
                    </span>
                    <span className="fs20 fw_600 n1-clr">Absolutely No Commissions Taken</span>
                  </MotionStaggerEffectUl>
                </ul>
                <Link href="contact" className="kewta-btn kewta-alt d-inline-flex align-items-center">
                  <span className="kew-text s1-bg n0-clr" data-aos="zoom-in-left" data-aos-duration="900">
                    Contact Us
                  </span>
                  <div className="kew-arrow s1-bg" data-aos="zoom-in-left" data-aos-duration="1600">
                    <div className="kt-one">
                      <ArrowRight className="ti ti-arrow-right n0-clr"></ArrowRight>
                    </div>
                    <div className="kt-two">
                      <ArrowRight className="ti ti-arrow-right n0-clr"></ArrowRight>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
