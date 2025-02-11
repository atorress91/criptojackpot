import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image, { StaticImageData } from "next/image";
import React from "react";
import MotionFade from "../motionEffect/MotionFade";
import Link from "next/link";

interface BlogCardProps {
    imageUrl: StaticImageData;
    date: string;
    title: string;
    description: string;
    link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ imageUrl, date, title, description, link }) => {
    return (
        <MotionFade className="col-lg-6 col-md-6" >
            <div className="blog-items1 blog-v1-hover">
                <div className="boxs">
                    <div className="thumb mb-xxl-6 mb-4">
                        <Image src={imageUrl} alt="blog-img" />
                        <div className="dats d-center">
            <span className="bos">
              <span className="d-block nw1-clr fw_700">{date}</span>
            </span>
                        </div>
                    </div>
                    <div className="content">
                        <h3 className="mb-xxl-4 mb-3">
                            <Link href={link} className="n4-clr">
                                {title}
                            </Link>
                        </h3>
                        <p className="fs18 pra bbd pb-xxl-5 pb-xl-4 pb-3 mb-xxl-6 mb-xl-4 mb-3">{description}</p>
                        <Link href={link} className="kewta-btn d-inline-flex align-items-center">
                            <span className="kew-text n4-bg n0-clr">Read More</span>
                            <div className="kew-arrow n4-bg">
                                <div className="kt-one">
                                    <ArrowRight className="n0-clr" />
                                </div>
                                <div className="kt-two">
                                    <ArrowRight className="n0-clr" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div></MotionFade>
    );
};

export default BlogCard;
