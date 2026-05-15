import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Clear existing data
    await prisma.profile.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.project.deleteMany();

    // Profile
    await prisma.profile.create({
      data: {
        name: "Nayan Suryavanshi",
        title: "Full Stack & Machine Learning Developer",
        bio: "Full-stack and machine learning developer with hands-on experience in building AI-driven applications and scalable web systems. Proficient in MERN stack, Python-based ML pipelines, and algorithmic trading systems. Passionate about leveraging data science and LLM technologies to solve real-world problems. Seeking SDE or ML engineering roles to contribute to high-impact development environments.",
        email: "nayansuryavanshi70@gmail.com",
        phone: "+91 62600 28224",
        github: "https://github.com/NAYANSURYAVANSHI",
        linkedin: "https://www.linkedin.com/in/nayan-suryavanshi-367688323",
      }
    });

    // Skills
    const skills = [
      { category: "Full Stack", name: "MongoDB" },
      { category: "Full Stack", name: "Express.js" },
      { category: "Full Stack", name: "React.js" },
      { category: "Full Stack", name: "Node.js (MERN)" },
      { category: "Full Stack", name: "REST APIs" },
      { category: "Languages", name: "JavaScript (ES6+)" },
      { category: "Languages", name: "Python" },
      { category: "Languages", name: "C++" },
      { category: "Languages", name: "HTML5 & CSS3" },
      { category: "AI & LLM", name: "Google Gemini API" },
      { category: "AI & LLM", name: "OpenAI API" },
      { category: "AI & LLM", name: "LangChain" },
      { category: "AI & LLM", name: "Prompt Engineering" },
      { category: "AI & LLM", name: "RAG & Vector Databases" },
      { category: "Data Science & ML", name: "NumPy & Pandas" },
      { category: "Data Science & ML", name: "Scikit-learn" },
      { category: "Data Science & ML", name: "TensorFlow & PyTorch" },
      { category: "Data Science & ML", name: "Matplotlib & Seaborn" },
      { category: "Tools & DevOps", name: "Git & GitHub" },
      { category: "Tools & DevOps", name: "Docker (basic)" },
      { category: "Databases", name: "MySQL" },
      { category: "Databases", name: "SQLite" },
    ];
    await prisma.skill.createMany({ data: skills });

    // Experience
    await prisma.experience.create({
      data: {
        role: "Machine Learning Intern",
        company: "EtharaAI",
        duration: "2026 (1 Month)",
        description: "Worked on AI-integrated pipelines and contributed to model development and evaluation tasks. Assisted in data preprocessing, feature engineering, and performance benchmarking of ML models. Collaborated with the core team to explore LLM-based solutions for real-world automation use cases.",
      }
    });

    // Projects
    const projects = [
      {
        title: "Automated Trading Bot",
        description: "Built an automated algorithmic trading system using scikit-learn, TensorFlow, and PyTorch for price prediction and signal generation; computed technical indicators via TA-Lib and pandas-ta. Developed a responsive frontend dashboard for real-time portfolio visualization. Conducted backtesting with Backtrader.",
        techStack: "Python, Flask, scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, MySQL, SQLite",
      },
      {
        title: "Sonic Pulse - Music Streaming App",
        description: "Built a browser-based music streaming app with playlist management, dynamic song queue, and smooth audio controls. Designed a clean responsive UI with progress bar and volume management using Web Audio API and HTML5 audio.",
        techStack: "HTML5, CSS3, JavaScript",
      }
    ];
    await prisma.project.createMany({ data: projects });

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}