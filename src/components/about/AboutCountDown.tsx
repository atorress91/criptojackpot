import badge from "@/../public/images/global/badge-a.png";
import dollar from "@/../public/images/global/dollar-a.png";
import ticket from "@/../public/images/global/ticket-a.png";
import Image from "next/image";
import Counter from "../Counter";
import MotionFade from "../motionEffect/MotionFade";

const AboutCountDown = () => {
  return (
    <div className="about-counter winbg pt-120 pb-120 overflow-hidden">
      <div className="container">
        <div className="row g-10 justify-content-center">
          <MotionFade className="col-lg-4 col-md-6 col-sm-6" data-aos="zoom-in-right" data-aos-duration="1200">
            <div className="about-winner-countitem">
              <div className="icon d-center act3-border mb-xxl-8 mb-xl-6 mb-5">
                <Image src={badge} alt="img" />
              </div>
              <div className="cont text-center">
                <span className="counters display-two mb-2 mb-xl-3 justify-content-center d-flex align-items-center  n1-clr">
                  <span className="odometer" data-odometer-final="27"><Counter value={27} /></span>
                  <span className="act4-clr"> +</span>
                </span>
                <span className="fs20 fw_600 n1-clr">Winners For Last Month</span>
              </div>
            </div>
          </MotionFade>
          <MotionFade className="col-lg-4 col-md-6 col-sm-6" data-aos="zoom-in-right" data-aos-duration="1400">
            <div className="about-winner-countitem">
              <div className="icon d-center act3-border mb-xxl-8 mb-xl-6 mb-5">
                <Image src={ticket} alt="img" />
              </div>
              <div className="cont text-center">
                <span className="counters display-two mb-2 mb-xl-3 justify-content-center d-flex align-items-center  n1-clr">
                  <span className="odometer" data-odometer-final="4575"><Counter value={4575} /></span>
                  <span className="act4-clr"> K</span>
                </span>
                <span className="fs20 fw_600 n1-clr">Tickets Sold</span>
              </div>
            </div>
          </MotionFade>
          <MotionFade className="col-lg-4 col-md-6 col-sm-6" data-aos="zoom-in-right" data-aos-duration="1600">
            <div className="about-winner-countitem">
              <div className="icon d-center act3-border mb-xxl-8 mb-xl-6 mb-5">
                <Image src={dollar} alt="img" />
              </div>
              <div className="cont text-center">
                <span className="counters display-two mb-2 mb-xl-3 justify-content-center d-flex align-items-center  n1-clr">
                  <span className="odometer" data-odometer-final="27"><Counter value={27} /></span>
                  <span className="act4-clr"> K</span>
                </span>
                <span className="fs20 fw_600 n1-clr">Payout to Winners</span>
              </div>
            </div>
          </MotionFade>
        </div>
      </div>
    </div>
  );
};

export default AboutCountDown;
