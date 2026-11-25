import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { content } from "@/data/content";

/** schema.org Person data so search engines understand who the site is about. */
function personJsonLd() {
  const { site, skills, timeline } = content;
  const university = timeline.find((t) => t.type === "education" && /university|institute|college of/i.test(t.org));
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.title.join(" ").replace(/\.$/, ""),
    description: site.description,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    ...(university ? { alumniOf: { "@type": "CollegeOrUniversity", name: university.org } } : {}),
    sameAs: Object.values(site.socials).filter(Boolean),
    knowsAbout: skills.slice(0, 15).map((s) => s.name),
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
      >
        Skip to content
      </a>
      <Navbar nav={content.nav} siteName={content.site.name} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Timeline />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
