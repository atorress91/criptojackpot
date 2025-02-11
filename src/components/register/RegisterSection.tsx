"use client";
import registerImage from "@/../public/images/background/back-register.png";
import logo from "@/../public/images/logo/cripto-jackpot-logo.png";
import { Country } from "@/interfaces/country";
import { countryService } from "@/services/countryService";
import { CaretRight, Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RegisterSection = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await countryService.getAllCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.id === parseInt(event.target.value));
    setSelectedCountry(country || null);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = event.target.value.replace(/\D/g, '');
    setPhoneNumber(cleaned);
  };

  return (
    <section className="login-section position-relative min-vh-100 d-flex align-items-center">
      <div className="container py-lg-4 py-2">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-4 col-md-8 col-11">
            <div className="left-logwrap">
              <div className="authentication-cmn">
                <Link href="/" className="d-block text-center mb-3">
                  <Image
                    src={logo}
                    alt="logo"
                    className="img-fluid"
                    style={{
                      maxWidth: '180px',
                      height: 'auto',
                      width: '100%'
                    }}
                  />
                </Link>
                <div className="log-title mb-3">
                  <h3 className="mb-2 text-center fs-4">Get started absolutely free</h3>
                  <span className="n3-clr d-block text-center">
                    Already have an account?{" "}
                    <Link href="login" className="s1-clr fw_500 s1-texthover">
                      Sign in
                    </Link>
                  </span>
                </div>
                <form className="form-cmn-action">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="form-cmn">
                        <input type="text" placeholder="First name" className="py-2" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-cmn">
                        <input type="text" placeholder="Last name" className="py-2" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-cmn">
                        <input type="email" placeholder="Email address" className="py-2" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-cmn">
                        <div className="ps-grp position-relative">
                          <input
                            type={isPasswordShow ? "text" : "password"}
                            className="password-field py-2"
                            placeholder="Enter Your Password..."
                          />
                          <span
                            className="position-absolute top-50 end-2 translate-middle-y"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsPasswordShow(!isPasswordShow)}
                          >
                            {!isPasswordShow ? <EyeSlash size={18} /> : <Eye size={18} />}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-cmn">
                        <select
                          title="Country select"
                          className="form-select py-2"
                          onChange={handleCountryChange}
                          value={selectedCountry?.id || ''}
                        >
                          <option value="" disabled>Select Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-cmn">
                        <input type="text" placeholder="Identification" className="py-2" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-cmn">
                        <div className="input-group">
                          <span className="input-group-text">
                            +{selectedCountry?.phoneCode || ''}
                          </span>
                          <input
                            type="tel"
                            placeholder="Phone"
                            className="form-control"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-cmn">
                        <input type="text" placeholder="State" className="py-2" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-cmn">
                        <input type="text" placeholder="City" className="py-2" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-cmn">
                        <input type="text" placeholder="Address" className="py-2" />
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <button
                        type="button"
                        className="w-100 radius12 s1-bg fw_600 nw1-clr d-flex align-items-center justify-content-between py-2 px-3"
                      >
                        Create account
                        <CaretRight size={18} />
                      </button>
                    </div>
                    <div className="col-12">
                      <span className="n3-clr fs-eight d-block text-center">
                        By signup, I agree to <Link href="#" className="n4-clr text-decoration-none">Terms of service and Privacy Policy.</Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-none d-lg-block">
            <div className="log-thumbwrap">
              <div className="thumb">
                <Image
                  src={registerImage}
                  alt="register"
                  style={{
                    width: '100%',
                    height: '100vh',
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

export default RegisterSection;