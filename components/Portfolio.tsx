"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight } from "lucide-react";
import { useEffect } from "react";
import Cursor from "./Cursor";

const MotionScene = dynamic(() => import("./MotionScene"), { ssr: false, loading: () => <div className="scene-fallback" /> });

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const skills = ["Python", "Generative AI", "LLMs", "AI Applications", "Web Development", "HTML & CSS", "Machine Learning", "Problem Solving", "React", "Next.js"];

export default function Portfolio() {
  const reduced = useReducedMotion();
  useEffect(() => {
    const progress = document.querySelector<HTMLElement>(".reading-progress");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <>
    <Cursor />
    <div className="reading-progress" />
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Kowshik home">KOWSHIK<span>®</span></a>
      <nav aria-label="Main navigation">
        <a data-cursor="ABOUT" href="#about">ABOUT</a>
        <a data-cursor="EXPERTISE" href="#expertise">EXPERTISE</a>
        <a data-cursor="WORK" href="#work">WORK</a>
        <a data-cursor="CONTACT" href="#contact">CONTACT</a>
      </nav>
      <div className="availability"><i /> OPEN TO OPPORTUNITIES</div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-copy">
          <motion.p className="eyebrow" initial="hidden" animate="visible" variants={fadeUp}>B.TECH @ NIAT <span>／</span> ASPIRING AI ENGINEER</motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: .08 }}>
            BUILDING<br /><span className="stroke">INTELLIGENT</span><br /><span className="lime">EXPERIENCES.</span>
          </motion.h1>
          <motion.p className="hero-description" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: .18 }}>
            I’m Kowshik Sravanam — a first-year Computer Science student at NIAT exploring Artificial Intelligence, Generative AI, and human-centred technology.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: .28 }}>
            <a className="button button-primary" href="#work" data-cursor="VIEW WORK">EXPLORE MY WORK <ArrowUpRight size={15} /></a>
            <a className="text-link" href="#about" data-cursor="ABOUT ME">GET TO KNOW ME <ArrowDownRight size={15} /></a>
          </motion.div>
        </div>
        <motion.div className="portrait-wrap" initial={{ opacity: 0, y: 35, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, delay: .2 }}>
          <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
          <div className="portrait-image"><Image src="/images/kowshik-sravanam.jpg" alt="Kowshik Sravanam" fill priority sizes="(max-width: 800px) 78vw, 38vw" /></div>
          <span className="portrait-label">KOWSHIK SRAVANAM <b>／ 01</b></span>
          <span className="portrait-side">THINK · BUILD · ITERATE</span>
        </motion.div>
        <MotionScene />
        <div className="hero-foot"><span>INDEPENDENT THINKING. INTELLIGENT SYSTEMS.</span><a href="#about">SCROLL TO DISCOVER ↓</a></div>
      </section>

      <section className="section about" id="about">
        <motion.div className="section-index" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>01 / A LITTLE ABOUT ME</motion.div>
        <div className="about-layout">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="section-heading">CURIOUS BY<br />NATURE. <em>BUILT</em><br />TO EXPLORE.</h2>
            <p className="about-statement">I'm a first-year B.Tech student at NIAT, passionate about <strong>Artificial Intelligence, Python programming, Web Development, and Generative AI.</strong> I’m building my technical foundation through hands-on learning, personal projects, hackathons, and ideathons to create projects that go beyond classroom learning.</p>
          </motion.div>
          <motion.div className="facts-grid" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div><small>FOCUS</small><span>AI & Generative AI</span></div>
            <div><small>EDUCATION</small><span>NIAT · B.Tech CSE (2026-30)</span></div>
            <div><small>LOCATION</small><span>Rajahmundry, AP, India</span></div>
            <div><small>OPPORTUNITY</small><span>Open to Internships</span></div>
          </motion.div>
        </div>
      </section>

      <section className="section expertise" id="expertise">
        <div className="section-index">02 / TOOLKIT</div>
        <h2 className="section-heading">TOOLS FOR<br /><em>WHAT’S NEXT.</em></h2>
        <p className="section-intro">A growing toolkit for designing, developing and shipping intelligent products. Edit this list to reflect your current strengths.</p>
        <div className="skill-list">{skills.map((skill, i) => <motion.span key={skill} custom={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .045 }} data-cursor="SKILL">{skill}</motion.span>)}</div>
      </section>

      <section className="section work" id="work">
        <div className="section-index">03 / SELECTED WORK</div>
        <h2 className="section-heading">IDEAS INTO<br /><em>INTERACTION.</em></h2>
        <p className="section-intro">A few spaces reserved for the projects that best show how you think, build and solve problems.</p>
        <div className="project-grid">
          {[
            ["01", "Intelligent Assistant", "Describe the problem, your AI approach and the outcome. Add a live demo and source-code link."],
            ["02", "Automation Workflow", "Show how you connected tools, reduced repetitive work or made a process more reliable."],
            ["03", "Applied AI Experiment", "Share the experiment, your technical decisions, what you learned and what you would improve."],
            ["04", "Something Unexpected", "Use this space for a distinctive build that demonstrates your curiosity and engineering range."]
          ].map(([n, title, desc], i) => <motion.article className="project-card" key={n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} data-cursor="CASE STUDY">
            <div className="project-top"><span>PROJECT / {n}</span><span className="project-status">YOUR PROJECT HERE</span></div>
            <h3>{title}</h3><p>{desc}</p><div className="project-arrow"><MoveUpRight size={20} /></div>
          </motion.article>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-index">04 / HAVE A GOOD CHALLENGE?</div>
        <h2>LET’S MAKE<br />IT <span>INTELLIGENT.</span></h2>
        <p>Have an interesting problem or an idea worth exploring? Let’s talk.</p>
        <a className="contact-link" href="mailto:kowshiksravanam6565@gmail.com">kowshiksravanam6565@gmail.com <ArrowUpRight size={17} /></a>
      </section>
    </main>
    <footer className="footer">
      <span>© {new Date().getFullYear()} KOWSHIK SRAVANAM</span>
      <div className="socials">
        <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17} /> GITHUB</a>
        <a href="https://www.linkedin.com/in/kowshik-sravanam-622b7942b" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /> LINKEDIN</a>
        <a href="mailto:kowshiksravanam6565@gmail.com" aria-label="Email Kowshik"><Mail size={17} /> EMAIL</a>
      </div>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  </>;
}
