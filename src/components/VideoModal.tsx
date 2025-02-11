import React from "react";
import ModalVideo from "react-modal-video";

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoId: string;
};

const VideoModal = ({ isOpen, setOpen, videoId }: Props) => {
  return (
    <React.Fragment>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
    </React.Fragment>
  );
};

export default VideoModal;
