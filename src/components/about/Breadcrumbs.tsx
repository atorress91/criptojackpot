import ballBreadcrumbs from "@/../public/images/global/ball-breadcrumbs.png";
import ballShape1 from "@/../public/images/global/ball-shape19-1.png";
import shapeBreadcrumRight from "@/../public/images/global/shape-breadcrum-right.png";
import { CaretDoubleRight } from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import Link from "next/link";

type Props = {
  pageName: string;
};

const Breadcrumbs = ({ pageName }: Props) => {
  return (
    <div className="banner-bredcrumbs pt-70-fixed n4-bg position-relative">
      <div className="container">
        <div className="breadcrumbs-content position-relative cus-z1 pt-120 pb-120 text-center">
          <span className="mb-xxl-8 mb-xl-6 mb-5 display-two nw1-clr" data-aos="zoom-in" data-aos-duration="2000">
            {pageName}
          </span>
          <div className="box">
            <ul className="bread d-flex justify-content-center align-items-center gap-2">
              <li>
                <Link href="/" className="fs20 fw_600 nw1-clr">
                  Home
                </Link>
              </li>
              <li>
                <CaretDoubleRight className="ph ph-caret-double-right nw1-clr"></CaretDoubleRight>
              </li>
              <li>
                <span className="fs20 fw_600 p1-clr">{pageName}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Banner Shape Images--> */}
      <Image src={ballShape1} alt="img" className="ball-shape-breadcrumb" data-aos="zoom-in-right" data-aos-duration="2200" />
      <Image src={ballBreadcrumbs} alt="img" className="ball-circle-breadcrumb" />
      <Image src={shapeBreadcrumRight} alt="img" className="shape-breadcrumbright" />
      {/* <!--Banner Shape Images--> */}
      {/* <CheckLottery /> */}
    </div>
  );
};

export default Breadcrumbs;
