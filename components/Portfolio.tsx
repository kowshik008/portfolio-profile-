"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Award, 
  Lightbulb, 
  GraduationCap, 
  Code2, 
  Cpu, 
  Sparkles, 
  Send, 
  ExternalLink 
} from "lucide-react";
import { useEffect, useState } from "react";
import Cursor from "./Cursor";

const MotionScene = dynamic(() => import("./MotionScene"), { 
  ssr: false, 
  loading: () => <div className="scene-fallback" /> 
});

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: "Intermediate", desc: "Core logic, OOP, scripting, data handling" },
      { name: "HTML5", level: "Proficient", desc: "Semantic markup, modern accessibility" },
      { name: "CSS3", level: "Intermediate", desc: "Tailwind, flexbox, grid, animations" },
      { name: "JavaScript", level: "Foundational", desc: "DOM manipulation, ES6+, async basics" }
    ]
  },
  {
    title: "Technology & Concepts",
    icon: Cpu,
    skills: [
      { name: "Artificial Intelligence", level: "Foundational", desc: "ML concepts, model evaluation basics" },
      { name: "Generative AI Fundamentals", level: "Foundational", desc: "Prompt engineering, LLMs, API integration" },
      { name: "Web Development", level: "Intermediate", desc: "Responsive layouts, modern web standards" },
      { name: "Problem Solving", level: "Practicing", desc: "Algorithms, structured logic, debugging" }
    ]
  },
  {
    title: "Professional Skills",
    icon: Sparkles,
    skills: [
      { name: "Teamwork & Collaboration", level: "High", desc: "Effective peer pairing, group hackathons" },
      { name: "Technical Communication", level: "High", desc: "Clear documentation, concept presentation" },
      { name: "Creative Thinking", level: "High", desc: "Innovative ideation & problem reframing" },
      { name: "Adaptability & Learning", level: "High", desc: "Rapid skill adoption & tech exploration" }
    ]
  }
];

const projects = [
  {
    number: "01",
    title: "Voter Eligibility Calculator",
    badge: "Python · Logic",
    description: "A clean, reliable application that evaluates voter age eligibility according to statutory guidelines. Implements defensive input validation, age delta calculation, and clear explanatory messaging.",
    tags: ["Python", "Control Flow", "Input Validation"],
    github: "https://github.com/kowshik008"
  },
  {
    number: "02",
    title: "ATM Management System",
    badge: "Python · OOP",
    description: "A structured banking simulation modeling automated teller machine operations. Features secure PIN validation, deposit and withdrawal constraints, ledger updates, and dynamic transaction receipts.",
    tags: ["Python", "Object-Oriented", "State Management"],
    github: "https://github.com/kowshik008"
  },
  {
    number: "03",
    title: "Student Grade Calculator",
    badge: "Python · Academics",
    description: "An academic performance calculator designed to process individual coursework scores, compute accurate weighted percentages, and map academic marks to standardized university grading criteria.",
    tags: ["Python", "Data Processing", "Grading Algorithm"],
    github: "https://github.com/kowshik008"
  },
  {
    number: "04",
    title: "ReVive AI — E-Waste Platform",
    badge: "AI Concept · Sustainability",
    description: "An innovative conceptual platform leveraging artificial intelligence to incentivize responsible electronic waste collection, reverse logistics tracking, and certified material recycling.",
    tags: ["Generative AI", "Sustainability", "System Design"],
    github: "https://github.com/kowshik008"
  }
];

