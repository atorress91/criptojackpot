import sectionIcon from "@/../public/images/global/section-icon.png";
import Image from "next/image";
import MotionFadeTopToDown from "./motionEffect/MotionFadeTopToDown";

const SubTitle = ({text}: {text:string}) => {
  return (
    <MotionFadeTopToDown className="subtitle-head mb-xxl-4 mb-sm-4 mb-3 d-flex flex-wrap align-items-center gap-3" data-aos="zoom-in-down" data-aos-duration="1200">
      <Image src={sectionIcon} alt="img" />
      <h5 className="s1-clr fw_700">{text}</h5>
    </MotionFadeTopToDown>
  );
};

export default SubTitle;
