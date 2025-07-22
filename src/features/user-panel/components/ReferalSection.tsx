import {LinkSimpleIcon, CalendarBlankIcon, HandHeartIcon, UsersFourIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const ReferalSection = () => {
  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8">
      <div className="cmn-box-addingbg mb-6 win40-ragba border radius24 py-xxl-10 py-xl-8 py-lg-6 py-5 px-xxl-10 px-xl-8 px-lg-6 px-5">
        <h3 className="user-title n4-clr mb-lg-6 mb-5">Partners:</h3>
        <div className="copy-codearea">
          <form className="d-flex border flex-sm-nowrap flex-wrap radius100 p-2 align-items-center justify-content-sm-between justify-content-center text-sm-start text-center w-100" data-copy="true">
            <div className="d-flex align-items-center gap-3 icon-text">
              <span className="c-icon s1-bg radius-circle d-center cmn-48">
                <LinkSimpleIcon className="ph-bold ph-link nw1-clr fs-four"></LinkSimpleIcon>
              </span>
              <span className="n4-clr fw_600">Referral Link :</span>
            </div>
            <span className="minput">
              <input type="text" value="https:/Lottovibe.com/?ref=albert25" data-click-select-all className="in-input" />
            </span>
            <input type="submit" value="Copy Link" className="btn-copy d-center" />
          </form>
        </div>
      </div>
      <div className="cmn-box-addingbg mb-6 win40-ragba border radius24 py-xxl-10 py-xl-8 py-5 px-xxl-10 px-xl-8 px-5">
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-xl-6 gap-4">
          <Link href="#0" className="deposit-box h-100 w-auto text-center d-center border radius24 d-center py-xxl-8 py-6 px-xxl-18 px-xl-15 px-lg-10 px-6">
            <span className="box">
              <span className="icon m-auto mb-xxl-5 mb-xl-4 mb-lg-3 mb-2 s1-bg radius-circle d-center">
                <UsersFourIcon className="ph ph-users-four fs-two n0-clr"></UsersFourIcon>
              </span>
              <span className="n4-clr fs-three mb-2"> $2956.00 </span>
              <span className="n3-clr fw_600"> Earned Referral </span>
            </span>
          </Link>
          <Link href="#0" className="deposit-box h-100 w-auto text-center d-center border radius24 d-center py-xxl-8 py-6 px-xxl-18 px-xl-15 px-lg-10 px-6">
            <span className="box">
              <span className="icon m-auto mb-xxl-5 mb-xl-4 mb-lg-3 mb-2 s1-bg radius-circle d-center">
                <HandHeartIcon className="ph ph-hand-heart fs-two n0-clr"></HandHeartIcon>
              </span>
              <span className="n4-clr fs-three mb-2"> $2956.00 </span>
              <span className="n3-clr fw_600"> Last Month </span>
            </span>
          </Link>
        </div>
      </div>
      <div className="cmn-box-addingbg win40-ragba border radius24 pt-xxl-10 pt-xl-8 pt-lg-6 pt-5 pb-5">
        <div className="mb-xxl-10 mb-xl-8 mb-lg-6 mb-5 d-flex align-items-center justify-content-between flex-wrap gap-3 px-xxl-10 px-xl-8 px-5">
          <h3 className="user-title n4-clr">Your Partners:</h3>
          <form action="#0" className="min-maxdate d-flex align-items-center justify-content-between border radius100 py-xxl-3 py-2 px-xxl-6 px-5">
            <input type="text" placeholder="min - max date" />
            <CalendarBlankIcon className="ph-bold ph-calendar-blank"></CalendarBlankIcon>
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
              <tr>
                <td>
                  <span className="n3-clr">01 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_01</span>
                </td>
                <td>
                  <span className="n3-clr">Ronald Richards</span>
                </td>
                <td>
                  <span className="n3-clr">tanya.hill@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">02 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_02</span>
                </td>
                <td>
                  <span className="n3-clr">Ralph Edward</span>
                </td>
                <td>
                  <span className="n3-clr">nathan.roberts@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">03 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_03</span>
                </td>
                <td>
                  <span className="n3-clr">Jerome Bell</span>
                </td>
                <td>
                  <span className="n3-clr">debbie.baker@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">04 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_04</span>
                </td>
                <td>
                  <span className="n3-clr">Arlene McCoy</span>
                </td>
                <td>
                  <span className="n3-clr">dolores.chambers@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">05 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_05</span>
                </td>
                <td>
                  <span className="n3-clr">Savannah Nguyen</span>
                </td>
                <td>
                  <span className="n3-clr">tanya.hill@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">01 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_01</span>
                </td>
                <td>
                  <span className="n3-clr">Ronald Richards</span>
                </td>
                <td>
                  <span className="n3-clr">felicia.reid@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">06 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_06</span>
                </td>
                <td>
                  <span className="n3-clr">Brooklyn Simmons</span>
                </td>
                <td>
                  <span className="n3-clr">willie.jennings@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">07 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_07</span>
                </td>
                <td>
                  <span className="n3-clr">Darrell Steward</span>
                </td>
                <td>
                  <span className="n3-clr">deanna.curtis@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">08 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_08</span>
                </td>
                <td>
                  <span className="n3-clr">Kathryn Murphy</span>
                </td>
                <td>
                  <span className="n3-clr">willie.jennings@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">09 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_09</span>
                </td>
                <td>
                  <span className="n3-clr">Guy Hawkins</span>
                </td>
                <td>
                  <span className="n3-clr">dolores.chambers@example.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="n3-clr">10 April</span>
                </td>
                <td>
                  <span className="n3-clr">Level_10</span>
                </td>
                <td>
                  <span className="n3-clr">Jacob Jones</span>
                </td>
                <td>
                  <span className="n3-clr">jessica.hanson@example.com</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferalSection;
