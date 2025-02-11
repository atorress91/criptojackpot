import Footer from "@/components/landing-jewellery1/Jewellery1Footer";
import NavbarBlack from "@/components/navbar/NavbarBlack";
import RootLayout from "../layout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      <NavbarBlack />
      <main>{children}</main>
      <Footer />
    </RootLayout>
  );
}
