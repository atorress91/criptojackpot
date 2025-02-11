"use client";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import AnimateHeight from "react-animate-height";

const SingleFaq = ({ id, question, answer, dropDown, setDropDown }: { id: string; question: string; answer: string; dropDown: string; setDropDown: React.Dispatch<React.SetStateAction<string>> }) => {
    const handleDropDown = (id: string) => {
        if (dropDown === id) {
            setDropDown("");
        } else {
            setDropDown(id);
        }
    };
    return (
        <div className={`accordion-single ${dropDown === id ? "active" : ""}`}>
            <h5 className="header-area">
                <button className="accordion-btn d-flex justify-content-between w-100" type="button" onClick={() => handleDropDown(id)}>
                    <span className="fs20 fw_700 n4-clr d-block">{question}</span>
                    <span className="faq-icon">
            <CaretDown className="ph-bold ph-caret-down n4-clr" size={24} />
          </span>
                </button>
            </h5>
            <AnimateHeight duration={500} height={dropDown === id ? "auto" : 0} aria-label={`example-panel-${id}`}>
                <div className={`content-area`}>
                    <div className="content-body">
                        <p>{answer}</p>
                    </div>
                </div>
            </AnimateHeight>
        </div>
    );
};

export default SingleFaq;
