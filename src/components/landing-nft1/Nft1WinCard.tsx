import { ArrowRight, Barbell, BookmarkSimple, Clock, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import MotionFade from "../motionEffect/MotionFade";

type CardProps = {
    id: number;
    drawTime: string;
    image: StaticImageData;
    title: string;
    price: string;
    perEntry: string;
    daysRemaining: string;
    remaining: string;
    sold: string;
    duration: number;
};

const Nft1WinCard = ({ drawTime, image, title, price, perEntry, daysRemaining, remaining, sold }: CardProps) => {
    return (
        <MotionFade className="col-lg-4 col-md-6">
            <div className="current-lottery-itemv13 current-lottery-v13before nw3-border position-relative radius24 n0-bg p-xxl-6 p-xl-4 p-3">
                <div className="thumb cus-z1 position-relative radius24 overflow-hidden">
                    <div className="current-l-badge cus-z1 d-flex align-items-center justify-content-between pe-xxl-5 pe-4">
            <span className="cmn-draw-badge d-inline-blog act3-bg py-2 ps-xxl-5 ps-3 pe-8">
              <span className="n4-clr position-relative fw_700 fs-eight">{drawTime}</span>
            </span>
                    </div>
                    <div className="cart-added d-grid align-items-center gap-xxl-3 gap-2">
                        <Link href="#" className="cmn-60 act3-bg d-center radius-circle n0-hover">
                            <BookmarkSimple weight="bold" className="ph-bold ph-bookmark-simple n4-clr fs-five" />
                        </Link>
                        <Link href="basket" className="cmn-60 act3-bg d-center radius-circle n0-hover">
                            <ShoppingCart weight="bold" className="ph ph-bold ph-shopping-cart n4-clr fs-five" />
                        </Link>
                    </div>
                    <Image src={image} alt="img" className="w-100" />
                </div>
                <div className="content-middle pt-xxl-6 pt-sm-4 pt-4">
                    <div className="d-flex flex-wrap align-items-center justify-content-between pb-xxl-3 pb-sm-3 pb-2 gap-3">
                        <h4>
                            <Link href="contest-details" className="n4-clr fw_700 act4-texthover">
                                {title}
                            </Link>
                        </h4>
                        <Link href="contest-details" className="kewta-btn kewta-44 d-inline-flex align-items-center">
                            <div className="kew-arrow kew-rotate n4-bg">
                                <div className="kt-one">
                                    <ArrowRight className="ti ti-arrow-right n0-clr" />
                                </div>
                                <div className="kt-two">
                                    <ArrowRight className="ti ti-arrow-right n0-clr" />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <h3 className="d-flex align-items-center gap-3 n4-clr mb-xxl-4 mb-3">
                        <span className="pr fw_700">{price}</span>
                        <span className="fs-six text-uppercase">{perEntry}</span>
                    </h3>
                    <div className="border-top" />
                    <ul className="remaining-info py-xxl-3 py-3 d-flex align-items-center gap-xxl-5 gap-lg-3 gap-2">
                        <li className="d-flex align-items-center gap-2">
                            <Clock className="ph ph-clock fs-five n3-clr" />
                            <span className="n3-clr fw_600">{daysRemaining}</span>
                        </li>
                        <li className="vline-remaing" />
                        <li className="d-flex align-items-center gap-2">
                            <Barbell className="ph ph-barbell fs-five n3-clr" />
                            <span className="n3-clr fw_600">{remaining}</span>
                        </li>
                    </ul>
                    <div className="border-top" />
                    <div className="cmn-prrice-range mt-xxl-4 mt-3 d-grid align-items-center gap-2">
                        <span className="n4-clr soldout fw_700 fs-eight mb-1">{sold}</span>
                        <div className="range-custom position-relative">
                            <span className="curs-range" />
                        </div>
                    </div>
                </div>
            </div>
        </MotionFade>
    );
};

export default Nft1WinCard;
