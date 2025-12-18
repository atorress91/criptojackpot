import icon from '@/../public/images/global/section-icon.png';
import nft1 from '@/../public/images/man-global/nf1.png';
import nft2 from '@/../public/images/man-global/nf2.png';
import nft3 from '@/../public/images/man-global/nf3.png';
import nft4 from '@/../public/images/man-global/nf4.png';
import nft5 from '@/../public/images/man-global/nf5.png';
import nft6 from '@/../public/images/man-global/nf6.png';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import MotionFadeDownToTop from '../motionEffect/MotionFadeDownToTop';
import MotionFadeTopToDown from '../motionEffect/MotionFadeTopToDown';
import Nft1WinCard from './Nft1WinCard';

const Nft1WinProduct = () => {
  return (
    <section className="current-lotteryv13 pt-120 pb-120">
      <div className="container">
        {/* <!--Section Header--> */}
        <div className="row g-xl-4 g-3 align-items-center justify-content-between mb-xxl-15 mb-xl-10 mb-8">
          <div className="col-lg-6 col-md-8 col-sm-8">
            <div className="section__title text-sm-start text-center mb-lg-0 mb-4">
              <MotionFadeTopToDown className="subtitle-head mb-xxl-4 mb-sm-4 mb-3 d-flex flex-wrap align-items-center justify-content-sm-start justify-content-center gap-3">
                <Image src={icon} alt="img" />
                <h5 className="s1-clr fw_700">Try your chance at winning</h5>
              </MotionFadeTopToDown>
              <MotionFadeDownToTop>
                <h3 className="display-four d-block n4-clr">
                  Current{' '}
                  <span className="act4-clr act4-underline" data-aos="zoom-in-left" data-aos-duration="1000">
                    Lottery{' '}
                  </span>
                  <span className="d-block" data-aos="zoom-in-right" data-aos-duration="1200">
                    Offering
                  </span>
                </h3>
              </MotionFadeDownToTop>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
            <div className="browse-more" data-aos="zoom-in" data-aos-duration="2000">
              <Link
                href="contest"
                className="cmn__collection radius-circle act3-bg d-center position-relative ms-lg-auto"
              >
                <span className="cmn-cont-box text-center position-relative">
                  <span className="icon mb-1">
                    <ArrowUpRightIcon
                      weight="bold"
                      className="ph-bold ph-arrow-up-right n4-clr fs-three"
                    ></ArrowUpRightIcon>
                  </span>
                  <span className="d-block n4-clr fw_700">Browse More</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* <!--Section Header--> */}

        {/* <!--win lottery body--> */}

        <div className="row g-6">
          {contestData.map(contest => (
            <Nft1WinCard key={`nft-1-win-product-${contest.id}`} {...contest} />
          ))}
        </div>
        {/* <!--win lottery body--> */}
      </div>
    </section>
  );
};

export default Nft1WinProduct;

export const contestData = [
  {
    id: 1,
    drawTime: 'Draw Wednesday 8pm',
    image: nft1,
    title: 'Digital Dreamscapes',
    price: '$1.00',
    perEntry: 'PER ENTRY',
    daysRemaining: '02 Days',
    remaining: '1050 Remaining',
    sold: '35% Sold',
    duration: 1000,
  },
  {
    id: 2,
    drawTime: 'Draw Wednesday 8pm',
    image: nft2,
    title: 'Dreamy Imaginations',
    price: '$0.70',
    perEntry: 'PER ENTRY',
    daysRemaining: '05 Days',
    remaining: '1990 Remaining',
    sold: '25% Sold',
    duration: 1200,
  },
  {
    id: 3,
    drawTime: 'Draw Wednesday 8pm',
    image: nft3,
    title: 'Futuristic Realism',
    price: '$0.50',
    perEntry: 'PER ENTRY',
    daysRemaining: '02 Days',
    remaining: '1670 Remaining',
    sold: '60% Sold',
    duration: 1400,
  },
  {
    id: 4,
    drawTime: 'Draw Wednesday 8pm',
    image: nft4,
    title: 'Depressed Dragons',
    price: '$6.65',
    perEntry: 'PER ENTRY',
    daysRemaining: '06 Days',
    remaining: '1050 Remaining',
    sold: '15% Sold',
    duration: 1600,
  },
  {
    id: 5,
    drawTime: 'Draw Wednesday 8pm',
    image: nft5,
    title: 'Crypto Felines',
    price: '$0.45',
    perEntry: 'PER ENTRY',
    daysRemaining: '01 Days',
    remaining: '1110 Remaining',
    sold: '95% Sold',
    duration: 1800,
  },
  {
    id: 6,
    drawTime: 'Draw Wednesday 8pm',
    image: nft6,
    title: 'Spells of Genesis',
    price: '$2.00',
    perEntry: 'PER ENTRY',
    daysRemaining: '03 Days',
    remaining: '750 Remaining',
    sold: '50% Sold',
    duration: 2000,
  },
];
