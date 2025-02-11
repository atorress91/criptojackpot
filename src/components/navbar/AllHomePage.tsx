"use client";
import banner1 from "@/../public/images/banner/banner1.png";
import banner10 from "@/../public/images/banner/banner10.png";
import banner11 from "@/../public/images/banner/banner11.png";
import banner12 from "@/../public/images/banner/banner12.png";
import banner13 from "@/../public/images/banner/banner13.png";
import banner14 from "@/../public/images/banner/banner14.png";
import banner15 from "@/../public/images/banner/banner15.png";
import banner16 from "@/../public/images/banner/banner16.png";
import banner18 from "@/../public/images/banner/banner18.png";
import banner19 from "@/../public/images/banner/banner19.png";
import banner2 from "@/../public/images/banner/banner2.png";
import banner20 from "@/../public/images/banner/banner20.png";
import banner3 from "@/../public/images/banner/banner3.png";
import banner4 from "@/../public/images/banner/banner4.png";
import banner5 from "@/../public/images/banner/banner5.png";
import banner6 from "@/../public/images/banner/banner6.png";
import banner7 from "@/../public/images/banner/banner7.png";
import banner8 from "@/../public/images/banner/banner8.png";
import banner9 from "@/../public/images/banner/banner9.png";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    handleDropDown: (id: string) => void;
    dropdownId: string;
};

const AllHomePage = ({ handleDropDown, dropdownId }: Props) => {
    const path = usePathname();
    const [active, setActive] = useState(false);

    useEffect(() => {
        hrefs.some((href) => {
            if (path === href) {
                setActive(true);
            }
        });
    });

    return (
        <li className="menu-item">
            <div className="d-flex align-items-center" onClick={() => handleDropDown("home")}>
                <button className={`position-relative ${active ? "active" : ""}`}>Home</button> <CaretDown />
            </div>
            <ul className={`sub-menu mega-menu-style ${dropdownId === "home" ? "active-sub-menu" : ""}`}>
                <li className="menu-link">
                    <ul>
                        <li>
                            <Link href="/" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner1} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/" ? "active" : ""}`}> Car V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-car" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner2} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-car" ? "active" : ""}`}> Car V-2 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-realestate1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner11} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-realestate1" ? "active" : ""}`}> Real Estate V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-realestate2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner12} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-realestate2" ? "active" : ""}`}> Real Estate V-1 </span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="landing-bike1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner3} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-bike1" ? "active" : ""}`}> Bike V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-bike2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner4} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-bike2" ? "active" : ""}`}> Bike V-2 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-nft1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner13} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-nft1" ? "active" : ""}`}> NFT V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-nft2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner14} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-nft2" ? "active" : ""}`}> NFT V-2 </span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="landing-bicycle1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner5} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-bicycle1" ? "active" : ""}`}> Bicycle V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-bicycle2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner6} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-bicycle2" ? "active" : ""}`}> Bicycle V-2 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-clothing1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner15} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-clothing1" ? "active" : ""}`}> Clothing V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-clothing2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner16} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-clothing2" ? "active" : ""}`}> Clothing V-2 </span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="landing-jewellery1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner7} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-jewellery1" ? "active" : ""}`}> Jewelry V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-jewellery2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner8} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-jewellery2" ? "active" : ""}`}> Jewelry V-2 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-compitition1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner7} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-compitition1" ? "active" : ""}`}> Game V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-compitition2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner18} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-compitition2" ? "active" : ""}`}> Game V-2 </span>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="landing-electornic1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner9} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-electornic1" ? "active" : ""}`}> Electronic V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-electornic2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner10} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-electornic2" ? "active" : ""}`}> Electronic V-2 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-national1" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner19} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-national1" ? "active" : ""}`}> Lottery V-1 </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="landing-national2" className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                  <Image src={banner20} width={636} alt="" />
                </span>
                                <span className={`mega-span ${path === "/landing-national2" ? "active" : ""}`}> Lottery V-2 </span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    );
};

export default AllHomePage;

const hrefs = [
    "/",
    "/landing-car",
    "/landing-realestate1",
    "/landing-realestate2",
    "/landing-bike1",
    "/landing-bike2",
    "/landing-nft1",
    "/landing-nft2",
    "/landing-bicycle1",
    "/landing-bicycle2",
    "/landing-clothing1",
    "/landing-clothing2",
    "/landing-jewellery1",
    "/landing-jewellery2",
    "/landing-compitition1",
    "/landing-compitition2",
    "/landing-electornic1",
    "/landing-electornic2",
    "/landing-national1",
    "/landing-national2",
];
