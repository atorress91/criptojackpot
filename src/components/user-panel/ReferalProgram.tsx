"use client";
import { CalendarBlank, HandHeart, LinkSimple, UsersFour } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import MotionFade from "../motionEffect/MotionFade";
import MotionFadeDownToTop from "../motionEffect/MotionFadeDownToTop";
import MotionFadeTopToDown from "../motionEffect/MotionFadeTopToDown";

const ReferalProgram = () => {
  const textAreaRef = useRef<HTMLInputElement>(null);

  function copyToClipboard(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
      e.currentTarget.focus();
      toast.success("Link Copied Successfully.");
    }
  }

  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8">
      <MotionFadeTopToDown className="cmn-box-addingbg mb-6 win40-ragba border radius24 py-xxl-10 py-xl-8 py-lg-6 py-5 px-xxl-10 px-xl-8 px-lg-6 px-5">
        <h3 className="user-title n4-clr mb-lg-6 mb-5">Partners:</h3>
        <div className="copy-codearea">
          <div
            className="copy-form d-flex border flex-sm-nowrap flex-wrap radius100 p-2 align-items-center justify-content-sm-between justify-content-center text-sm-start text-center w-100"
            data-copy="true"
          >
            <div className="d-flex align-items-center gap-3 icon-text">
              <span className="c-icon s1-bg radius-circle d-center cmn-48">
                <LinkSimple weight="bold" className="ph-bold ph-link nw1-clr fs-four"></LinkSimple>
              </span>
              <span className="n4-clr fw_600">Referral Link :</span>
            </div>
            <span className="minput">
              <input type="text" value="https:/Lottovibe.com/?ref=albert25" readOnly data-click-select-all className="in-input" ref={textAreaRef} />
            </span>
            <input
              type="submit"
              value="Copy Link"
              className="btn-copy d-center"
              onClick={(e) => {
                copyToClipboard(e);
              }}
            />
          </div>
        </div>
      </MotionFadeTopToDown>
      <MotionFadeDownToTop className="cmn-box-addingbg mb-6 win40-ragba border radius24 py-xxl-10 py-xl-8 py-5 px-xxl-10 px-xl-8 px-5">
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-xl-6 gap-4">
          <Link href="#0" className="deposit-box h-100 w-auto text-center d-center border radius24 d-center py-xxl-8 py-6 px-xxl-18 px-xl-15 px-lg-10 px-6">
            <span className="box">
              <span className="icon m-auto mb-xxl-5 mb-xl-4 mb-lg-3 mb-2 s1-bg radius-circle d-center">
                <UsersFour className="ph ph-users-four fs-two n0-clr"></UsersFour>
              </span>
              <span className="n4-clr fs-three mb-2"> $2956.00 </span>
              <span className="n3-clr fw_600 d-block"> Earned Referral </span>
            </span>
          </Link>
          <Link href="#0" className="deposit-box h-100 w-auto text-center d-center border radius24 d-center py-xxl-8 py-6 px-xxl-18 px-xl-15 px-lg-10 px-6">
            <span className="box">
              <span className="icon m-auto mb-xxl-5 mb-xl-4 mb-lg-3 mb-2 s1-bg radius-circle d-center">
                <HandHeart className="ph ph-hand-heart fs-two n0-clr"></HandHeart>
              </span>
              <span className="n4-clr fs-three mb-2"> $2956.00 </span>
              <span className="n3-clr fw_600 d-block"> Last Month </span>
            </span>
          </Link>
        </div>
      </MotionFadeDownToTop>
      <MotionFade className="cmn-box-addingbg win40-ragba border radius24 pt-xxl-10 pt-xl-8 pt-lg-6 pt-5 pb-5">
        <div className="mb-xxl-10 mb-xl-8 mb-lg-6 mb-5 d-flex align-items-center justify-content-between flex-wrap gap-3 px-xxl-10 px-xl-8 px-5">
          <h3 className="user-title n4-clr">Your Partners:</h3>
          <form action="#0" className="min-maxdate d-flex align-items-center justify-content-between border radius100 py-xxl-3 py-2 px-xxl-6 px-5">
            <input type="text" placeholder="min - max date" />
            <CalendarBlank weight="bold" className="ph-bold ph-calendar-blank"></CalendarBlank>
          </form>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span className="n4-clr fs20 fw_700">Date</span>
                </th>
                <th>
                  <span className="n4-clr fs20 fw_700">Level</span>
                </th>
                <th>
                  <span className="n4-clr fs20 fw_700">Username</span>
                </th>
                <th>
                  <span className="n4-clr fs20 fw_700">Email</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <span className="n3-clr">{row.date}</span>
                  </td>
                  <td>
                    <span className="n3-clr">{row.level}</span>
                  </td>
                  <td>
                    <span className="n3-clr">{row.name}</span>
                  </td>
                  <td>
                    <span className="n3-clr">{row.email}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MotionFade>
      <Toaster />
    </div>
  );
};

export default ReferalProgram;

const tableData = [
  {
    date: "01 April",
    level: "Level_01",
    name: "Ronald Richards",
    email: "tanya.hill@example.com",
  },
  {
    date: "02 April",
    level: "Level_02",
    name: "Ralph Edward",
    email: "nathan.roberts@example.com",
  },
  {
    date: "03 April",
    level: "Level_03",
    name: "Jerome Bell",
    email: "debbie.baker@example.com",
  },
  {
    date: "04 April",
    level: "Level_04",
    name: "Arlene McCoy",
    email: "dolores.chambers@example.com",
  },
  {
    date: "05 April",
    level: "Level_05",
    name: "Savannah Nguyen",
    email: "tanya.hill@example.com",
  },
  {
    date: "01 April",
    level: "Level_01",
    name: "Ronald Richards",
    email: "felicia.reid@example.com",
  },
  {
    date: "06 April",
    level: "Level_06",
    name: "Brooklyn Simmons",
    email: "willie.jennings@example.com",
  },
  {
    date: "07 April",
    level: "Level_07",
    name: "Darrell Steward",
    email: "deanna.curtis@example.com",
  },
  {
    date: "08 April",
    level: "Level_08",
    name: "Kathryn Murphy",
    email: "willie.jennings@example.com",
  },
  {
    date: "09 April",
    level: "Level_09",
    name: "Guy Hawkins",
    email: "dolores.chambers@example.com",
  },
  {
    date: "10 April",
    level: "Level_10",
    name: "Jacob Jones",
    email: "jessica.hanson@example.com",
  },
];
