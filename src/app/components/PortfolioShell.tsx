"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiExternalLink, FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import CipherText from "./CipherText";
import { CloseIcon, CrosshairIcon, MenuIcon, SearchIcon } from "./PrototypeIcons";

type Profile = {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string | null;
  github?: string | null;
  linkedin?: string | null;
};

type Skill = {
  id: string;
  category: string;
  name: string;
};

type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  repoUrl?: string | null;
  liveUrl?: string | null;
};

type Writing = {
  id: string;
  title: string;
  description: string;
  meta: string;
};

type Hack = {
  id: string;
  title: string;
  description: string;
  tag: string;
};

type Setups = {
  environment: string[];
  gear: string[];
  education: {
    degree: string;
    duration: string;
    school: string;
    cgpa: string;
  };
};

type CommandItem = {
  id: string;
  label: string;
  description: string;
  group: "General" | "Go to";
  shortcut?: string;
  action: () => void;
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "writings", label: "Writings" },
  { id: "stack", label: "Stack" },
  { id: "hacks", label: "Hacks" },
  { id: "setups", label: "Setups" },
];

const tracks = [
  {
    id: "night-drive",
    title: "Night Drive Loop",
    url: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3",
  },
  {
    id: "signal-bloom",
    title: "Signal Bloom",
    url: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
  },
];

