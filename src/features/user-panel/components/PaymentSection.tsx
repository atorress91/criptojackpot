import americanCard from "public/images/howit/american-card.png";
import discoverCard from "public/images/howit/discover-card.png";
import masterCard from "public/images/howit/master-card.png";
import paypalCard from "public/images/howit/paypal-card.png";
import visaCard from "public/images/howit/visa-card.png";
import { PencilSimpleLineIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import MotionFade from "../../../components/motionEffect/MotionFade";

const PaymentSection = () => {
  return (
    <MotionFade className="col-xxl-9 col-xl-8 col-lg-8">
      <div className="cmn-box-addingbg win40-ragba border radius24 py-xxl-10 py-xl-8 py-lg-6 py-5">
        <div className="d-flex align-items-center justify-content-between flex-wrap px-xxl-8 px-xl-6 px-sm-5 px-4 mb-xxl-15 mb-xl-10 mb-lg-8 mb-6 gap-2">
          <h3 className="user-title n4-clr">Payment Methods</h3>
          <button type="submit" className="kewta-btn kewta-alt d-inline-flex align-items-center">
            <span className="kew-text s1-bg nw1-clr">Submit Now</span>
          </button>
        </div>
        <div className="payment-methodwrap">
          <div className="payment-method-items border-bottom pb-xxl-8 pb-xl-5 pb-4 d-flex algin-items-center justify-content-between  gap-3 px-xxl-8 px-xl-6 px-sm-5 px-4">
            <div className="d-flex align-items-center gap-xl-6 gap-lg-4 gap-3">
              <Image src={visaCard} alt="img" className="radius12" />
              <div className="cont">
                <span className="n4-clr fw_600 d-block mb-0">**** 1234</span>
                <span className="n3-clr fs-eight">Expires in 10/2024</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-xl-6 gap-3">
              <button type="button">
                <PencilSimpleLineIcon weight="bold" className="ph-bold ph-pencil-simple-line n4-clr fs-four"></PencilSimpleLineIcon>
              </button>
              <button type="button">
                <TrashIcon weight="bold" className="ph-bold ph-trash act4-clr fs-four"></TrashIcon>
              </button>
            </div>
          </div>
          <div className="payment-method-items gap-3 border-bottom border-top pb-xxl-8 pb-xl-5 pb-4 pt-xxl-8 pt-xl-5 pt-4 d-flex algin-items-center justify-content-between px-xxl-8 px-xl-6 px-sm-5 px-4">
            <div className="d-flex align-items-center gap-xl-6 gap-lg-4 gap-3">
              <Image src={masterCard} alt="img" className="radius12" />
              <div className="cont">
                <span className="n4-clr fw_600 d-block mb-0">Mastercard ending in 1234</span>
                <span className="n3-clr fs-eight">Expires in 03/2026</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-xl-6 gap-3">
              <button type="button">
                <PencilSimpleLineIcon weight="bold" className="ph-bold ph-pencil-simple-line n4-clr fs-four"></PencilSimpleLineIcon>
              </button>
              <button type="button">
                <TrashIcon weight="bold" className="ph-bold ph-trash act4-clr fs-four"></TrashIcon>
              </button>
            </div>
          </div>
          <div className="payment-method-items gap-3 border-bottom border-top pb-xxl-8 pb-xl-5 pb-4 pt-xxl-8 pt-xl-5 pt-4 d-flex algin-items-center justify-content-between px-xxl-8 px-xl-6 px-sm-5 px-4">
            <div className="d-flex align-items-center gap-xl-6 gap-lg-4 gap-3">
              <Image src={discoverCard} alt="img" className="radius12" />
              <div className="cont">
                <span className="n4-clr fw_600 d-block mb-0">Discover ending in 1234</span>
                <span className="n3-clr fs-eight">Expires in 03/2026</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-xl-6 gap-3">
              <button type="button">
                <PencilSimpleLineIcon weight="bold" className="ph-bold ph-pencil-simple-line n4-clr fs-four"></PencilSimpleLineIcon>
              </button>
              <button type="button">
                <TrashIcon weight="bold" className="ph-bold ph-trash act4-clr fs-four"></TrashIcon>
              </button>
            </div>
          </div>
          <div className="payment-method-items gap-3 border-bottom border-top pb-xxl-8 pb-xl-5 pb-4 pt-xxl-8 pt-xl-5 pt-4 d-flex algin-items-center justify-content-between px-xxl-8 px-xl-6 px-sm-5 px-4">
            <div className="d-flex align-items-center gap-xl-6 gap-lg-4 gap-3">
              <Image src={americanCard} alt="img" className="radius12" />
              <div className="cont">
                <span className="n4-clr fw_600 d-block mb-0">American Express ending in 1234</span>
                <span className="n3-clr fs-eight">Expires in 12/2021</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-xl-6 gap-3">
              <button type="button">
                <PencilSimpleLineIcon weight="bold" className="ph-bold ph-pencil-simple-line n4-clr fs-four"></PencilSimpleLineIcon>
              </button>
              <button type="button">
                <TrashIcon weight="bold" className="ph-bold ph-trash act4-clr fs-four"></TrashIcon>
              </button>
            </div>
          </div>
          <div className="payment-method-items gap-3 border-bottom border-top pb-xxl-8 pb-xl-5 pb-4 pt-xxl-8 pt-xl-5 pt-4 d-flex algin-items-center justify-content-between px-xxl-8 px-xl-6 px-sm-5 px-4">
            <div className="d-flex align-items-center gap-xl-6 gap-lg-4 gap-3">
              <Image src={paypalCard} alt="img" className="radius12" />
              <div className="cont">
                <span className="n4-clr fw_600 d-block mb-0">Paypal Express ending in 123</span>
                <span className="n3-clr fs-eight">Expires in 10/2024</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-xl-6 gap-3">
              <button type="button">
                <PencilSimpleLineIcon weight="bold" className="ph-bold ph-pencil-simple-line n4-clr fs-four"></PencilSimpleLineIcon>
              </button>
              <button type="button">
                <TrashIcon weight="bold" className="ph-bold ph-trash act4-clr fs-four"></TrashIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MotionFade>
  );
};

export default PaymentSection;

const paymentMethods = [
  {
    id: 1,
    imgSrc: visaCard,
    alt: "Visa Card",
    description: "**** 1234",
    expiry: "Expires in 10/2024",
  },
  {
    id: 2,
    imgSrc: masterCard,
    alt: "MasterCard",
    description: "Mastercard ending in 1234",
    expiry: "Expires in 03/2026",
  },
  {
    id: 3,
    imgSrc: discoverCard,
    alt: "Discover Card",
    description: "Discover ending in 1234",
    expiry: "Expires in 03/2026",
  },
  {
    id: 4,
    imgSrc: americanCard,
    alt: "American Express",
    description: "American Express ending in 1234",
    expiry: "Expires in 12/2021",
  },
  {
    id: 5,
    imgSrc: paypalCard,
    alt: "PayPal",
    description: "Paypal Express ending in 123",
    expiry: "Expires in 10/2024",
  },
];
