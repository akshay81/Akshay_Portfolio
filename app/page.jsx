"use client";

import "@/app/globals.css";
import { useState } from "react";
import {
  IoLayersOutline,
  IoServerOutline,
  IoBulbOutline,
  IoCloudOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

const STATS = [
  { num: "2+",  label: "Years experience",  color: "#7F77DD" },
  { num: "1st", label: "ScarletHacks 2026", color: "#E24B4A" },
  { num: "10+", label: "Projects built",    color: "#1D9E75" },
  { num: "50%", label: "API perf. boost",   color: "#BA7517" },
];

const SERVICES = [
  {
    Icon: IoLayersOutline,
    title: "Full-Stack Development",
    text: "Building scalable, production-ready applications using React, Node.js, Python, and REST APIs — deployed on AWS and cloud infrastructure.",
    accent: "#7F77DD",
    iconBg: "#EEEDFE",
    iconColor: "#3C3489",
  },
  {
    Icon: IoServerOutline,
    title: "Backend Development",
    text: "Designing and optimizing backend systems, distributed services, and databases using Python, Flask, FastAPI, MySQL, PostgreSQL, and MongoDB.",
    accent: "#1D9E75",
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    Icon: IoBulbOutline,
    title: "AI & ML Integration",
    text: "Building AI-powered applications using Anthropic Claude, Google Gemini, Dialogflow, and scikit-learn to deliver intelligent, personalised features at scale.",
    accent: "#BA7517",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
  },
  {
    Icon: IoCloudOutline,
    title: "Cloud & DevOps",
    text: "Deploying and managing applications on AWS (EC2, S3, Lambda) using Docker, Kubernetes, Terraform, and CI/CD pipelines via GitHub Actions.",
    accent: "#378ADD",
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
];

const TECH_TAGS = [
  "Python", "React", "Node.js", "FastAPI", "PostgreSQL",
  "Docker", "AWS", "TypeScript", "MongoDB", "Redis",
  "Anthropic Claude API", "Kubernetes", "SQL", "Java", "Terraform",
];

const BIO = [
  "Hi, I'm Akshay — a results-oriented Software Developer passionate about building intelligent, scalable, and real-world impactful applications.",
  "With hands-on experience in Python, SQL, Java, Databricks, Docker, Kubernetes, and CI/CD, I've led initiatives that enhanced system performance, automated testing, and optimized backend workflows. At Accelya Solutions and Static Int, I reduced resolution times, improved deployment strategies, and boosted API performance by up to 50%.",
  "I completed my Master's in Computer Science at Illinois Tech, I've built AI-powered projects including GlucoAI, BloodBridgeAI, and an AI Job Tracker — winning 1st place at ScarletHacks 2026. I bring clean code, data-driven logic, and a problem-solving mindset to every team I join.",
];

function StatCard({ num, label, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--border-gradient-onyx, rgba(255,255,255,0.04))",
        border: hovered ? `0.5px solid ${color}66` : "1px solid var(--jet, rgba(255,255,255,0.1))",
        borderRadius: 12,
        padding: "14px 10px",
        textAlign: "center",
        transition: "border-color 0.15s, transform 0.15s",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{num}</div>
      <div style={{ fontSize: 11, opacity: 0.45, marginTop: 3, lineHeight: 1.35 }}>{label}</div>
    </div>
  );
}

function ServiceCard({ Icon, title, text, accent, iconBg, iconColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      className="service-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--border-gradient-onyx, rgba(255,255,255,0.04))",
        border: `0.5px solid ${hovered ? accent + "66" : "rgba(255,255,255,0.08)"}`,
        borderTop: `2px solid ${accent}`,
        borderRadius: 12,
        padding: "18px 16px",
        transition: "border-color 0.15s, transform 0.15s",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor: "default",
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: iconBg + "33",
        border: `0.5px solid ${accent}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: accent, fontSize: 20,
      }}>
        <Icon />
      </div>
      <h4 className="h4 service-item-title" style={{ fontSize: 14, fontWeight: 600 }}>
        {title}
      </h4>
      <p className="service-item-text" style={{ fontSize: 12, lineHeight: 1.65, opacity: 0.62, textAlign: "justify" }}>
        {text}
      </p>
    </li>
  );
}

function TechTag({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 11,
        padding: "4px 12px",
        borderRadius: 20,
        background: hovered ? "#EEEDFE" : "#e8eaf0",
        border: `0.5px solid ${hovered ? "#7F77DD" : "#c8ccd6"}`,
        color: hovered ? "#3C3489" : "#4a5568",
        transition: "all 0.15s",
        cursor: "default",
        fontWeight: hovered ? 500 : 400,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--light-gray, #888)",
      margin: "0 0 1rem",
    }}>
      {children}
      <div style={{ flex: 1, height: "0.5px", background: "var(--jet, rgba(0,0,0,0.1))" }} />
    </div>
  );
}

export default function About() {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <article className="about active" data-page="about">
      <style>{`
        @keyframes abFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ab-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 2rem;
          padding: 0;
        }
        .ab-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 1.75rem;
        }
        @media (max-width: 480px) {
          .ab-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-services-grid { grid-template-columns: 1fr; }
        }
        .ab-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 2rem;
        }
        .ab-expand-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 12px;
          color: #7F77DD;
          font-family: inherit;
          padding: 0;
          margin-top: 8px;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .ab-expand-btn:hover { opacity: 1; }
      `}</style>

      <header>
        <h2 className="h2 article-title">About Me</h2>
      </header>

      {/* Bio card */}
      <section
        className="about-text"
        style={{
          background: "var(--border-gradient-onyx, rgba(255,255,255,0.04))",
          border: "1px solid var(--jet, rgba(255,255,255,0.1))",
          borderRadius: 12,
          padding: "18px 20px",
          marginBottom: "1.75rem",
          animation: "abFadeUp 0.3s ease both",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{
            width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
            background: "#EEEDFE22", border: "2px solid #7F77DD",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#7F77DD",
          }}>
            AS
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.75, textAlign: "justify" }}>
            {BIO[0]}
          </p>
        </div>

        {bioExpanded && (
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10, animation: "abFadeUp 0.2s ease both" }}>
            {BIO.slice(1).map((p, i) => (
              <p key={i} style={{ fontSize: 13, lineHeight: 1.75, textAlign: "justify" }}>{p}</p>
            ))}
          </div>
        )}

        <button className="ab-expand-btn" onClick={() => setBioExpanded(o => !o)}>
          <IoChevronDownOutline style={{
            fontSize: 14,
            transition: "transform 0.2s",
            transform: bioExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }} />
          {bioExpanded ? "Show less" : "Read more"}
        </button>
      </section>

      {/* Quick stats */}
      <div className="ab-stats-grid">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Services */}
      <section className="service">
        <SectionLabel>What I do</SectionLabel>
        <ul className="ab-services-grid service-list">
          {SERVICES.map(s => <ServiceCard key={s.title} {...s} />)}
        </ul>
      </section>

      {/* Tech tags */}
      <SectionLabel>Core tech</SectionLabel>
      <div className="ab-tag-row">
        {TECH_TAGS.map(t => <TechTag key={t} label={t} />)}
      </div>

    </article>
  );
}
