import { SiteProvider } from "@/components/providers/SiteProvider";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { IndexMenu } from "@/components/layout/IndexMenu";
import { FloatingReserve } from "@/components/layout/FloatingReserve";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Ritual } from "@/components/sections/Ritual";
import { MenuSection } from "@/components/sections/MenuSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { Space } from "@/components/sections/Space";
import { Gallery } from "@/components/sections/Gallery";
import { Community } from "@/components/sections/Community";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <SiteProvider>
      <Preloader />
      <ScrollProgress />
      <Nav />
      <IndexMenu />
      <main>
        <Hero />
        <Manifesto />
        <Ritual />
        <MenuSection />
        <Philosophy />
        <Space />
        <Gallery />
        <Community />
        <Visit />
      </main>
      <Footer />
      <FloatingReserve />
    </SiteProvider>
  );
}
