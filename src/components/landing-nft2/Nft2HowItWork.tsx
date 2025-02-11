import icon from "@/../public/images/global/section-icon.png";
import Image from "next/image";
import Link from "next/link";
import MotionFade from "../motionEffect/MotionFade";
import MotionFadeDownToTop from "../motionEffect/MotionFadeDownToTop";

const Nft2HowItWork = () => {
    return (
        <section className="howit-work-section howit-work-sectionv9 position-relative n0-bg pt-120 pb-120" id="down-scroll">
            {/* <!--Section Header--> */}
            <div className="container mb-xxl-20 mb-xl-16 mb-14">
                <div className="row g-xl-4 g-3 justify-content-center">
                    <div className="col-lg-6">
                        <div className="section__title text-center ">
                            <div className="subtitle-head mb-xxl-4 mb-sm-4 mb-3 d-flex justify-content-center flex-wrap align-items-center gap-3" data-aos="zoom-in-up" data-aos-duration="1400">
                                <Image src={icon} alt="img" />
                                <h5 className="s1-clr fw_700">How It Works</h5>
                            </div>
                            <MotionFadeDownToTop>
                                <h2 className="display-four d-block n4-clr" data-aos="fade-down-left" data-aos-duration="1600">
                                    <span className="d-block">Your Ultimate Guide</span>
                                    <span className="d-flex justify-content-center align-items-center gap-4">
                    to
                    <span className="act4-clr act4-underline">Winning!</span>
                  </span>
                                </h2>
                            </MotionFadeDownToTop>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--Section Header--> */}

            {/* <!--Work Body--> */}
            <div className="container">
                <div className="row g-6">
                    <MotionFade className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration="1000">
                        <div className="work-item1 work-itemv14 position-relative">
                            <span className="text-uppercase s1-clr fw_700 fs20 d-block mb-xxl-5 mb-3">STEP_01</span>
                            <h2 className="n1-clr mb-xxl-11 mb-xl-8 mb-lg-6 mb-5">
                                <span className="d-block">Choose</span>
                                <span>Prize</span>
                            </h2>
                            <p className="fs18 n3-clr">
                                Choose your desired prize, answer correctly, then press pick tickets, answer correctly, then press enter now for a
                                <Link href="#0" className="s1-clr">
                                    chance to win!
                                </Link>
                            </p>
                            <span className="number-shadow">1</span>
                        </div>
                    </MotionFade>
                    <MotionFade className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration="1500">
                        <div className="work-item1 work-itemv14 position-relative">
                            <span className="text-uppercase s1-clr fw_700 fs20 d-block mb-xxl-5 mb-3">STEP_02</span>
                            <h2 className="n1-clr mb-xxl-11 mb-xl-8 mb-lg-6 mb-5">
                                <span className="d-block">Watch the</span>
                                <span>Draw LIVE</span>
                            </h2>
                            <p className="fs18 n34-clr">
                                <Link href="#0" className="s1-clr">
                                    Join us live
                                </Link>{" "}
                                on Facebook for the draw and see if youre the lucky for the draw and see if winner! Be ready for a potential call
                            </p>
                            <span className="number-shadow">2</span>
                        </div>
                    </MotionFade>
                    <MotionFade className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration="1800">
                        <div className="work-item1 work-itemv14 position-relative">
                            <span className="text-uppercase s1-clr fw_700 fs20 d-block mb-xxl-5 mb-3">STEP_03</span>
                            <h2 className="n1-clr mb-xxl-11 mb-xl-8 mb-lg-6 mb-md-5 mb-2">
                                <span className="d-block">Get Your</span>
                                <span>Prize</span>
                            </h2>
                            <p className="fs18 n3-clr">Limited tickets ensure fixed odds. Competitions proceed, creating better chances. Join 7,000+ winners in anticipation</p>
                            <span className="number-shadow">3</span>
                        </div>
                    </MotionFade>
                </div>
            </div>
            {/* <!--Work Body--> */}
        </section>
    );
};

export default Nft2HowItWork;
