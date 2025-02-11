"use client";
import loginImage from "@/../public/images/background/back-login.png";
import logoBlack from "@/../public/images/logo/cripto-jackpot-logo.png";
import { useLoginForm } from "@/hooks/useLoginForm";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const LoginSection = () => {
  const {
    formData,
    isPasswordShow,
    isLoading,
    error,
    handleInputChange,
    togglePasswordVisibility,
    handleSubmit
  } = useLoginForm();

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
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="form-cmn-action">
                  <div className="row g-6">
                    <div className="col-lg-12">
                      <div className="form-cmn">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-cmn">
                        <div className="ps-grp position-relative">
                          <input
                            type={isPasswordShow ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="password-field"
                            placeholder="Enter Your Password..."
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer' }}
                            className="position-absolute top-50 end-0 translate-middle-y"
                          >
                            {!isPasswordShow ? (
                              <EyeSlash size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="d-flex text-decoration-underline act4-texthover justify-content-end fw_600 n4-clr fs-eight mt-xxl-6 mt-3"
                    >
                      Forget password
                    </Link>
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="cmn-btn s1-bg radius12 w-100 fw_600 justify-content-center d-inline-flex align-items-center gap-2 py-xxl-4 py-3 px-xl-6 px-5 n0-clr mt-1"
                        disabled={isLoading}
                      >
                        <span className="fw_600 n0-clr">
                          {isLoading ? 'Iniciando sesión...' : 'Login'}
                        </span>
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
                <Image
                  src={loginImage}
                  alt="img"
                  style={{
                    width: '100%',
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;