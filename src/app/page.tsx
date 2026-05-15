import { prisma } from "@/lib/prisma";
import PortfolioShell from "./components/PortfolioShell";
import { Suspense } from "react";

function PortfolioContent({
  profile,
  skills,
  experience,
  projects,
  writings,
  hacks,
  setups,
}: any) {
  return (
    <PortfolioShell
      profile={profile}
      skills={skills}
      experience={experience}
      projects={projects}
      writings={writings}
      hacks={hacks}
      setups={setups}
    />
  );
}

export default async function Home() {
  const [profile, skills, experience, projects] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.skill.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] }),
    prisma.experience.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f2ee] px-6 text-[#121723]">
        <div className="max-w-xl rounded-[28px] border border-black/10 bg-white/70 p-8 text-center shadow-[0_24px_80px_rgba(16,24,40,0.12)] backdrop-blur-sm">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-[#5c6376]">
            Portfolio unavailable
          </p>
          <h1 className="mt-4 text-3xl font-semibold">No profile data found.</h1>
          <p className="mt-3 text-[#5c6376]">
            Seed the database first, then reload the page.
          </p>
        </div>
      </main>
    );
  }

  const writings = [
    {
      id: "systems-that-feel-intelligent",
      title: "Systems That Feel Intelligent, Not Just Automated",
      description:
        "A short note on designing ML-backed products that feel precise, comprehensible, and useful instead of merely flashy.",
      meta: "Essay · 6 min",
    },
    {
      id: "signals-over-noise",
      title: "Signals Over Noise in Trading Interfaces",
      description:
        "How visual hierarchy, latency awareness, and confidence cues shape better trading dashboards and bot control panels.",
      meta: "Field Notes · 4 min",
    },
    {
      id: "rag-in-the-real-world",
      title: "RAG in the Real World",
      description:
        "Lessons from stitching together retrieval, prompt systems, and backend orchestration in practical LLM workflows.",
      meta: "Notebook · 7 min",
    },
  ];

  const hacks = [
    {
      id: "terminal-briefings",
      title: "Terminal Briefings",
      description:
        "A command-line digest that rolls project updates, errors, and deploy signals into one fast morning report.",
      tag: "Workflow",
    },
    {
      id: "prompt-lab",
      title: "Prompt Lab",
      description:
        "A tiny playground for testing prompt chains, structured outputs, and failure states before wiring them into products.",
      tag: "LLM",
    },
    {
      id: "market-watchdog",
      title: "Market Watchdog",
      description:
        "A lightweight monitor for trading anomalies, signal drift, and strategy health with human-readable alerts.",
      tag: "Quant",
    },
  ];

  const setups = {
    environment: [
      "VS Code + modular workspace folders",
      "Python environments for ML experiments",
      "Node / React stack for rapid interface work",
      "Postman, Git, and Docker basics for delivery pipelines",
    ],
    gear: ["Noise-controlled focus sessions", "Minimal dashboard-first workspace", "Fast note capture for ideas and bugs"],
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      duration: "2023 — 2027",
      school: "Madhav Institute of Technology, Gwalior",
      cgpa: "7.9 / 10",
    },
  };

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#f3f2ee]"><p>Loading...</p></div>}>
      <PortfolioContent
        profile={{
          name: profile.name,
          title: profile.title,
          bio: profile.bio,
          email: profile.email,
          phone: profile.phone,
          github: profile.github,
          linkedin: profile.linkedin,
        }}
        skills={skills.map((skill) => ({
          id: skill.id,
          category: skill.category,
          name: skill.name,
        }))}
        experience={experience.map((item) => ({
          id: item.id,
          role: item.role,
          company: item.company,
          duration: item.duration,
          description: item.description,
        }))}
        projects={projects.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          techStack: project.techStack,
          repoUrl: project.repoUrl,
          liveUrl: project.liveUrl,
        }))}
        writings={writings}
        hacks={hacks}
        setups={setups}
      />
    </Suspense>
  );
}
