import LoginSection from "@/features/auth/components/LoginSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Lottery & Giveaway NextJs Template",
  description: "Lottery & Giveaway NextJs Template",
};
const Login = () => {
  return (
    <div>
      <LoginSection />
    </div>
  );
};

export default Login;
