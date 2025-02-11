import image from "@/../public/images/howit/how14.png";
import BlogSection from "@/components/home-one/BlogSection";
import Faq from "@/components/home-one/Faq";
import Jewellery1CallToAction from "@/components/landing-jewellery1/Jewellery1CallToAction";
import Jewellery1Footer from "@/components/landing-jewellery1/Jewellery1Footer";
import Nft1WinProduct from "@/components/landing-nft1/Nft1WinProduct";
import Nft2Banner from "@/components/landing-nft2/Nft2Banner";
import Nft2HowItWork from "@/components/landing-nft2/Nft2HowItWork";
import Nft2Testimonial from "@/components/landing-nft2/Nft2Testimonial";
import NavbarBlack from "@/components/navbar/NavbarBlack";
import { Metadata } from "next";
import { nft1data } from "../../../../public/data/nft1PageData";

export const metadata: Metadata = {
    title: "Landing NFT Two - Lottery & Giveaway NextJs Template",
    description: "Lottery & Giveaway NextJs Template",
};

const LandingPage = () => {
    return (
        <div>
            <NavbarBlack />
            <Nft2Banner />
            <Nft2HowItWork />
            <Nft1WinProduct />
            <Jewellery1CallToAction image={image} />
            <Nft2Testimonial />
            <BlogSection sectionBg blogCardsData={nft1data} />
            <Faq />
            <Jewellery1Footer />
        </div>
    );
};

export default LandingPage;