function CrosshairChrome() {
  return (
    <span aria-hidden="true" className="crosshair-corners">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function SectionHeading({ index, title, subtitle }: { index: string; title: string; subtitle: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <div ref={ref} className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-token-muted">{index}</p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.8rem)] leading-[0.96] tracking-[-0.04em] text-token-text">
          <CipherText text={title} play={inView} duration={950} />
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-7 text-token-muted md:text-base">{subtitle}</p>
    </div>
  );
}

function isPreviewSection(value: string | null): value is string {
  return Boolean(value && navItems.some((item) => item.id === value));
}

export default function PortfolioShell({
  profile,
  skills,
  experience,
  projects,
  writings,
  hacks,
  setups,
}: {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  writings: Writing[];
  hacks: Hack[];
  setups: Setups;
}) {
  const reducedMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const previewMode = searchParams.get("preview");
  const freezeLoader = previewMode === "loading";
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState("home");
  const [overlayOpen, setOverlayOpen] = useState(previewMode === "command");
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [announce, setAnnounce] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [loaderImageReady, setLoaderImageReady] = useState(false);
  const [loaderTimeElapsed, setLoaderTimeElapsed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const commandInputRef = useRef<HTMLInputElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);


  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderTimeElapsed(true), reducedMotion ? 700 : 980);
    const fontsReady = document.fonts?.ready?.then(() => true).catch(() => true) ?? Promise.resolve(true);
    fontsReady.then(() => {
      if (!freezeLoader) {
        setLoaderImageReady(true);
      }
    });
    return () => window.clearTimeout(timer);
  }, [freezeLoader, reducedMotion]);

  useEffect(() => {
    if (freezeLoader) {
      return;
    }

    if (loaderImageReady && loaderTimeElapsed) {
      const timer = window.setTimeout(() => setShowLoader(false), reducedMotion ? 0 : 140);
      return () => window.clearTimeout(timer);
    }
  }, [freezeLoader, loaderImageReady, loaderTimeElapsed, reducedMotion]);

  useEffect(() => {
    if (!showLoader && isPreviewSection(previewMode)) {
      const node = document.getElementById(previewMode);
      node?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  }, [previewMode, reducedMotion, showLoader]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[trackIndex].url;
    audio.loop = true;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, trackIndex]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-22% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOverlayOpen(true);
        setAnnounce("Command overlay opened.");
      }

      if (event.key === "Escape") {
        setOverlayOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!overlayOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => {
      commandInputRef.current?.focus();
    }, 40);

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const container = overlayRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", trapFocus);
      previousFocusRef.current?.focus();
    };
  }, [overlayOpen]);

  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      acc[skill.category] ??= [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  const commandItems = useMemo<CommandItem[]>(() => {
    const navigateTo = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      setOverlayOpen(false);
      setMenuOpen(false);
    };

    return [
      {
        id: "copy-link",
        label: "Copy Link",
        description: "Copy the current prototype URL",
        group: "General",
        shortcut: "L",
        action: async () => {
          await navigator.clipboard.writeText(window.location.href);
          setAnnounce("Link copied to clipboard.");
        },
      },
      {
        id: "send-email",
        label: "Send Email",
        description: `Start a message to ${profile.email}`,
        group: "General",
        shortcut: "E",
        action: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "view-source",
        label: "View Source",
        description: "Open the GitHub profile / source destination",
        group: "General",
        shortcut: "S",
        action: () => {
          if (profile.github) window.open(profile.github, "_blank", "noopener,noreferrer");
        },
      },
      ...navItems.map((item) => ({
        id: item.id,
        label: item.label,
        description: `Jump to ${item.label}`,
        group: "Go to" as const,
        shortcut: item.label[0],
        action: () => navigateTo(item.id),
      })),
    ];
  }, [profile.email, profile.github, reducedMotion]);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return commandItems;
    return commandItems.filter((item) => {
      return [item.label, item.description, item.group].join(" ").toLowerCase().includes(trimmed);
    });
  }, [commandItems, query]);

  const generalItems = filteredItems.filter((item) => item.group === "General");
  const goToItems = filteredItems.filter((item) => item.group === "Go to");

  const shortcutLabel = isMac ? "Press ⌃K to start" : "Press Ctrl K to start";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-token-bg text-token-text">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(89,115,255,0.15),transparent_32%),radial-gradient(circle_at_78%_8%,rgba(59,255,212,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,100,186,0.12),transparent_28%)]" />
      <audio ref={audioRef} preload="none" />
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>

      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f8f7f3]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.02, filter: "blur(4px)" }}
            transition={{ duration: reducedMotion ? 0.25 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            aria-live="polite"
            aria-label="Loading prototype"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(248,247,243,0.94)_55%,rgba(214,216,223,0.96))]" />
            <motion.div
              className="relative flex w-full max-w-2xl flex-col items-center gap-8 px-8 text-center"
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reducedMotion ? 0.24 : 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-[220px] w-full max-w-[520px] md:h-[320px]">
                <Image
                  src="/prototype-assets/loading-cube.png"
                  alt="Black cube graphic on bright background used as the loading sequence visual"
                  fill
                  priority
                  className="object-contain"
                  onLoad={() => setLoaderImageReady(true)}
                  sizes="(max-width: 768px) 80vw, 520px"
                />
              </div>
              <div className="w-full max-w-[280px] overflow-hidden rounded-full bg-black/8 p-[1px]">
                <motion.div
                  className="h-[3px] origin-left rounded-full bg-[#121723]"
                  animate={{ scaleX: [0.1, 0.55, 1] }}
                  transition={{ duration: reducedMotion ? 0.8 : 1.05, ease: "easeInOut", repeat: loaderTimeElapsed ? 0 : Infinity }}
                />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-[#6d7385]">Booting prototype interface</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 border-b border-token-line/70 bg-token-bg/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="#home" aria-label="Go to home section" className="crosshair-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-token-line bg-token-surface text-token-text shadow-token-soft transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none">
              <CrosshairChrome />
              <CrosshairIcon className="h-5 w-5" />
            </Link>
            <div>
              <p className="text-sm font-medium text-token-text">Nayan Suryavanshi</p>
              <p className="text-xs uppercase tracking-[0.28em] text-token-muted">Prototype System</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`crosshair-target relative inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none ${
                    active ? "is-active bg-token-surface shadow-token-soft text-token-text" : "text-token-muted hover:text-token-text"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <CrosshairChrome />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-full border border-token-line bg-token-surface px-2 py-1 shadow-token-soft md:flex">
              <button
                type="button"
                className="crosshair-target inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-token-text transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none"
                onClick={() => setPlaying((current) => !current)}
                aria-label={playing ? "Pause soundtrack" : "Play soundtrack"}
              >
                <CrosshairChrome />
                <span className="flex items-end gap-[3px]" aria-hidden="true">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span key={index} className={`eq-bar ${playing ? "eq-bar-running" : ""}`} style={{ animationDelay: `${index * 0.12}s` }} />
                  ))}
                </span>
                {playing ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                className="crosshair-target inline-flex h-10 w-10 items-center justify-center rounded-full text-token-muted transition-colors duration-200 hover:text-token-text focus-visible:outline-none"
                onClick={() => setTrackIndex((current) => (current + 1) % tracks.length)}
                aria-label={`Switch soundtrack, current track ${tracks[trackIndex].title}`}
              >
                <CrosshairChrome />
                <MenuIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              className="crosshair-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-token-line bg-token-surface text-token-text shadow-token-soft transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none"
              onClick={() => {
                setOverlayOpen(true);
                setAnnounce("Command overlay opened.");
              }}
              aria-label={isMac ? "Open command overlay with Command K" : "Open command overlay with Control K"}
            >
              <CrosshairChrome />
              <SearchIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="crosshair-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-token-line bg-token-surface text-token-text shadow-token-soft transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none lg:hidden"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle navigation menu"
            >
              <CrosshairChrome />
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-t border-token-line/70 bg-token-surface px-4 py-3 lg:hidden"
            >
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="crosshair-target inline-flex rounded-full px-4 py-2 text-sm text-token-text"
                    onClick={() => setMenuOpen(false)}
                  >
                    <CrosshairChrome />
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <section id="home" data-nav-section className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-[1400px] items-center px-4 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
          <div className="grid w-full gap-12 xl:grid-cols-[minmax(0,1.1fr)_360px] xl:items-end">
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="font-mono text-xs uppercase tracking-[0.38em] text-token-muted">Cyber / tech portfolio prototype</p>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(4.2rem,11vw,9.8rem)] leading-[0.88] tracking-[-0.065em] text-token-text">
                <CipherText text={profile.name} play={!showLoader} duration={1280} delay={160} />
              </h1>
              <div className="mt-8 flex items-center gap-3 font-mono text-[clamp(0.95rem,2vw,1.35rem)] text-token-muted">
                <span className="text-token-accent">&gt;</span>
                <strong className="font-medium text-token-text">
                  <CipherText text={profile.title} play={!showLoader} duration={980} delay={420} />
                </strong>
              </div>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-token-muted md:text-[1.2rem] md:leading-9">
                Full-stack systems, machine learning products, trading interfaces, and a sharper way to move through ideas.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setOverlayOpen(true)}
                  className="crosshair-target inline-flex items-center gap-3 rounded-full border border-token-line bg-token-panel px-5 py-3 font-semibold text-token-text shadow-token-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-token-glow focus-visible:outline-none"
                >
                  <CrosshairChrome />
                  <CrosshairIcon className="h-4 w-4 text-token-accent" />
                  <CipherText text={shortcutLabel} play={!showLoader} duration={920} delay={760} />
                </button>
                <a href="#projects" className="crosshair-target inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-token-muted transition-colors duration-200 hover:text-token-text focus-visible:outline-none">
                  <CrosshairChrome />
                  Browse projects
                </a>
              </div>
            </motion.div>

            <motion.aside
              className="rounded-[28px] border border-token-line bg-token-panel p-5 shadow-token-soft backdrop-blur-xl"
              initial={reducedMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">Signal panel</p>
                  <h2 className="mt-3 text-xl font-display tracking-[-0.04em] text-token-text">Ready to explore</h2>
                </div>
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-token-line bg-token-surface">
                  <Image src="/prototype-assets/crosshair-reference.png" alt="" fill className="object-cover opacity-45 mix-blend-multiply" sizes="48px" />
                </div>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-token-muted">
                <p>Home acts as the launch surface. The command overlay is the fastest way into each route-like section.</p>
                <div className="rounded-2xl border border-token-line/80 bg-token-surface p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-token-muted">Focus areas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Python",
                      "MERN",
                      "Machine Learning",
                      "Trading Bots",
                      "LLM Workflows",
                    ].map((item) => (
                      <span key={item} className="rounded-full border border-token-line px-3 py-1 text-xs text-token-text">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-token-text">Use the crosshair-hover controls in the header and cards to discover interactions.</p>
              </div>
            </motion.aside>
          </div>
        </section>

        <div className="mx-auto flex max-w-[1400px] flex-col gap-28 px-4 pb-24 md:px-8 md:pb-32">
          <section id="about" data-nav-section className="section-shell">
            <SectionHeading index="01" title="About" subtitle="A clearer introduction than the reference: concise background, current focus, and intent." />
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="info-card">
                <p className="text-lg leading-8 text-token-text/92">{profile.bio}</p>
              </article>
              <article className="info-card">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">Current direction</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-token-muted">
                  <li>Building AI-driven applications with practical product boundaries.</li>
                  <li>Turning model pipelines into usable dashboards and developer tools.</li>
                  <li>Pairing strong backend systems with interfaces that feel composed and intentional.</li>
                </ul>
                {experience[0] && (
                  <div className="mt-8 rounded-[22px] border border-token-line bg-token-surface p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">Recent experience</p>
                    <h3 className="mt-3 font-display text-xl tracking-[-0.04em] text-token-text">{experience[0].role}</h3>
                    <p className="mt-1 text-sm text-token-muted">{experience[0].company} · {experience[0].duration}</p>
                    <p className="mt-3 text-sm leading-7 text-token-muted">{experience[0].description}</p>
                  </div>
                )}
              </article>
            </div>
          </section>

          <section id="projects" data-nav-section className="section-shell">
            <SectionHeading index="02" title="Projects" subtitle="Flagship work presented as editorial prototypes with stronger hierarchy and clearer CTA structure." />
            <div className="grid gap-5 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article key={project.id} whileHover={reducedMotion ? undefined : { y: -6 }} className="project-card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">0{index + 1} / Featured Build</p>
                      <h3 className="mt-3 font-display text-3xl tracking-[-0.04em] text-token-text">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.repoUrl && (
                        <Link href={project.repoUrl} target="_blank" className="crosshair-target icon-pill" aria-label={`Open ${project.title} repository`}>
                          <CrosshairChrome />
                          <FiGithub className="h-4 w-4" />
                        </Link>
                      )}
                      {project.liveUrl && (
                        <Link href={project.liveUrl} target="_blank" className="crosshair-target icon-pill" aria-label={`Open ${project.title} live demo`}>
                          <CrosshairChrome />
                          <FiExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-token-muted md:text-base">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.split(",").map((tech) => (
                      <span key={`${project.id}-${tech}`} className="tag-chip">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="writings" data-nav-section className="section-shell">
            <SectionHeading index="03" title="Writings" subtitle="Notebook-style pieces and essays with a clean reading hierarchy and restrained cyber accenting." />
            <div className="grid gap-5 xl:grid-cols-3">
              {writings.map((item) => (
                <motion.article key={item.id} whileHover={reducedMotion ? undefined : { y: -5 }} className="info-card">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">{item.meta}</p>
                  <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-token-text">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-token-muted">{item.description}</p>
                  <button type="button" className="crosshair-target mt-6 inline-flex items-center gap-2 rounded-full px-0 py-0 text-sm font-medium text-token-text focus-visible:outline-none">
                    <CrosshairChrome />
                    Read concept
                  </button>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="stack" data-nav-section className="section-shell">
            <SectionHeading index="04" title="Stack" subtitle="Technologies grouped into a dashboard-like matrix for scanning instead of a long undifferentiated list." />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Object.entries(groupedSkills).map(([category, items]) => (
                <article key={category} className="info-card">
                  <h3 className="font-display text-2xl tracking-[-0.04em] text-token-text">{category}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item.id} className="tag-chip">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="hacks" data-nav-section className="section-shell">
            <SectionHeading index="05" title="Hacks" subtitle="Fast experiments, utilities, and side systems that underline the prototype’s more playful cyber / systems tone." />
            <div className="grid gap-5 lg:grid-cols-3">
              {hacks.map((item) => (
                <motion.article key={item.id} whileHover={reducedMotion ? undefined : { y: -5 }} className="info-card">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-accent">{item.tag}</p>
                  <h3 className="mt-4 font-display text-2xl tracking-[-0.04em] text-token-text">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-token-muted">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="setups" data-nav-section className="section-shell">
            <SectionHeading index="06" title="Setups" subtitle="Environment, study context, and workflow cues displayed as a balanced system panel rather than a resume dump." />
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="info-card">
                <h3 className="font-display text-2xl tracking-[-0.04em] text-token-text">Environment</h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-token-muted">
                  {setups.environment.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <div className="mt-8 rounded-[22px] border border-token-line bg-token-surface p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">Gear / flow</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {setups.gear.map((item) => (
                      <span key={item} className="tag-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
              <article className="info-card">
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">Education</p>
                <h3 className="mt-4 font-display text-3xl tracking-[-0.04em] text-token-text">{setups.education.degree}</h3>
                <p className="mt-3 text-sm leading-7 text-token-muted">{setups.education.school}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="tag-chip">{setups.education.duration}</span>
                  <span className="tag-chip">CGPA {setups.education.cgpa}</span>
                </div>
                <div className="mt-10 border-t border-token-line pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">Availability</p>
                  <p className="mt-3 text-sm leading-7 text-token-text">Open to full-time SDE / ML roles, internships, and product-focused engineering environments.</p>
                </div>
              </article>
            </div>
          </section>

          <section id="contact" className="section-shell pb-8">
            <div className="rounded-[32px] border border-token-line bg-token-panel p-6 shadow-token-soft md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-token-muted">Contact channel</p>
                  <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.96] tracking-[-0.05em] text-token-text">Built to be explored. Ready to be refined.</h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-token-muted md:text-base">
                    This prototype prioritizes discoverability, keyboard access, and a sharper visual language. The next pass can deepen content, connect richer data, or turn sections into full pages.
                  </p>
                </div>
                <div className="grid gap-3 self-start">
                  <a href={`mailto:${profile.email}`} className="crosshair-target contact-link focus-visible:outline-none">
                    <CrosshairChrome />
                    <FiMail className="h-4 w-4" />
                    {profile.email}
                  </a>
                  {profile.phone && (
                    <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="crosshair-target contact-link focus-visible:outline-none">
                      <CrosshairChrome />
                      <FiPhone className="h-4 w-4" />
                      {profile.phone}
                    </a>
                  )}
                  {profile.linkedin && (
                    <Link href={profile.linkedin} target="_blank" className="crosshair-target contact-link focus-visible:outline-none">
                      <CrosshairChrome />
                      <FiLinkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  )}
                  {profile.github && (
                    <Link href={profile.github} target="_blank" className="crosshair-target contact-link focus-visible:outline-none">
                      <CrosshairChrome />
                      <FiGithub className="h-4 w-4" />
                      GitHub
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 mx-auto flex max-w-[1400px] items-center gap-4 px-4 pb-10 text-sm text-token-muted md:px-8">
        <Link href="https://www.justfuckingcode.com/" target="_blank" className="transition-colors hover:text-token-text">
          Philosophy I live by.
        </Link>
        <div className="h-px flex-1 bg-token-line" />
        <button
          type="button"
          className="crosshair-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-token-line bg-token-surface text-token-text shadow-token-soft focus-visible:outline-none"
          onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <CrosshairChrome />
          <CrosshairIcon className="h-4 w-4" />
        </button>
      </footer>

      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
        <AnimatePresence>
          {socialOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              className="rounded-[24px] border border-token-line bg-token-surface p-3 shadow-token-soft backdrop-blur-xl"
            >
              <div className="grid gap-2">
                {profile.github && (
                  <Link href={profile.github} target="_blank" className="crosshair-target contact-link min-w-[180px] focus-visible:outline-none">
                    <CrosshairChrome />
                    <FiGithub className="h-4 w-4" />
                    GitHub
                  </Link>
                )}
                {profile.linkedin && (
                  <Link href={profile.linkedin} target="_blank" className="crosshair-target contact-link min-w-[180px] focus-visible:outline-none">
                    <CrosshairChrome />
                    <FiLinkedin className="h-4 w-4" />
                    LinkedIn
                  </Link>
                )}
                <a href={`mailto:${profile.email}`} className="crosshair-target contact-link min-w-[180px] focus-visible:outline-none">
                  <CrosshairChrome />
                  <FiMail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          className="crosshair-target inline-flex h-14 w-14 items-center justify-center rounded-full border border-token-line bg-token-panel text-token-text shadow-token-glow focus-visible:outline-none"
          aria-label="Open social links menu"
          onClick={() => setSocialOpen((current) => !current)}
        >
          <CrosshairChrome />
          {socialOpen ? <CloseIcon className="h-4 w-4" /> : <CrosshairIcon className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-[rgba(10,14,24,0.45)] px-4 pt-[12vh] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setOverlayOpen(false)}
          >
            <motion.div
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-label="Command overlay"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-[640px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1018] text-[#f4f7ff] shadow-[0_35px_120px_rgba(2,6,23,0.55)]"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <SearchIcon className="h-4 w-4 text-[#93a0ba]" />
                <input
                  ref={commandInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#6d7890]"
                  aria-label="Search commands"
                />
                <button
                  type="button"
                  onClick={() => setOverlayOpen(false)}
                  className="crosshair-target inline-flex h-10 w-10 items-center justify-center rounded-full text-[#c6d0e4] focus-visible:outline-none"
                  aria-label="Close command overlay"
                >
                  <CrosshairChrome />
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[65vh] overflow-y-auto px-3 py-3">
                {generalItems.length > 0 && (
                  <div className="mb-4">
                    <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.34em] text-[#667086]">General</p>
                    <div className="grid gap-1">
                      {generalItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={item.action}
                          className="crosshair-target flex items-center justify-between rounded-[18px] px-4 py-3 text-left text-white transition-colors duration-200 hover:bg-white/6 focus-visible:outline-none"
                        >
                          <CrosshairChrome />
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="mt-1 text-xs text-[#7e8aa3]">{item.description}</p>
                          </div>
                          {item.shortcut && <span className="rounded-md bg-white/8 px-2 py-1 font-mono text-xs text-[#c4cee1]">{item.shortcut}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {goToItems.length > 0 && (
                  <div>
                    <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.34em] text-[#667086]">Go to</p>
                    <div className="grid gap-1">
                      {goToItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={item.action}
                          className="crosshair-target flex items-center justify-between rounded-[18px] px-4 py-3 text-left text-white transition-colors duration-200 hover:bg-white/6 focus-visible:outline-none"
                        >
                          <CrosshairChrome />
                          <div>
                            <p className="font-medium">{item.label}</p>
                            <p className="mt-1 text-xs text-[#7e8aa3]">{item.description}</p>
                          </div>
                          {item.shortcut && <span className="rounded-md bg-white/8 px-2 py-1 font-mono text-xs text-[#c4cee1]">{item.shortcut}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredItems.length === 0 && (
                  <div className="rounded-[20px] border border-white/10 px-4 py-8 text-center text-sm text-[#7e8aa3]">
                    No matching commands. Try searching for Projects, Stack, or Email.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