export default function Portfolio() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".reading-progress");
    const header = document.querySelector<HTMLElement>(".site-header");
    const sections = document.querySelectorAll<HTMLElement>("section[id], #top");
    const navLinks = document.querySelectorAll<HTMLElement>("nav a[href^='#']");

    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${max > 0 ? (scrolled / max) * 100 : 0}%`;

      if (header) {
        if (scrolled > 40) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      }

      let current = "";
      sections.forEach(section => {
        const top = section.offsetTop - 160;
        if (scrolled >= top) current = section.getAttribute("id") || "";
      });
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("kowshiksravanam6565@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <Cursor />
      <div className="reading-progress" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Kowshik Sravanam Home">
          KOWSHIK<span>.AI</span>
        </a>
        <nav aria-label="Main navigation">
          <a data-cursor="ABOUT" href="#about">ABOUT</a>
          <a data-cursor="SKILLS" href="#skills">SKILLS</a>
          <a data-cursor="PROJECTS" href="#projects">PROJECTS</a>
          <a data-cursor="ACHIEVEMENTS" href="#achievements">ACHIEVEMENTS</a>
          <a data-cursor="CONTACT" href="#contact">CONTACT</a>
          <a data-cursor="RESUME" href="/kowshik-sravanam-resume.pdf" download="Kowshik_Sravanam_Resume.pdf">
            RESUME <Download size={13} style={{ display: "inline", verticalAlign: "middle" }} />
          </a>
        </nav>
        <div className="availability"><i /> OPEN TO OPPORTUNITIES</div>
      </header>

      <main id="top">
        {/* HERO SECTION */}
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-copy">
            <motion.p className="eyebrow" initial="hidden" animate="visible" variants={fadeUp}>
              B.TECH FIRST YEAR @ NIAT <span>／</span> ASPIRING AI ENGINEER
            </motion.p>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.08 }}>
              KOWSHIK<br />
              <span className="stroke">SRAVANAM</span>
            </motion.h1>
            <motion.p className="hero-description" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.18 }}>
              I am an enthusiastic technology student passionate about Artificial Intelligence, software development, and solving real-world problems through technology. I continuously explore new technologies, build practical projects, and improve my technical skills.
            </motion.p>
            <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.28 }}>
              <a className="button button-primary" href="#projects" data-cursor="EXPLORE">
                EXPLORE MY WORK <ArrowUpRight size={15} />
              </a>
              <a className="text-link" href="#contact" data-cursor="CONNECT">
                LET'S CONNECT <ArrowDownRight size={15} />
              </a>
            </motion.div>
          </div>
          <motion.div 
            className="portrait-wrap" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="portrait-glow" />
            <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
            <div className="portrait-image" style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "50%", overflow: "hidden" }}>
              <Image 
                src="/images/kowshik-hero.jpg" 
                alt="Kowshik Sravanam — Aspiring AI Engineer" 
                fill 
                priority 
                sizes="(max-width: 800px) 78vw, 38vw" 
                style={{ objectFit: "cover", objectPosition: "center center" }} 
              />
            </div>
            <span className="portrait-label">KOWSHIK SRAVANAM <b>／ ASPIRING AI ENGINEER</b></span>
            <span className="portrait-side">EXPLORE · CODE · IMPACT</span>
          </motion.div>
          <MotionScene />
          <div className="hero-foot">
            <span>CAREER GOAL: DEVELOP IMPACTFUL AI SOLUTIONS THAT SOLVE REAL-WORLD CHALLENGES</span>
            <a href="#about">SCROLL TO DISCOVER ↓</a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="section about" id="about">
          <motion.div className="section-index" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            01 / ABOUT ME
          </motion.div>
          <div className="about-layout">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="section-heading">TURNING IDEAS<br />INTO <em>IMPACTFUL</em><br />SYSTEMS.</h2>
              
              <div className="about-bio-text">
                <p className="about-statement">
                  Hi, I’m <strong>Kowshik Sravanam</strong>, a first-year B.Tech student at NIAT with an unwavering curiosity for Artificial Intelligence, Machine Learning, and practical software engineering.
                </p>
                <p className="about-subtext">
                  My journey involves studying core computer science foundations while actively building hands-on projects, participating in college hackathons and ideathons, and exploring Generative AI and Python. My ambition is to evolve into an impactful AI Engineer capable of tackling complex, high-scale industry challenges.
                </p>
              </div>

              <div className="facts-grid">
                <div><small>ACADEMICS</small><span>B.Tech CSE (First Year)</span></div>
                <div><small>INSTITUTION</small><span>NIAT</span></div>
                <div><small>CORE FOCUS</small><span>AI, ML &amp; Python Development</span></div>
                <div><small>STATUS</small><span>Open to Internships &amp; Collaborations</span></div>
              </div>
            </motion.div>

            <motion.div className="about-portrait-col" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="about-card-glass">
                <div className="about-portrait-frame" style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "50%", overflow: "hidden" }}>
                  <Image 
                    src="/images/kowshik-smiling.jpg" 
                    alt="Kowshik Sravanam — Technology Enthusiast" 
                    fill 
                    sizes="(max-width: 800px) 90vw, 35vw" 
                    style={{ objectFit: "cover", objectPosition: "center center" }} 
                  />
                </div>
                <div className="about-card-footer">
                  <div>
                    <span className="about-card-name">KOWSHIK SRAVANAM</span>
                    <span className="about-card-role">B.TECH CSE · NIAT</span>
                  </div>
                  <span className="about-card-badge"><i /> LEARNER &amp; BUILDER</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section className="section expertise" id="skills">
          <div className="section-index">02 / TECHNICAL COMPETENCIES</div>
          <h2 className="section-heading">TECHNICAL &amp;<br /><em>PROFESSIONAL SKILLS.</em></h2>
          <p className="section-intro">Honest, transparent representation of current proficiencies across languages, emerging AI concepts, and professional qualities.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "32px" }}>
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div 
                  key={cat.title} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.1 }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                    <Icon size={20} style={{ color: "#38bdf8" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>{cat.title}</h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {cat.skills.map(s => (
                      <div key={s.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: "600", fontSize: "14px" }}>{s.name}</span>
                          <span style={{ fontSize: "11px", fontFamily: "var(--mono)", background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", padding: "2px 8px", borderRadius: "12px" }}>
                            {s.level}
                          </span>
                        </div>
                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--muted)" }}>{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="section work" id="projects">
          <div id="work" style={{ position: "relative", top: "-110px" }} />
          <div className="section-index">03 / FEATURED PROJECTS</div>
          <h2 className="section-heading">APPLIED CODE &amp;<br /><em>PRACTICAL BUILDS.</em></h2>
          <p className="section-intro">Software simulations, utility applications, and AI architectural concepts developed during my ongoing technical journey.</p>
          <div className="project-grid">
            {projects.map((proj, i) => (
              <motion.article 
                className="project-card" 
                key={proj.number} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }} 
                data-cursor="CASE STUDY"
              >
                <div className="project-top">
                  <span>PROJECT / {proj.number}</span>
                  <span className="project-status">{proj.badge}</span>
                </div>
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "14px 0 20px" }}>
                  {proj.tags.map(t => (
                    <span key={t} style={{ fontSize: "11px", fontFamily: "var(--mono)", background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: "6px" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <a href={proj.github} target="_blank" rel="noreferrer" style={{ fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "6px", color: "#38bdf8" }}>
                    <Github size={14} /> View on GitHub
                  </a>
                  <div className="project-arrow"><ArrowUpRight size={18} /></div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS & EXPERIENCE */}
        <section className="section" id="achievements">
          <div className="section-index">04 / ACHIEVEMENTS &amp; MILESTONES</div>
          <h2 className="section-heading">LEARNING, HACKATHONS<br />&amp; <em>EXPERIENCE.</em></h2>
          <p className="section-intro">Active engagement in competitive technical events, hackathons, and structured learning programs.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "32px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <Award size={22} style={{ color: "#38bdf8", flexShrink: 0, marginTop: "3px" }} />
                <div>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: "700" }}>Hackathon &amp; Ideathon Participation</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", lineHeight: "1.6" }}>
                    Participated in competitive collegiate hackathons and ideathons, collaborating in cross-functional teams to brainstorm, architect, and prototype real-world solutions under strict deadlines.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <GraduationCap size={22} style={{ color: "#38bdf8", flexShrink: 0, marginTop: "3px" }} />
                <div>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: "700" }}>Technical Learning Milestones</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", lineHeight: "1.6" }}>
                    Completed structured coursework in Python Fundamentals, Object-Oriented Programming, and Modern Web Development. Actively expanding knowledge into Machine Learning algorithms and Generative AI principles.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <Lightbulb size={22} style={{ color: "#38bdf8", flexShrink: 0, marginTop: "3px" }} />
                <div>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: "700" }}>Workshops &amp; Tech Seminars</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", lineHeight: "1.6" }}>
                    Attended technical seminars covering Emerging Trends in AI, Cloud Computing Fundamentals, and Open Source Contribution practices.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact" id="contact">
          <div className="section-index">05 / LET'S BUILD SOMETHING TOGETHER</div>
          <h2>GET IN<br /><span>TOUCH.</span></h2>
          <p>
            I am actively seeking internship opportunities, research collaborations, and open-source projects where I can contribute and expand my engineering toolkit.
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginTop: "24px" }}>
            <button 
              onClick={copyEmail}
              className="button button-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
              <Mail size={16} />
              {copied ? "COPIED TO CLIPBOARD! ✓" : "COPY EMAIL ADDRESS"}
            </button>
            <a 
              className="button"
              href="mailto:kowshiksravanam6565@gmail.com" 
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", color: "#fff", padding: "12px 24px", borderRadius: "100px", textDecoration: "none" }}
            >
              <Send size={16} /> SEND EMAIL
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} KOWSHIK SRAVANAM · ASPIRING AI ENGINEER</span>
        <div className="socials">
          <a href="https://github.com/kowshik008" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <Github size={17} /> GITHUB
          </a>
          <a href="https://linkedin.com/in/kowshik-sravanam-622b7942b" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <Linkedin size={17} /> LINKEDIN
          </a>
          <a href="mailto:kowshiksravanam6565@gmail.com" aria-label="Email Kowshik">
            <Mail size={17} /> EMAIL
          </a>
        </div>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
