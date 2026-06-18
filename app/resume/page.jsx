"use client";

import { useState } from "react";
import {
  IoTrophyOutline, IoLaptopOutline, IoSchoolOutline,
  IoBriefcaseOutline, IoChevronDownOutline, IoLogoChrome,
} from "react-icons/io5";
import "@/app/globals.css";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { num: "2+",  label: "Years industry exp.", color: "#7F77DD" },
  { num: "150+", label: "Issues resolved",     color: "#1D9E75" },
  { num: "8+",  label: "Releases per year",    color: "#BA7517" },
  { num: "1st", label: "ScarletHacks 2026",    color: "#E24B4A" },
];

const EDUCATION = [
  {
    title: "M.S. Computer Science",
    org: "Illinois Institute of Technology",
    date: "Aug 2024 – May 2026",
    bullets: [
      "Advanced coursework in software engineering, machine learning, and cloud infrastructure.",
      "Built production AI projects (GlucoAI, BloodBridgeAI, AI Job Tracker) while enrolled.",
      "1st place — Best Use of AI in Healthcare, ScarletHacks 2026 hosted by ACM Illinois Tech.",
    ],
  },
  {
    title: "B.E. Computer Engineering",
    org: "University of Mumbai",
    date: "Aug 2019 – Jun 2022",
    bullets: [
      "Graduated with 3.5 GPA with a strong foundation in programming, algorithms, and databases.",
      "Built IoT voting system, Java and Python student management systems, and an AI dietician chatbot.",
    ],
  },
];

const EXPERIENCE = [
  {
    title: "Analyst – I",
    org: "Accelya Solutions · Mumbai, India",
    date: "Dec 2022 – Jul 2024",
    bullets: [
      "Optimized system performance by 30% by identifying bottlenecks in distributed data pipelines using SQL, MySQL, Python, and Databricks.",
      "Resolved 150+ software issues; led post-incident root cause analysis across distributed services, reducing mean time to resolution by 25%.",
      "Spearheaded 8+ minor releases annually with automated testing, canary validation, and rollback strategies — improving user satisfaction by 15%.",
      "Implemented CI/CD best practices and cross-functional workflows, reducing integration errors and improving overall software quality.",
    ],
  },
  {
    title: "Software Developer Intern",
    org: "Static Int · Mumbai, India",
    date: "Jun 2022 – Sep 2022",
    bullets: [
      "Enhanced code reliability by 40% — identified 30% coverage gaps and automated tests with Python, reducing production defects by 35%.",
      "Improved query execution speed by 50% and API response times by 30% by restructuring 100+ database queries and implementing caching.",
      "Designed scalable test automation frameworks, cutting manual testing efforts by 60% and accelerating release cycles by 40%.",
    ],
  },
  {
    title: "Python Developer Intern",
    org: "Trivia Softwares",
    date: "May 2021 – Jul 2021",
    bullets: [
      "Built a Tkinter-based BMI Calculator integrated with SQLite3 for student record management.",
      "Developed a GUI-based Student Management System improving data tracking efficiency.",
    ],
  },
  {
    title: "MySQL Developer Intern",
    org: "Trivia Softwares",
    date: "Dec 2020 – Feb 2021",
    bullets: [
      "Designed relational database schemas for student records ensuring data integrity and optimized query performance.",
      "Developed a GUI-based Student Management System in MySQL improving record management efficiency.",
    ],
  },
];

