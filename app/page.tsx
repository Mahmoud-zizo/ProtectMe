import CardsGrid from "@/components/CardsGrid";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import { auth } from "@/auth";
import ProtectMeInNumbers from "@/components/ProtectMeInNumbers";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <Navbar session={session} />
      <main>
        <Hero />
        <AboutUs />
        <CardsGrid />
        <ProtectMeInNumbers />
        <Banner />
      </main>
      <Footer />
    </div>
  );
}
