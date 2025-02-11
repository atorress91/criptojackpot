"use client";
import sectionIcon from "@/../public/images/global/section-icon.png";
import Image from "next/image";
import { useState } from "react";
import MotionFadeDownToTop from "../motionEffect/MotionFadeDownToTop";
import MotionFadeTopToDown from "../motionEffect/MotionFadeTopToDown";
import SingleFaq from "./SingleFaq";
interface Tab {
    id: number;
    title: string;
    questions: string[];
}

const faqData = [
    { question: "How and when are the winners selected?", answer: "The winners are selected randomly every week. The draw takes place on Sunday at 10:00 AM." },
    { question: "Can I see the draw live?", answer: "Yes, you can watch the draw live on our website or through our social media channels." },
    { question: "How will I be notified if I win?", answer: "If you win any of the car prizes, we will contact you through email or phone to confirm your win." },
];

const tabs = [
    {
        id: 1,
        title: "Ticket Purchasing",
        tab: [
            { question: "How and when are the winners selected?", answer: "The winners are selected randomly every week. The draw takes place on Sunday at 10:00 AM." },
            { question: "Can I see the draw live?", answer: "Yes, you can watch the draw live on our website or through our social media channels." },
            { question: "How will I be notified if I win?", answer: "If you win any of the car prizes, we will contact you through email or phone to confirm your win." },
        ],
    },
    {
        id: 2,
        title: "Draw and Winners",
        tab: [
            { question: "How and when are the winners selected?", answer: "The winners are selected randomly every week. The draw takes place on Sunday at 10:00 AM." },
            { question: "Can I see the draw live?", answer: "Yes, you can watch the draw live on our website or through our social media channels." },
            { question: "How will I be notified if I win?", answer: "If you win any of the car prizes, we will contact you through email or phone to confirm your win." },
        ],
    },
    {
        id: 3,
        title: "Car Prizes",
        tab: [
            { question: "How and when are the winners selected?", answer: "The winners are selected randomly every week. The draw takes place on Sunday at 10:00 AM." },
            { question: "Can I see the draw live?", answer: "Yes, you can watch the draw live on our website or through our social media channels." },
            { question: "How will I be notified if I win?", answer: "If you win any of the car prizes, we will contact you through email or phone to confirm your win." },
        ],
    },
    {
        id: 4,
        title: "Technical Support",
        tab: [
            { question: "How and when are the winners selected?", answer: "The winners are selected randomly every week. The draw takes place on Sunday at 10:00 AM." },
            { question: "Can I see the draw live?", answer: "Yes, you can watch the draw live on our website or through our social media channels." },
            { question: "How will I be notified if I win?", answer: "If you win any of the car prizes, we will contact you through email or phone to confirm your win." },
        ],
    },
];

type Props = {
    bgColor?: boolean;
};

const Faq = ({ bgColor }: Props) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [activeAccordion, setActiveAccordion] = useState<{ [key: number]: number | null }>({});
    const [dropDown, setDropDown] = useState("");
    const toggleAccordion = (tabIndex: number, accordionIndex: number) => {
        setActiveAccordion((prev) => ({
            ...prev,
            [tabIndex]: prev[tabIndex] === accordionIndex ? null : accordionIndex,
        }));
    };

    return (
        <section className={` pt-120 pb-120 ${bgColor ? "question-section" : ""}`}>
            {/* Section Header */}
            <div className="container">
                <div className="row g-xl-4 g-3 justify-content-center mb-xxl-10 mb-xl-8 mb-7">
                    <div className="col-lg-6">
                        <div className="section__title text-center">
                            <MotionFadeTopToDown className="subtitle-head mb-xxl-4 mb-sm-4 mb-3 d-flex justify-content-center flex-wrap align-items-center gap-3" data-aos="zoom-in-up" data-aos-duration="1400">
                                <Image src={sectionIcon} alt="img" />
                                <h5 className="s1-clr fw_700">You Have Questions</h5>
                            </MotionFadeTopToDown>
                            <MotionFadeDownToTop>
                                <h2 className="display-four d-block n4-clr" data-aos="fade-down-left" data-aos-duration="1600">
                                    We Have <span className="act4-clr act4-underline"> Answers </span>
                                </h2>
                            </MotionFadeDownToTop>
                            <p className="n3-clr fs18 mt-xxl-4 mt-3" data-aos="zoom-in-down" data-aos-duration="1800">
                                Do not hesitate to send us an email if you can&apos;t find what you&apos;re looking for.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section Header */}

            {/* Question body */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="question-wrapper1">
                            <div className="singletab">
                                <div className="question-tab mb-xxl-15 mb-xl-10 mb-lg-8 mb-7">
                                    <ul className="tablinks">
                                        {tabs.map((tab, index) => (
                                            <li key={`faq-tab-${index}`} className={`nav-links ${activeTab === index ? "active" : ""}`}>
                                                <button className="tablink" onClick={() => setActiveTab(index)}>
                                                    {tab.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="tabcontents">
                                    {tabs.map((tab, tabIndex) => (
                                        <div key={tabIndex} className={`tabitem ${activeTab === tabIndex ? "active" : ""}`}>
                                            <div className="accordion-section">
                                                {tab.tab?.map(({ question, answer }, index) => (
                                                    <SingleFaq key={`faq-${question}`} id={`faq-${index}${tab.id}`} question={question} answer={answer} dropDown={dropDown} setDropDown={setDropDown} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Question body */}
        </section>
    );
};

export default Faq;
