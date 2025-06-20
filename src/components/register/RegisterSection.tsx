'use client';
import registerImage from '@/../public/images/background/back-register.png';
import logo from '@/../public/images/logo/cripto-jackpot-logo.png';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { CaretRight, Eye, EyeSlash } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';

const RegisterSection = () => {
  const {
    formData,
    countries,
    selectedCountry,
    isPasswordShow,
    isLoading,
    error,
    handleInputChange,
    handleCountryChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useRegisterForm();

  return (
    <section className="login-section position-relative min-vh-100 d-flex align-items-center overflow-hidden">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center min-vh-100 g-0">
          {/* Form Column */}
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4 order-2 order-lg-1">
            <div className="left-logwrap h-100 d-flex align-items-center py-4 py-md-5">
              <div className="authentication-cmn w-100 px-3 px-sm-4 px-md-5 px-lg-4 px-xl-5">
                {/* Logo */}
                <Link href="/" className="d-block text-center mb-4">
                  <div className="d-flex justify-content-center">
                    <Image
                      src={logo}
                      alt="logo"
                      className="img-fluid"
                      style={{
                        maxWidth: '120px',
                        height: 'auto',
                      }}
                    />
                  </div>
                </Link>

                {/* Title */}
                <div className="log-title mb-4 text-center">
                  <h3 className="fs-5 fs-sm-4 mb-2">Get started absolutely free</h3>
                  <span className="n3-clr d-block fs-6">
                    Already have an account?{' '}
                    <Link href="/login" className="s1-clr fw_500 s1-texthover">
                      Sign in
                    </Link>
                  </span>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form className="form-cmn-action" onSubmit={handleSubmit}>
                  <div className="row g-2 g-sm-3">
                    {/* Name Fields */}
                    <div className="col-12 col-sm-6">
                      <div className="form-cmn">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Name"
                          className="py-2 w-100"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-cmn">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className="py-2 w-100"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-12">
                      <div className="form-cmn">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email address"
                          className="py-2 w-100"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-12">
                      <div className="form-cmn">
                        <div className="ps-grp position-relative">
                          <input
                            type={isPasswordShow ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="password-field py-2 w-100 pe-5"
                            placeholder="Enter Your Password..."
                            required
                          />
                          <span
                            className="position-absolute top-50 translate-middle-y"
                            style={{
                              cursor: 'pointer',
                              right: '15px',
                              zIndex: 10,
                            }}
                            onClick={togglePasswordVisibility}
                          >
                            {!isPasswordShow ? (
                              <EyeSlash size={18} className="n4-clr" />
                            ) : (
                              <Eye size={18} className="n4-clr" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Country */}
                    <div className="col-12">
                      <div className="form-cmn">
                        <select
                          title="Country select"
                          className="form-select py-2 w-100"
                          onChange={handleCountryChange}
                          value={selectedCountry?.id || ''}
                          required
                        >
                          <option value="" disabled>
                            Select Country
                          </option>
                          {countries.map(country => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Identification and Phone */}
                    <div className="col-12 col-sm-6">
                      <div className="form-cmn">
                        <input
                          type="text"
                          name="identification"
                          value={formData.identification}
                          onChange={handleInputChange}
                          placeholder="Identification"
                          className="py-2 w-100"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-cmn">
                        <div className="input-group">
                          <span className="input-group-text px-2 px-sm-3">+{selectedCountry?.phoneCode || ''}</span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    {/* State and City */}
                    <div className="col-12 col-sm-6">
                      <div className="form-cmn">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className="py-2 w-100"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-cmn">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className="py-2 w-100"
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <div className="form-cmn">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Address"
                          className="py-2 w-100"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 mt-3">
                      <button
                        type="submit"
                        className="w-100 radius12 s1-bg fw_600 nw1-clr d-flex align-items-center justify-content-between py-2 px-3"
                        disabled={isLoading}
                      >
                        <span className="fs-6 fs-sm-5">{isLoading ? 'Creating account...' : 'Create account'}</span>
                        <CaretRight size={18} />
                      </button>
                    </div>

                    {/* Terms */}
                    <div className="col-12 mt-2">
                      <span className="n3-clr fs-eight d-block text-center">
                        By signup, I agree to{' '}
                        <Link href="#" className="n4-clr text-decoration-none">
                          Terms of service and Privacy Policy.
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Image Column - Hidden on mobile */}
          <div className="col-lg-7 col-xl-8 d-none d-lg-block order-1 order-lg-2">
            <div className="log-thumbwrap h-100">
              <div className="thumb h-100 position-relative">
                <Image
                  src={registerImage}
                  alt="register"
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Background Image */}
      <div className="d-lg-none position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: -1 }}>
        <Image
          src={registerImage}
          alt="register background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.1,
          }}
        />
      </div>
    </section>
  );
};

export default RegisterSection;
