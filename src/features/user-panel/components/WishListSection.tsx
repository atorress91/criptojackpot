import lc1 from "public/images/lottery/lc1.png";
import lc3 from "public/images/lottery/lc3.png";
import lc4 from "public/images/lottery/lc4.png";
import lc5 from "public/images/lottery/lc5.png";
import { ArrowUpRightIcon, BarbellIcon, BookmarkSimpleIcon, CaretRightIcon, ClockIcon, ShoppingCartIcon, StarIcon, StarHalfIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import MotionFade from "../../../components/motionEffect/MotionFade";
import Link from "next/link";

const WishListSection = () => {
  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8">
      <div className="cmn-box-addingbg win40-ragba border radius24 py-xxl-10 py-xl-8 py-lg-6 py-5 px-xxl-8 px-xl-6 px-sm-5 px-4">
        <h3 className="user-title n4-clr mb-xxl-10 mb-xl-8 mb-lg-6 mb-5">My Wish List</h3>
        <div className="row g-xl-6 g-4">
          {lotteryItems.map((item) => (
            <MotionFade className="col-lg-6 col-md-6" data-aos="zoom-in-up" data-aos-duration={item.aosDuration} key={item.id}>
              <div className="current-lottery-item cmn-cartborder current-bg position-relative radius24">
                <div className="current-l-badge position-relative cus-z1 mb-xxl-10 mb-xl-8 mb-lg-6 mb-4 d-flex align-items-center justify-content-between pt-xxl-5 pt-4 pe-xxl-5 pe-4">
                  <span className="draw-badge n4-clr">
                    <span className="n4-clr position-relative fw_700 fs-eight">{item.drawStatus}</span>
                  </span>
                  <span className="cmn-40 n0-bg radius-circle n0-hover">
                    <ShoppingCartIcon className="ph ph-bold ph-shopping-cart n4-clr fs-six"></ShoppingCartIcon>
                  </span>
                </div>
                <div className="thumb cus-z1 position-relative px-3 mb-xxl-10 mb-xl-8 mb-lg-6 mb-4">
                  <Image src={item.imageSrc} alt="img" />
                </div>
                <div className="content-middle">
                  <div className="cmn-prrice-range px-xxl-6 px-xl-5 px-lg-4 px-3 d-flex align-items-center gap-2">
                    <div className="range-custom position-relative">
                      <span className="curs-range"></span>
                    </div>
                    <span className="n4-clr soldout fw_700 fs-eight">{item.soldStatus}</span>
                  </div>
                  <div className="d-flex px-xxl-6 px-xl-5 px-lg-4 px-3 nw4-bb py-xxl-5 py-sm-4 py-3 flex-wrap gap-3 align-items-center justify-content-between">
                    <div className="box">
                      <h4 className="mb-xxl-3 mb-2">
                        <Link href="#0" className="n4-clr">
                          {item.title}
                        </Link>
                      </h4>
                      <div className="d-flex align-items-center gap-xl-3 gap-2">
                        <ul className="ratting d-flex align-items-center gap-1">
                          <li>
                            <StarIcon weight="fill" className="ph-fill ph-star fs-five act4-clr"></StarIcon>
                          </li>
                          <li>
                            <StarIcon weight="fill" className="ph-fill ph-star fs-five act4-clr"></StarIcon>
                          </li>
                          <li>
                            <StarIcon weight="fill" className="ph-fill ph-star fs-five act4-clr"></StarIcon>
                          </li>
                          <li>
                            <StarIcon weight="fill" className="ph-fill ph-star fs-five act4-clr"></StarIcon>
                          </li>
                          <li>
                            <StarHalfIcon weight="fill" className="ph-fill ph-star-half fs-five act4-clr"></StarHalfIcon>
                          </li>
                        </ul>
                        <span className="n3-clr fw_600">{item.reviews} reviews</span>
                      </div>
                    </div>
                    <span className="cmn-40 radius-circle act4-border n0-fillhover">
                      <BookmarkSimpleIcon weight="bold" className="ph-bold ph-bookmark-simple act4-clr"></BookmarkSimpleIcon>
                    </span>
                  </div>
                  <ul className="remaining-info px-xxl-6 px-xl-5 px-lg-4 px-3 py-xxl-5 py-xl-3 py-2 nw4-bb d-flex align-items-center gap-xxl-5 gap-lg-3 gap-2">
                    <li className="d-flex align-items-center gap-2">
                      <ClockIcon className="ph ph-clock fs-five n3-clr"></ClockIcon>
                      <span className="n3-clr fw_600">{item.daysRemaining} Days</span>
                    </li>
                    <li className="vline-remaing"></li>
                    <li className="d-flex align-items-center gap-2">
                      <BarbellIcon className="ph ph-barbell fs-five n3-clr"></BarbellIcon>
                      <span className="n3-clr fw_600">{item.itemsRemaining} Remaining</span>
                    </li>
                  </ul>
                  <div className="d-flex px-xxl-6 px-xl-5 px-lg-4 px-3 py-xxl-8 py-xl-6 py-lg-4 py-3 align-items-center justify-content-between">
                    <h3 className="d-flex align-items-center gap-3 n4-clr">
                      <span className="pr">{item.price}</span> <span className="fs-six text-uppercase">{item.perEntry}</span>
                    </h3>
                    <Link href="#0" className="cmn-40 radius-circle s1-bg s1-hover">
                      <span>
                        <ArrowUpRightIcon weight="bold" className="ph-bold ph-arrow-up-right n0-clr lh"></ArrowUpRightIcon>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </MotionFade>
          ))}
        </div>
        <ul className="custom-pagination pt-xxl-15 pt-xl-10 pt-8 d-flex align-items-center justify-content-center gap-xxl-3 gap-2">
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg fs20 fw_700">
              1
            </Link>
          </li>
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg fs20 fw_700 active">
              2
            </Link>
          </li>
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg fs20 fw_700">
              3
            </Link>
          </li>
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg">
              <CaretRightIcon className="ph ph-caret-right nw1-clr fs20"></CaretRightIcon>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WishListSection;

const lotteryItems = [
  {
    id: 1,
    drawStatus: "Draw Today",
    soldPercentage: "25%",
    title: "The Fabia Magnum",
    reviews: "0.95",
    daysRemaining: "05",
    itemsRemaining: "1550",
    price: "$17.00",
    perEntry: "PER ENTRY",
    imageSrc: lc4,
    aosDuration: "1600",
    soldStatus: "25% Sold",
  },
  {
    id: 2,
    drawStatus: "Draw Today",
    soldPercentage: "75%",
    title: "Porsche 917 Carrera",
    reviews: "0.90",
    daysRemaining: "01",
    itemsRemaining: "1000",
    price: "$5.00",
    perEntry: "PER ENTRY",
    imageSrc: lc5,
    aosDuration: "1800",
    soldStatus: "75% Sold",
  },
  {
    id: 3,
    drawStatus: "Draw Today",
    soldPercentage: "22%",
    title: "Mini Cooper",
    reviews: "0.75",
    daysRemaining: "07",
    itemsRemaining: "2750",
    price: "$4.00",
    perEntry: "PER ENTRY",
    imageSrc: lc1,
    aosDuration: "2000",
    soldStatus: "22% Sold",
  },
  {
    id: 4,
    drawStatus: "Draw Today",
    soldPercentage: "20%",
    title: "Shelby Cobra",
    reviews: "0.97",
    daysRemaining: "02",
    itemsRemaining: "1200",
    price: "$3.00",
    perEntry: "PER ENTRY",
    imageSrc: lc3,
    aosDuration: "1400",
    soldStatus: "20% Sold",
  },
];
