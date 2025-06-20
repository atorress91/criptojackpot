"use client";
import { Check, Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import MotionFade from "../motionEffect/MotionFade";

const PersonalInfoSection = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  return (
    <MotionFade className="col-xxl-9 col-xl-8 col-lg-8">
      <div className="cmn-box-addingbg win40-ragba border radius24 py-xxl-10 py-xl-8 py-lg-6 py-5 px-xxl-8 px-xl-6 px-sm-5 px-4">
        <h3 className="user-title n4-clr mb-xxl-10 mb-xl-8 mb-lg-6 mb-5">Personal Details</h3>
        <form action="#0" className="ch-form-one">
          <div className="row g-6">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="ch-form-items">
                <label htmlFor="name1" className="text-capitalize fs18 fw_600 n3-clr mb-xxl-4 mb-xl-3 mb-2">
                  First Name
                </label>
                <input id="name1" type="text" placeholder="First Name" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="ch-form-items">
                <label htmlFor="lname1" className="text-capitalize fs18 fw_600 n3-clr mb-xxl-4 mb-xl-3 mb-2">
                  Last Name
                </label>
                <input id="lname1" type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="ch-form-items">
                <label htmlFor="eml" className="text-capitalize fs18 fw_600 n3-clr mb-xxl-4 mb-xl-3 mb-2">
                  Email Address
                </label>
                <input id="eml" type="email" placeholder="Email" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="ch-form-items">
                <label htmlFor="phs" className="text-capitalize fs18 fw_600 n3-clr mb-xxl-4 mb-xl-3 mb-2">
                  Phone Number
                </label>
                <input id="phs" type="number" placeholder="+270" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="ch-form-items">
                <label htmlFor="password-field" className="text-capitalize fs18 fw_600 n3-clr mb-xxl-4 mb-xl-3 mb-2">
                  New Password
                </label>
                <div className="ps-grp position-relative">
                  <input type={`${isPasswordShow ? "text" : "password"}`} id="password-field" name="password" className="password-field" placeholder="New Password" />
                  {!isPasswordShow ? (
                    <EyeSlash className="far fa-eye-slash field-icon toggle-password eye-icon" onClick={() => setIsPasswordShow(!isPasswordShow)}></EyeSlash>
                  ) : (
                    <Eye className="far fa-eye-slash field-icon toggle-password eye-icon" onClick={() => setIsPasswordShow(!isPasswordShow)}></Eye>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="ch-form-items">
                <label htmlFor="password-field2" className="text-capitalize fs18 fw_600 n3-clr mb-xxl-4 mb-xl-3 mb-2">
                  Confirm Password
                </label>
                <div className="ps-grp position-relative">
                  <input type={`${isConfirmPasswordShow ? "text" : "password"}`} id="password-field2" name="password" className="password-field" placeholder="Confirm Password" />
                  {!isConfirmPasswordShow ? (
                    <EyeSlash className="far fa-eye-slash field-icon toggle-password eye-icon" onClick={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)}></EyeSlash>
                  ) : (
                    <Eye className="far fa-eye-slash field-icon toggle-password eye-icon" onClick={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)}></Eye>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="border-top d-flex align-items-center justify-content-between pt-xxl-8 pt-6 mt-xxl-8 mt-6">
          <div className="ch-condition">
            <label className="checkbox-single">
              <input type="checkbox" name="checkbox" className="d-none" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
              <span className="checkmark d-center">{isChecked && <Check />}</span>
              <span className="fs-seven fw_600 title-item">Subscribe me to Newsletter</span>
            </label>
          </div>
          <button type="button" className="kewta-btn kewta-alt d-inline-flex align-items-center " data-aos="zoom-in-right" data-aos-duration="1000">
            <span className="kew-text act4-bg nw1-clr act3-bg">Update Profile</span>
          </button>
        </div>
      </div>
    </MotionFade>
  );
};

export default PersonalInfoSection;
