import customer1 from "@/../public/images/banner/customer1.png";
import customer2 from "@/../public/images/banner/customer2.png";
import customer3 from "@/../public/images/banner/customer3.png";
import customer4 from "@/../public/images/banner/customer4.png";
import kewtaArrow from "@/../public/images/banner/kewta-arrow.png";
import win from "@/../public/images/banner/win.png";
import Counter from "@/components/Counter";

import ScrollToTop from "@/components/ScrollToTop";
import BannerOneSlider from "@/components/home-one/BannerOneSlider";
import { ArrowRight, Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import HomeOneBannerVideo from "./home-one/HomeOneBannerVideo";
import MotionFadeDownToTop from "./motionEffect/MotionFadeDownToTop";
import MotionFadeLeft from "./motionEffect/MotionFadeLeft";
import MotionFadeRight from "./motionEffect/MotionFadeRight";
import MotionFadeTopToDown from "./motionEffect/MotionFadeTopToDown";
import MotionStaggerEffectUl from "./motionEffect/MotionStaggerEffectUl";

export default function HomeOneBanner() {
  return (
    <main>
      {/* <!-- ==== Banner Section ==== --> */}
      <div className="banner-section-v1 pt-70-fixed n4-bg position-relative overflow-hidden overflow-hidden">
        {/* <!--Banner Content --> */}
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-8">
              <div className="banner-content-v1">
                <div className="d-flex mb-sm-3 mb-5 align-items-center gap-xxl-8 gap-lg-6 gap-4 flex-wrap">
                  <ul className="entry-win d-flex align-items-center gap-3">
                    <MotionStaggerEffectUl id={1} className="entry-win-item" data-aos="fade-down-right" data-aos-duration="1000">
                      <Link href="#" className="fs-four p1-clr">
                        Entry
                      </Link>
                    </MotionStaggerEffectUl>
                    <MotionStaggerEffectUl id={2} className="entry-win-item" data-aos="fade-down-right" data-aos-duration="1200">
                      <ArrowRight className="ti ti-arrow-right fs-four p1-clr"></ArrowRight>
                    </MotionStaggerEffectUl>
                    <MotionStaggerEffectUl id={3} className="entry-win-item" data-aos="fade-down-right" data-aos-duration="1400">
                      <Link href="#" className="fs-four p1-clr">
                        Draw
                      </Link>
                    </MotionStaggerEffectUl>
                    <MotionStaggerEffectUl id={4} className="entry-win-item" data-aos="fade-down-right" data-aos-duration="1600">
                      <ArrowRight className="ti ti-arrow-right fs-four p1-clr"></ArrowRight>
                    </MotionStaggerEffectUl>
                    <MotionStaggerEffectUl id={5} className="entry-win-item">
                      <Link href="#" className="fs-four p1-clr">
                        Win
                      </Link>
                    </MotionStaggerEffectUl>
                  </ul>
                  <Link href="contest" className="custom-bigarrow">
                    <span className="icon">
                      <svg width="137" height="16" viewBox="0 0 137 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M136.707 8.70712C137.098 8.31659 137.098 7.68343 136.707 7.29291L130.343 0.928944C129.953 0.538419 129.319 0.538419 128.929 0.928943C128.538 1.31947 128.538 1.95263 128.929 2.34316L134.586 8.00001L128.929 13.6569C128.538 14.0474 128.538 14.6806 128.929 15.0711C129.319 15.4616 129.953 15.4616 130.343 15.0711L136.707 8.70712ZM-8.74228e-08 9L136 9.00001L136 7.00001L8.74228e-08 7L-8.74228e-08 9Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
                <MotionFadeTopToDown className="custom-display n0-clr mb-6" data-aos="zoom-in-up" data-aos-duration="1000">
                  Could you be our
                  <div className="d-xxl-flex d-grid align-items-center justify-content-between winner-span gap-xxl-5 gap-4 flex-xxl-nowrap flex-wrap">
                    <span className="wins nw1-clr d-flex align-items-center gap-6" data-aos="zoom-in-down" data-aos-duration="2000">
                      next
                      <span className="wins p1-clr">
                        winner?
                        <svg viewBox="0 0 355 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.92099 12.8063C56.8373 3.14121 205.75 -10.0362 354.071 14.5747" stroke="#AEFE3A" />
                        </svg>
                      </span>
                    </span>
                    <HomeOneBannerVideo />
                    {/* =========== */}
                  </div>
                </MotionFadeTopToDown>
                <MotionFadeDownToTop>
                  <p className="nw2-clr bn-pra mb-xxl-10 mb-sm-8 mb-6" data-aos="zoom-out-up" data-aos-duration="1000">
                    Now&apos;s your chance to win a car! Check out the prestige cars you can win in our car prize draws. Will you be our next lucky winner?
                  </p>
                </MotionFadeDownToTop>
                <div className="d-flex align-items-center gap-xl-8 gap-3 flex-wrap">
                  <MotionFadeLeft>
                    <Link href="contest" className="kewta-btn kewta-alt d-inline-flex align-items-center" data-aos="zoom-in-right" data-aos-duration="1000">
                      <span className="kew-text s1-bg n4-clr act3-bg"> Participant Now </span>
                      <div className="kew-arrow act3-bg">
                        <div className="kt-one">
                          <ArrowRight className="ti ti-arrow-right n4-clr"></ArrowRight>
                        </div>
                        <div className="kt-two">
                          <ArrowRight className="ti ti-arrow-right n4-clr"></ArrowRight>
                        </div>
                      </div>
                    </Link>
                  </MotionFadeLeft>
                  <MotionFadeRight>
                    <Link href="howtoplay" className="how-cont nw1-clr fw_700" data-aos="zoom-in-left" data-aos-duration="800">
                      How It’s Works
                    </Link>
                  </MotionFadeRight>
                </div>
                <div className="bn1-odometer d-flex align-items-center gap-xxl-11 gap-xl-8 gap-lg-6 gap-5">
                  <div className="odometer__items" data-aos="zoom-in-down" data-aos-duration="1000">
                    <div className="cont d-flex align-items-center">
                      <span className="odometer display-four nw1-clr fw_800">
                        <Counter value={1750} />
                      </span>
                      <span className="plus__icon display-four nw1-clr fw_800"> + </span>
                    </div>
                    <p>Verified Users</p>
                  </div>
                  <div className="odometer__items" data-aos="zoom-in-up" data-aos-duration="1000">
                    <div className="cont d-flex align-items-center">
                      <span className="odometer display-four nw1-clr fw_800">
                        <Counter value={15} />
                      </span>
                    </div>
                    <p>Years on the market</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3">
              <div className="banner-content-v1customer">
                <ul className="customer-review cmn-style-flex d-inline-flex act3-border radius100 py-xxl-2 py-2 px-2">
                  <li>
                    <Link href="#" className="customer-revew-item n0-bg d-flex align-items-center justify-content-center">
                      <Image src={customer1} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="customer-revew-item n0-bg d-flex align-items-center justify-content-center">
                      <Image src={customer2} alt="image" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="customer-revew-item n0-bg d-flex align-items-center justify-content-center">
                      <Image src={customer3} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="customer-revew-item n0-bg d-flex align-items-center justify-content-center">
                      <Image src={customer4} alt="img" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="customer-revew-item n0-bg d-flex align-items-center justify-content-center">
                      <span className="d-grid customer-ratting text-center p-2 p1-bg align-items-center justify-content-center">
                        <Star weight="fill" className="ti ti-star-filled n4-clr"></Star>
                        <span className="d-block fs-eight fw_700 n4-clr"> 4.7 </span>
                      </span>
                    </Link>
                  </li>
                </ul>
                <span className="nw2-clr fs-eight fw_700 d-block text-uppercase mt-xxl-4 mt-3">
                  <span className="act3-clr fs-five">70k</span> CUSTOMER REVIEW
                </span>
                <MotionFadeDownToTop>
                  <Link href="about" className="d-flex arrow-rotate justify-content-end me-5 mt-6">
                    <Image src={kewtaArrow} alt="img" />
                  </Link>
                </MotionFadeDownToTop>
              </div>
            </div>
          </div>
        </div>
        {/* <!--Banner Content --> */}

        <Image src={win} alt="img" className="shape-win" />
        <MotionFadeRight>
          <BannerOneSlider />
        </MotionFadeRight>

        {/* <!--Scroll Top --> */}
        <ScrollToTop />
        {/* <!--Scroll Top --> */}
      </div>
    </main>
  );
}
