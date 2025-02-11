import RegisterSection from "@/components/register/RegisterSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Lottery & Giveaway NextJs Template",
  description: "Lottery & Giveaway NextJs Template",
};

const Register = () => {
  return (
    <div>
      <RegisterSection />
    </div>
  );
};

export default Register;
