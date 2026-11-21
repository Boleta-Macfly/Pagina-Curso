import { site } from "@/config/site";
import { courses } from "@/content/courses";
import { AnnouncementModal } from "@/components/AnnouncementModal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Contact, Faq, Footer, OnlineWaitlist, Testimonials, WhatsAppFloat } from "@/components/sections/Closing";
import { Courses } from "@/components/sections/Courses";
import { Disciplines } from "@/components/sections/Disciplines";
import { Steps } from "@/components/sections/Steps";
import { Videos } from "@/components/sections/Videos";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    description: site.description,
    sameAs: Object.values(site.social).filter(Boolean),
    hasCourse: courses.map((c) => ({
      "@type": "Course",
      name: c.title,
      description: c.description,
      url: `${site.url}/cursos/${c.slug}`,
      provider: { "@type": "Organization", name: site.name },
    })),
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Brands />
        <Courses />
        <Disciplines />
        <About />
        <Videos />
        <Steps />
        <OnlineWaitlist />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AnnouncementModal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
