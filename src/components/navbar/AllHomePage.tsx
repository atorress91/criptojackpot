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
import {CaretDownIcon} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";

type Props = {
    handleDropDown: (id: string) => void;
    dropdownId: string;
};

interface MenuItem {
    href: string;
    banner: any;
    title: string;
}

interface MenuColumn {
    id: string;
    items: MenuItem[];
}

const AllHomePage = ({handleDropDown, dropdownId}: Props) => {
    const path = usePathname();
    const [active, setActive] = useState(false);

    useEffect(() => {
        const isActiveRoute = hrefs.includes(path);
        setActive(isActiveRoute);
    }, [path]);

    const renderMenuItem = ({href, banner, title}: MenuItem) => (
        <li key={href}>
            <Link href={href} className="mega-menu-link">
                <span className="mega-menu-thumb d-none d-xl-block">
                    <Image src={banner} width={636} alt=""/>
                </span>
                <span className={`mega-span ${isPathActive(href)}`}>
                    {title}
                </span>
            </Link>
        </li>
    );

    const isPathActive = (href: string) => path === href ? "active" : "";

    const getMenuColumns = (): MenuColumn[] => [
        {
            id: "car-realestate-column",
            items: [
                {href: "/", banner: banner1, title: "Car V-1"},
                {href: "/landing-car", banner: banner2, title: "Car V-2"},
                {href: "/landing-realestate1", banner: banner11, title: "Real Estate V-1"},
                {href: "/landing-realestate2", banner: banner12, title: "Real Estate V-2"},
            ]
        },
        {
            id: "bike-nft-column",
            items: [
                {href: "/landing-bike1", banner: banner3, title: "Bike V-1"},
                {href: "/landing-bike2", banner: banner4, title: "Bike V-2"},
                {href: "/landing-nft1", banner: banner13, title: "NFT V-1"},
                {href: "/landing-nft2", banner: banner14, title: "NFT V-2"},
            ]
        },
        {
            id: "bicycle-clothing-column",
            items: [
                {href: "/landing-bicycle1", banner: banner5, title: "Bicycle V-1"},
                {href: "/landing-bicycle2", banner: banner6, title: "Bicycle V-2"},
                {href: "/landing-clothing1", banner: banner15, title: "Clothing V-1"},
                {href: "/landing-clothing2", banner: banner16, title: "Clothing V-2"},
            ]
        },
        {
            id: "jewelry-game-column",
            items: [
                {href: "/landing-jewellery1", banner: banner7, title: "Jewelry V-1"},
                {href: "/landing-jewellery2", banner: banner8, title: "Jewelry V-2"},
                {href: "/landing-compitition1", banner: banner7, title: "Game V-1"},
                {href: "/landing-compitition2", banner: banner18, title: "Game V-2"},
            ]
        },
        {
            id: "electronic-lottery-column",
            items: [
                {href: "/landing-electornic1", banner: banner9, title: "Electronic V-1"},
                {href: "/landing-electornic2", banner: banner10, title: "Electronic V-2"},
                {href: "/landing-national1", banner: banner19, title: "Lottery V-1"},
                {href: "/landing-national2", banner: banner20, title: "Lottery V-2"},
            ]
        },
    ];

    const getButtonClassName = () => `d-flex align-items-center position-relative ${active ? "active" : ""}`;
    const getSubMenuClassName = () => `sub-menu mega-menu-style ${dropdownId === "home" ? "active-sub-menu" : ""}`;

    return (
        <li className="menu-item">
            <button
                className={getButtonClassName()}
                onClick={() => handleDropDown("home")}
                aria-expanded={dropdownId === "home"}
                aria-haspopup="menu"
                type="button"
            >
                Home
                <CaretDownIcon/>
            </button>
            <ul className={getSubMenuClassName()}>
                <li className="menu-link">
                    {getMenuColumns().map((column) => (
                        <ul key={column.id}>
                            {column.items.map(renderMenuItem)}
                        </ul>
                    ))}
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