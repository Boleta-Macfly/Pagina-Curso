import { site } from "@/config/site";
import { courses } from "@/content/courses";
import { AnnouncementModal } from "@/components/AnnouncementModal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Contact, Faq, Footer, OnlineSoon, Testimonials, WhatsAppFloat } from "@/components/sections/Closing";
import { Courses } from "@/components/sections/Courses";
import { StudentsTeaser } from "@/components/sections/StudentsTeaser";
import { Videos } from "@/components/sections/Videos";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.city,
      addressCountry: "PE",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
    telephone: site.advisors.map((a) => `+${a.phone}`),
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
        <Courses />
        <StudentsTeaser />
        <About />
        <Videos />
        <OnlineSoon />
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
