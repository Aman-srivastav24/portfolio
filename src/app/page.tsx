import Header from "@/components/Header";
import HeroStats from "@/components/HeroStats";
import ProjectShowcase from "@/components/ProjectShowcase";
import MobileDetails from "@/components/MobileDetails";
import RotatingWords from "@/components/RotatingWords";
import Reveal from "@/components/Reveal";
import ScrollWords from "@/components/ScrollWords";
import StackedWork from "@/components/StackedWork";
import CursorTrail from "@/components/CursorTrail";
import { archive, education, experience, freelance, profile, projects, skillset, toolbelt } from "@/data/portfolio";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-label font-medium text-muted">({children})</p>;
}

function RisingWord({ word, offset }: { word: string; offset: number }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      {word.split("").map((ch, i) => (
        <span key={i} className="rise" style={{ "--i": offset + i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex flex-col justify-end px-4 pb-10 pt-24 md:min-h-svh sm:px-8 sm:pb-12 [&>*]:mx-auto [&>*]:w-full [&>*]:max-w-[1600px]"
    >
      <CursorTrail />
      <div className="mb-auto flex flex-wrap items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {profile.availability}
        </span>
        <span className="text-label text-muted">{profile.location}</span>
      </div>

      <div className="mt-12 flex flex-col gap-10 xl:flex-row xl:items-end xl:gap-[clamp(3rem,5vw,7rem)]">
        <h1 aria-label={profile.name} className="font-display text-hero font-medium">
          <RisingWord word={profile.firstName} offset={0} />
          <br />
          <span className="whitespace-nowrap">
            <RisingWord word={profile.lastName} offset={profile.firstName.length} />
            <span className="rise text-accent" style={{ "--i": profile.name.length } as React.CSSProperties}>
              .
            </span>
          </span>
        </h1>
        <div className="flex flex-col gap-10 xl:flex-1 xl:gap-12 xl:pb-[0.6vw]">
          <Reveal delay={300}>
            <p className="text-label font-medium text-muted">(What I do)</p>
            <p className="mt-3 font-display text-[clamp(1.75rem,3vw,3.25rem)] font-medium leading-[1.05] tracking-tight">
              I design &amp; build
              <br />
              <RotatingWords words={profile.roles} className="text-accent" />
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.services.map((s) => (
                <span key={s} className="rounded-full border border-ink/20 px-3 py-1.5 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <HeroStats
            className="grid grid-cols-3 gap-4 sm:gap-8"
            stats={[
              {
                label: "Freelance Projects",
                value: freelance.length,
                detail: "Live client websites",
              },
              {
                label: "Experience",
                value: 2,
                suffix: "+",
                unit: "years",
                detail: "Freelance since 2024 + internship",
              },
              { label: "Education", text: "MCA", detail: "Master of Computer Applications, 2026" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="relative isolate px-4 py-16 sm:px-8 sm:py-24">
      <CursorTrail />
      <div className="mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[220px_1fr]">
        <SectionLabel>About</SectionLabel>
        <ScrollWords
          text={profile.intro}
          className="font-display text-[clamp(1.6rem,3.4vw,3.25rem)] font-medium leading-[1.12] tracking-tight"
        />
      </div>
    </section>
  );
}

function Toolbelt() {
  const items = [...toolbelt, ...toolbelt];
  return (
    <section aria-label="Technologies" className="relative isolate overflow-hidden border-y border-ink/15 py-6">
      <CursorTrail />
      <div className="marquee flex w-max gap-12">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-3xl font-medium tracking-tight sm:text-5xl"
          >
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Archive() {
  return (
    <Reveal className="mt-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <SectionLabel>Archive · 2022 – 2023</SectionLabel>
          <h3 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">Early Work</h3>
        </div>
        <p className="max-w-sm text-sm text-muted">Where I started: learning by rebuilding real products.</p>
      </div>
      <ul className="border-t border-ink/15">
        {archive.map((a) => (
          <li
            key={a.title}
            className="grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-ink/15 py-4 md:grid-cols-[4rem_1.1fr_1.3fr_auto]"
          >
            <span className="font-display text-sm text-muted">{a.year}</span>
            <div>
              <p className="font-display text-lg font-medium">{a.title}</p>
              <p className="text-sm text-muted">{a.note}</p>
            </div>
            <p className="col-start-2 row-start-2 text-xs text-muted md:col-start-auto md:row-start-auto md:text-sm">
              {a.stack.join(" · ")}
            </p>
            <div className="col-start-3 row-span-2 row-start-1 flex flex-col gap-1 text-right text-sm font-medium md:flex-row md:gap-4 md:col-start-auto md:row-span-1 md:row-start-auto">
              <a href={a.live} target="_blank" rel="noreferrer" className="hover:text-accent">
                Demo ↗
              </a>
              <a href={a.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                Code ↗
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative isolate px-4 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
      <CursorTrail />
      <div className="mx-auto max-w-[1600px] border-t border-ink/15 pt-10 sm:pt-14">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Built from scratch</SectionLabel>
            <h2 className="mt-3 font-display text-section font-medium">Personal Projects</h2>
          </div>
          <p className="max-w-sm text-muted">
            Things I designed, built and shipped end to end, from the database schema to the deploy.
          </p>
        </Reveal>
        <ProjectShowcase projects={projects} />
        <Archive />
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative isolate px-4 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-24">
      <CursorTrail />
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-10">
          <SectionLabel>Industry</SectionLabel>
          <h2 className="mt-3 font-display text-section font-medium">Experience</h2>
        </Reveal>
        {experience.map((job) => {
          const summary = <p className="max-w-md leading-relaxed text-ink/80">{job.summary}</p>;
          const stack = (
            <div className="flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <span key={s} className="rounded-full border border-ink/25 px-3 py-1 text-xs">
                  {s}
                </span>
              ))}
            </div>
          );
          const highlights = (
            <ol className="divide-y divide-ink/10">
              {job.highlights.map((h, i) => (
                <li key={h} className="flex gap-6 py-5 first:pt-0">
                  <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="leading-relaxed">{h}</p>
                </li>
              ))}
            </ol>
          );
          return (
            <Reveal key={job.company} as="article">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
                <div>
                  <h3 className="font-display text-project font-medium">{job.role}</h3>
                  <p className="mt-2 text-lg">
                    {job.company} <span className="text-muted">· {job.location}</span>
                  </p>
                  <p className="mt-1 text-label text-accent">{job.period}</p>
                  <div className="mt-6 hidden space-y-6 lg:block">
                    {summary}
                    {stack}
                  </div>
                </div>
                <div className="hidden lg:block">{highlights}</div>
              </div>
              {/* Phones / tablets: details revealed on tap */}
              <MobileDetails className="mt-5 lg:hidden">
                {summary}
                {stack}
                {highlights}
              </MobileDetails>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="bg-ink px-4 pb-8 pt-16 text-canvas sm:px-8 sm:pt-24">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-label font-medium text-soft">(Clients &amp; Collaborations · 2024 – 2026)</p>
            <h2 className="mt-3 font-display text-section font-medium">Freelance Work</h2>
          </div>
          <a
            href={`mailto:${profile.email}?subject=Freelance%20project`}
            className="text-sm font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            Have a project? Let&apos;s talk →
          </a>
        </Reveal>
        <StackedWork projects={freelance} />
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative isolate bg-ink px-4 py-16 text-canvas sm:px-8 sm:py-24">
      <CursorTrail />
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-label font-medium text-soft">(What I bring to a team)</p>
            <h2 className="mt-3 font-display text-section font-medium">Skillset</h2>
          </div>
          <p className="max-w-lg text-soft lg:justify-self-end">
            Backend first, AI-native, and comfortable across the stack when the product needs it.
          </p>
        </Reveal>
        <div className="divide-y divide-canvas/15 border-y border-canvas/15">
          {skillset.map((group, i) => (
            <Reveal
              key={group.title}
              className="group grid gap-4 py-8 transition-colors md:grid-cols-[80px_1fr_1.4fr] md:items-baseline"
            >
              <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm text-soft">{group.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-canvas/25 px-3 py-1.5 text-sm transition-colors hover:border-accent hover:bg-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="text-label font-medium text-soft">(Education)</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {education.map((e) => (
              <div key={e.degree} className="rounded-3xl border border-canvas/15 p-6 sm:p-8">
                <p className="text-label text-accent">{e.period}</p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">{e.degree}</h3>
                <p className="mt-2 text-sm text-soft">{e.school}</p>
                <p className="mt-6 font-display text-4xl font-medium">{e.score}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative isolate bg-accent px-4 pb-10 pt-16 text-canvas sm:px-8 sm:pt-24">
      <CursorTrail color="text-ink" />
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel>
          <span className="text-canvas/80">Contact</span>
        </SectionLabel>
        <Reveal as="h2" className="mt-4 font-display text-display font-medium uppercase">
          Let&apos;s build
          <br />
          something.
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-canvas/30 pt-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="max-w-lg text-lg">
              Hiring for a backend or AI role, or need a freelance developer for your next product? I reply within a
              day.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-block break-all font-display text-[clamp(1.5rem,3.5vw,3rem)] font-medium tracking-tight underline decoration-2 underline-offset-8 transition-opacity hover:opacity-75"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href={profile.cv}
              download
              className="rounded-full bg-canvas px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              Download CV ↓
            </a>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-canvas px-6 py-3 text-sm font-medium transition-colors hover:bg-canvas hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-canvas/30 pt-6 text-label">
          <span className="font-display font-bold tracking-[0.3em]">AMAN SRIVASTAV</span>
          <span>Somewhere between the API and the model.</span>
          <a href="#top" className="hover:opacity-75">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Toolbelt />
        <Work />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
