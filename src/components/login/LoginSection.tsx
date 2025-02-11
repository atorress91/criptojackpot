"use client";
import loginImage from "@/../public/images/background/back-login.png";
import logoBlack from "@/../public/images/logo/cripto-jackpot-logo.png";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LoginSection = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <section className="login-section position-relative">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4">
            <div className="left-logwrap d-center">
              <div className="authentication-cmn">
                <div className="container">
                  <Link href="/" className="pb-50 mb-xxl-10 d-block">
                    <Image src={logoBlack} alt="img" />
                  </Link>
                </div>
                <div className="log-title mb-xxl-10 mb-xl-7 mb-6">
                  <h3 className="mb-xxl-6 mb-4">Sign in to Minimal</h3>
                  <span className="n3-clr">
                    New user?{" "}
                    <Link href="/register" className="s1-clr s1-texthover">
                      Create an account
                    </Link>
                  </span>
                </div>
                <form action="#0" className="form-cmn-action">
                  <div className="row g-6">
                    <div className="col-lg-12">
                      <div className="form-cmn">
                        <input type="email" placeholder="Email address" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-cmn">
                        <div className="ps-grp position-relative">
                          <input type={`${isPasswordShow ? "text" : "password"}`} id="password-field" name="password" className="password-field" placeholder="Enter Your Password..." />

                          {!isPasswordShow ? (
                            <EyeSlash className="far fa-eye-slash field-icon toggle-password eye-icon" onClick={() => setIsPasswordShow(!isPasswordShow)}></EyeSlash>
                          ) : (
                            <Eye className="far fa-eye-slash field-icon toggle-password eye-icon" onClick={() => setIsPasswordShow(!isPasswordShow)}></Eye>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link href="#" className="d-flex text-decoration-underline act4-texthover justify-content-end fw_600 n4-clr fs-eight mt-xxl-6 mt-3">
                      Forget password
                    </Link>
                    <div className="col-lg-12">
                      <button type="button" className="cmn-btn s1-bg radius12 w-100 fw_600 justify-content-center d-inline-flex align-items-center gap-2 py-xxl-4 py-3 px-xl-6 px-5 n0-clr mt-1">
                        <span className="fw_600 n0-clr">Login</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="log-thumbwrap">
              <div className="thumb">
                <Image src={loginImage} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
