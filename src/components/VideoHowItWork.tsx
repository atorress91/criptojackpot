"use client";
import howPlayv5 from "@/../public/images/howit/how-playv5.png";
import { Play } from "@phosphor-icons/react/dist/ssr";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import VideoModal from "./VideoModal";
import MotionFadeRight from "./motionEffect/MotionFadeRight";

type Props = {
  image?: StaticImageData;
};

const VideoHowItWork = ({ image }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const handleVideoModal = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <MotionFadeRight>
      <div className="howit-video position-relative" onClick={handleVideoModal}>
        <Image src={image ? image : howPlayv5} alt="img" />
        <button className="bn-vid popup-video">
          <Play weight="fill" className="ti ti-player-play-filled act3-clr fs-five"></Play>
        </button>
      </div>
      <VideoModal isOpen={isOpen} setOpen={setOpen} videoId="4DCTTrGjGU4" />
    </MotionFadeRight>
  );
};

export default VideoHowItWork;