const ACHIEVEMENTS = [
  {
    Icon: IoTrophyOutline,
    color: "#BA7517",
    bg: "#FAEEDA",
    title: "1st place — Best Use of AI in Healthcare",
    sub: "ScarletHacks 2026 · ACM Illinois Tech",
  },
  {
    Icon: IoTrophyOutline,
    color: "#BA7517",
    bg: "#FAEEDA",
    title: "1st place — Terraform Gameday Challenge",
    sub: "Mentored by HashiCorp industry experts",
  },
  {
    Icon: IoLogoChrome,
    color: "#378ADD",
    bg: "#E6F1FB",
    title: "Google Chrome Built-in AI Challenge",
    sub: "Participant · 2025",
  },
  {
    Icon: IoLaptopOutline,
    color: "#7F77DD",
    bg: "#EEEDFE",
    title: "IEEE Hackathon",
    sub: "Participant · University of Mumbai chapter",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ num, label, color }) {
  return (
    <div style={{
      background: "var(--eerie-black-2, #1e1e1e)",
      border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "16px 12px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 26, fontWeight: 700, color }}>{num}</div>
      <div style={{ fontSize: 11, opacity: 0.45, marginTop: 3, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

function TimelineCard({ item, type }) {
  const [open, setOpen] = useState(false);
  const accent = type === "edu" ? "#7F77DD" : "#1D9E75";
  const dotBg  = type === "edu" ? "#EEEDFE"  : "#E1F5EE";
  const dotTxt = type === "edu" ? "#3C3489"  : "#085041";

  return (
    <div style={{ position: "relative", marginBottom: 20, paddingLeft: 28 }}>
      {/* Timeline dot */}
      <div style={{
        position: "absolute", left: 0, top: 6,
        width: 14, height: 14, borderRadius: "50%",
        border: `2px solid ${accent}`,
        background: "var(--eerie-black-1, #1a1a1a)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent }} />
      </div>

      {/* Card */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: "var(--eerie-black-2, #1e1e1e)",
          border: `0.5px solid ${open ? accent + "55" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 12,
          padding: "14px 16px",
          cursor: "pointer",
          transition: "border-color 0.15s",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 2 }}>{item.org}</div>
          </div>
          <span style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 20, flexShrink: 0,
            background: dotBg, color: dotTxt, fontWeight: 500,
          }}>
            {item.date}
          </span>
        </div>

        {/* Toggle label */}
        <div style={{
          marginTop: 10, display: "flex", alignItems: "center", gap: 5,
          fontSize: 12, opacity: 0.45, color: accent,
        }}>
          <IoChevronDownOutline style={{
            fontSize: 14,
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }} />
          {open ? "Collapse" : "View highlights"}
        </div>

        {/* Bullets */}
        {open && (
          <div style={{
            marginTop: 12, paddingTop: 12,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            {item.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{
                  flexShrink: 0, marginTop: 2,
                  width: 18, height: 18, borderRadius: "50%",
                  background: dotBg, color: dotTxt,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 12, lineHeight: 1.65, opacity: 0.7 }}>{b}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AchievementCard({ Icon, color, bg, title, sub }) {
  return (
    <div style={{
      background: "var(--eerie-black-2, #1e1e1e)",
      border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "16px",
      display: "flex", flexDirection: "column", gap: 8,
      transition: "border-color 0.15s, transform 0.15s",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color + "55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = ""; }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: bg + "22", border: `0.5px solid ${color}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon style={{ fontSize: 18, color }} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{title}</div>
      <div style={{ fontSize: 11, opacity: 0.45 }}>{sub}</div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "education",    label: "Education",    Icon: IoSchoolOutline   },
  { id: "experience",   label: "Experience",   Icon: IoBriefcaseOutline },
  { id: "achievements", label: "Achievements", Icon: IoTrophyOutline   },
];

export default function Resume() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <article className="resume active" data-page="resume">
      <style>{`
        @keyframes rFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .r-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 16px; font-size: 13px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent; color: inherit; cursor: pointer;
          transition: all 0.15s; font-family: inherit; opacity: 0.5;
        }
        .r-tab:hover { opacity: 1; border-color: rgba(255,255,255,0.28); }
        .r-tab.active {
          background: #EEEDFE; border-color: #7F77DD;
          color: #3C3489; opacity: 1; font-weight: 600;
        }
        .r-tab.active svg { color: #7F77DD; }
        .r-timeline-line {
          position: absolute; left: 6px; top: 20px; bottom: 20px;
          width: 1.5px; background: rgba(255,255,255,0.08); border-radius: 2px;
        }
        .r-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 1.75rem;
        }
        @media (max-width: 500px) {
          .r-stat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .r-ach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .r-section-label {
          font-size: 11px; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; opacity: 0.35;
          margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 10px;
        }
        .r-section-label::after {
          content: ''; flex: 1; height: 0.5px;
          background: rgba(255,255,255,0.08);
        }
      `}</style>

      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* Stats row */}
      <div className="r-stat-grid">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.75rem", flexWrap: "wrap" }}>
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`r-tab${activeTab === id ? " active" : ""}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon style={{ fontSize: 15 }} />
            {label}
          </button>
        ))}
      </div>

      {/* Education */}
      {activeTab === "education" && (
        <div style={{ animation: "rFadeUp 0.2s ease both" }}>
          <div className="r-section-label">Academic roadmap</div>
          <div style={{ position: "relative" }}>
            <div className="r-timeline-line" />
            {EDUCATION.map(item => (
              <TimelineCard key={item.title} item={item} type="edu" />
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {activeTab === "experience" && (
        <div style={{ animation: "rFadeUp 0.2s ease both" }}>
          <div className="r-section-label">Career timeline</div>
          <div style={{ position: "relative" }}>
            <div className="r-timeline-line" />
            {EXPERIENCE.map(item => (
              <TimelineCard key={item.title + item.date} item={item} type="exp" />
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {activeTab === "achievements" && (
        <div style={{ animation: "rFadeUp 0.2s ease both" }}>
          <div className="r-section-label">Recognition & participation</div>
          <div className="r-ach-grid">
            {ACHIEVEMENTS.map(a => <AchievementCard key={a.title} {...a} />)}
          </div>
        </div>
      )}

    </article>
  );
}
