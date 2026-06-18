"use client";

import { IoChevronDown, IoClose, IoCalendarOutline, IoCodeSlashOutline } from "react-icons/io5";
import { useState } from "react";
import MyImage from "@/app/components/Image";
import glucoai_cover        from "@/public/glucoai_cover.png";
import bloodbridgeai_cover  from "@/public/bloodbridgeai_cover.png";
import job_tracker_cover    from "@/public/job_tracker_cover.png";
import Project1 from "@/public/project-1.png";
import Project2 from "@/public/project-2.png";
import Project3 from "@/public/project-3.png";
import Project4 from "@/public/project-4.png";
import Project5 from "@/public/project-5.png";
import Project6 from "@/public/project-6.png";
import Project7 from "@/public/project-7.png";
import "@/app/globals.css";

const PROJECTS = [
  {
    src: glucoai_cover,
    link: "#",
    title: "GlucoAI",
    category: "AI / ML",
    badge: "AI / ML",
    badgeColor: { bg: "#EEEDFE", text: "#3C3489" },
    accentColor: "#7F77DD",
    date: "May 2026",
    featured: true,
    description:
      "Full-stack AI dietary guidance web app for diabetic patients with ADA-compliant glucose classification, Claude AI-powered meal planning, OCR ingredient label scanning, and real-time dietary insights.",
    tools: ["React", "Node.js", "Express", "SQLite", "Anthropic Claude API", "Tesseract.js OCR", "REST API", "RAG"],
    bullets: [
      "Architected a full-stack web app contextualising every AI response with live glucose level, diabetes type, and allergy data.",
      "Engineered 4 Claude AI prompt pipelines: glucose-aware meal recipe generation, ingredient safety analysis, sugar estimation, and daily dietary insights grounded in ADA guidelines via RAG.",
      "Built a computer vision ingredient safety checker using Tesseract.js OCR to extract nutrition label text and return personalised Safe / Caution / Do Not Buy verdicts.",
      "Delivered a 12-endpoint REST API managing profiles, glucose history, food logging, and Claude AI orchestration across a normalised SQLite database.",
    ],
  },
  {
    src: bloodbridgeai_cover,
    link: "#",
    title: "BloodBridgeAI",
    category: "AI / ML",
    badge: "🏆 1st Place",
    badgeColor: { bg: "#EAF3DE", text: "#27500A" },
    accentColor: "#E24B4A",
    date: "Apr 2026",
    featured: true,
    win: "ScarletHacks 2026",
    description:
      "3-agent AI system automating emergency blood donor coordination. Autonomously calls top-ranked donors via Twilio Voice, captures ETA responses, and auto-escalates on rejection using Redis queue management.",
    tools: ["Python", "FastAPI", "React", "PostgreSQL", "Twilio Voice API", "Twilio SMS", "Google Maps API", "JWT", "Redis", "WebSocket"],
    bullets: [
      "Architected a 3-agent AI system ranking donors by blood compatibility, past emergency response history, and the 56-day donation gap requirement.",
      "Built an AI Voice Assistant using Twilio Voice API that autonomously calls the top 5 ranked donors, captures ETA and fitness responses, and auto-escalates on no response or rejection.",
      "Developed a real-time hospital dashboard using React and WebSocket with live donor status, ETA tracking, and automated directions delivery via Twilio SMS and Google Maps API.",
      "Secured 1st place — Best Use of AI in Healthcare at ScarletHacks 2026, delivering a production-ready MVP with JWT role-based access control and full audit trails in PostgreSQL.",
    ],
  },
  {
    src: job_tracker_cover,
    link: "#",
    title: "AI Job Application Tracker",
    category: "AI / ML",
    badge: "AI / ML",
    badgeColor: { bg: "#EEEDFE", text: "#3C3489" },
    accentColor: "#378ADD",
    date: "Jan 2026",
    featured: false,
    description:
      "Full-stack AI-powered job tracker with a 5-stage Kanban pipeline, Google Gemini AI for auto-extracting job details, CV tailoring, cover letter generation, and ATS compatibility scoring.",
    tools: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "Google Gemini AI", "JWT", "OAuth 2.0", "Puppeteer", "Netlify", "Heroku"],
    bullets: [
      "Architected a full-stack AI-powered job tracker using React, Node.js & Express REST API backed by MongoDB, enabling users to manage applications across a 5-stage Kanban pipeline with real-time status tracking.",
      "Integrated Google Gemini AI to auto-extract job details from URLs, tailor CVs to specific job descriptions, generate personalised cover letters, and score ATS compatibility — reducing manual prep time by 70%.",
      "Built a Gmail automation engine that polls inboxes every 15 minutes, uses LLM classification to detect rejections, interview invites, and offers, and fuzzy-matches emails to tracked applications.",
      "Implemented JWT + Google OAuth 2.0 authentication, Cloudinary-backed file storage, Puppeteer PDF generation, and deployed the full stack to Netlify and Heroku with CI/CD via GitHub Actions.",
    ],
  },
  {
    src: Project1,
    link: "#",
    title: "Smart Hospital Management",
    category: "Web development",
    badge: "Web dev",
    badgeColor: { bg: "#E1F5EE", text: "#085041" },
    accentColor: "#1D9E75",
    date: "2022",
    featured: false,
    description:
      "Python + Flask + MySQL system streamlining patient registration, appointment booking, and record management. Improved doctor–patient interactions by 50% with cashless payment integration.",
    tools: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    bullets: [
      "Optimised hospital workflows covering patient registration, appointment booking, and record management.",
      "Integrated secure data storage and cashless payment options, improving doctor–patient interactions by 50%.",
    ],
  },
  {
    src: Project2,
    link: "#",
    title: "AI Dietician",
    category: "AI / ML",
    badge: "AI / ML",
    badgeColor: { bg: "#EEEDFE", text: "#3C3489" },
    accentColor: "#7F77DD",
    date: "2022",
    featured: false,
    description:
      "ML-powered diet recommendation system with a Dialogflow chatbot supporting text and voice input, generating personalised meal plans at 85% accuracy.",
    tools: ["Machine Learning", "Python", "Dialogflow", "Firebase", "Flask"],
    bullets: [
      "Interactive chatbot interface with both text and voice support via Dialogflow.",
      "Achieved 85% accuracy in personalised meal suggestions using ML models.",
    ],
  },
  {
    src: Project3,
    link: "#",
    title: "Student Management (Java)",
    category: "Applications",
    badge: "App",
    badgeColor: { bg: "#E6F1FB", text: "#0C447C" },
    accentColor: "#378ADD",
    date: "2022",
    featured: false,
    description:
      "Java Applet-based student management tool with CRUD operations, marks visualisation, event-driven interactions, and JDBC database connectivity.",
    tools: ["Java", "Java Applet", "JDBC", "MySQL", "AWT/Swing"],
    bullets: [
      "Event-driven UI supporting full CRUD operations and marks chart visualisation.",
      "JDBC connectivity to MySQL for persistent data storage and retrieval.",
    ],
  },
  {
    src: Project4,
    link: "#",
    title: "Student Management (Python)",
    category: "Applications",
    badge: "App",
    badgeColor: { bg: "#E6F1FB", text: "#0C447C" },
    accentColor: "#378ADD",
    date: "2022",
    featured: false,
    description:
      "Tkinter-based student management interface with CRUD, mark analysis charts, SQLite3 data storage, Pandas/NumPy data processing, and Matplotlib visualisations.",
    tools: ["Python", "Tkinter", "SQLite3", "Pandas", "NumPy", "Matplotlib"],
    bullets: [
      "Pandas and NumPy for data processing and aggregation.",
      "Matplotlib charts for mark analysis and academic reporting.",
    ],
  },
  {
    src: Project5,
    link: "#",
    title: "BMI Calculator",
    category: "Web development",
    badge: "Web dev",
    badgeColor: { bg: "#E1F5EE", text: "#085041" },
    accentColor: "#1D9E75",
    date: "2022",
    featured: false,
    description:
      "GUI BMI calculator with MySQL storage, feet-to-meters height conversion, and automated Excel export of all user records via OpenPyXL.",
    tools: ["Python", "Tkinter", "MySQL", "Pandas", "OpenPyXL"],
    bullets: [
      "Automated Excel export of all user records using OpenPyXL.",
      "Built-in height unit conversion from feet to meters.",
    ],
  },
  {
    src: Project6,
    link: "#",
    title: "Sales Insights Analysis",
    category: "Data",
    badge: "Data",
    badgeColor: { bg: "#FAEEDA", text: "#633806" },
    accentColor: "#BA7517",
    date: "2022",
    featured: false,
    description:
      "Comprehensive sales analysis for a hardware business — end-to-end data cleaning, transformation, and Matplotlib visualisations to track revenue trends and support strategic decisions.",
    tools: ["Python", "Pandas", "Matplotlib", "NumPy", "Jupyter Notebook"],
    bullets: [
      "Full ETL pipeline: data cleaning, transformation, and visual dashboarding.",
      "Actionable revenue insights supporting strategic management decision-making.",
    ],
  },
  {
    src: Project7,
    link: "#",
    title: "Voting System",
    category: "IoT",
    badge: "IoT",
    badgeColor: { bg: "#FBEAF0", text: "#72243E" },
    accentColor: "#D4537E",
    date: "2022",
    featured: false,
    description:
      "Arduino-based electronic voting machine with fingerprint biometric authentication, Wi-Fi module integration, and cryptographic data protection for secure, transparent elections.",
    tools: ["Arduino Mega", "Fingerprint Sensor", "Wi-Fi Module", "C++", "Embedded C", "Cryptography"],
    bullets: [
      "Biometric fingerprint authentication prevents duplicate or fraudulent voting.",
      "Cryptographic techniques ensure data integrity and voter privacy.",
    ],
  },
];

const CATEGORIES = ["All", "AI / ML", "Web development", "Applications", "Data", "IoT"];

// ─── Tool Pill ────────────────────────────────────────────────────────────────
function ToolPill({ label, accent }) {
  return (
    <span style={{
      fontSize: 11,
      padding: "3px 10px",
      borderRadius: 20,
      background: accent ? accent + "18" : "rgba(128,128,128,0.12)",
      border: `0.5px solid ${accent ? accent + "55" : "rgba(128,128,128,0.2)"}`,
      color: accent || "inherit",
      whiteSpace: "nowrap",
      fontWeight: accent ? 500 : 400,
    }}>
      {label}
    </span>
  );
}

// ─── Project Detail Modal ─────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <>
      {/* Backdrop — clicking it closes the modal */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.82)",
          animation: "modalBackdropIn 0.2s ease both",
        }}
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
          width: "min(680px, 92vw)",
          maxHeight: "88vh",
          overflowY: "auto",
          background: "var(--eerie-black-1, #1a1a1a)",
          borderRadius: 16,
          border: `1.5px solid ${project.accentColor}55`,
          animation: "modalIn 0.22s cubic-bezier(0.34,1.3,0.64,1) both",
        }}
      >
        {/* ── Hero image ── */}
        <div style={{ position: "relative", height: 220, overflow: "hidden", borderRadius: "14px 14px 0 0" }}>
          <MyImage
            src={project.src}
            alt={project.title}
            loading="eager"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.9 }}
          />
          {/* Gradient overlay so text on top is readable */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)",
          }} />

          {/* Badges over image */}
          <span style={{
            position: "absolute", top: 14, left: 14,
            fontSize: 11, padding: "4px 12px", borderRadius: 20,
            background: project.badgeColor.bg, color: project.badgeColor.text, fontWeight: 600,
          }}>
            {project.badge}
          </span>
          {project.win && (
            <span style={{
              position: "absolute", top: 14, right: 52,
              fontSize: 11, padding: "4px 12px", borderRadius: 20,
              background: "#EAF3DE", color: "#27500A", fontWeight: 600,
            }}>
              🏆 {project.win}
            </span>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 12, right: 12,
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(0,0,0,0.55)", border: "0.5px solid rgba(255,255,255,0.2)",
              color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.8)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.55)"}
          >
            <IoClose />
          </button>

          {/* Title over image bottom */}
          <div style={{ position: "absolute", bottom: 14, left: 18, right: 18 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#fff" }}>{project.title}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, opacity: 0.7, fontSize: 12, color: "#fff" }}>
              <IoCalendarOutline style={{ fontSize: 13 }} />
              {project.date}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Description */}
          <p style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.72, margin: 0 }}>
            {project.description}
          </p>

          {/* Key highlights */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: 12,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.07em",
              textTransform: "uppercase", opacity: 0.45,
            }}>
              <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.1)" }} />
              Key highlights
              <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.1)" }} />
            </div>

            <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {project.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{
                    flexShrink: 0, marginTop: 3,
                    width: 18, height: 18, borderRadius: "50%",
                    background: project.accentColor + "22",
                    border: `1px solid ${project.accentColor}66`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: project.accentColor,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 13, lineHeight: 1.65, opacity: 0.78 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: 12,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.07em",
              textTransform: "uppercase", opacity: 0.45,
            }}>
              <IoCodeSlashOutline style={{ fontSize: 14 }} />
              Tech stack
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {project.tools.map(t => (
                <ToolPill key={t} label={t} accent={project.accentColor} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onOpenModal }) {
  return (
    <li
      style={{
        background: "var(--eerie-black-2, #1e1e1e)",
        border: project.featured
          ? `1.5px solid ${project.accentColor}88`
          : "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignSelf: "stretch",
        animation: `pfFadeUp 0.25s ease ${index * 45}ms both`,
        transition: "border-color 0.15s, transform 0.15s",
        listStyle: "none",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = project.featured
          ? project.accentColor
          : "rgba(255,255,255,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = project.featured
          ? project.accentColor + "88"
          : "rgba(255,255,255,0.08)";
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 160, flexShrink: 0,
        position: "relative", overflow: "hidden",
        background: "#111",
      }}>
        <MyImage
          src={project.src}
          alt={project.title}
          loading="lazy"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            opacity: 0.85,
          }}
        />
        <span style={{
          position: "absolute", top: 10, left: 10, zIndex: 1,
          fontSize: 11, padding: "3px 10px", borderRadius: 20,
          background: project.badgeColor.bg, color: project.badgeColor.text, fontWeight: 600,
        }}>
          {project.badge}
        </span>
        {project.win && (
          <span style={{
            position: "absolute", top: 10, right: 10, zIndex: 1,
            fontSize: 10, padding: "3px 8px", borderRadius: 20,
            background: "#EAF3DE", color: "#27500A", fontWeight: 600,
          }}>
            🏆 {project.win}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{
        padding: "14px 14px 10px", flex: 1,
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{project.title}</span>
          {" "}
          <span style={{ fontSize: 11, opacity: 0.38 }}>{project.date}</span>
        </div>

        <p style={{
          fontSize: 12, lineHeight: 1.6, opacity: 0.62, margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
          overflow: "hidden", minHeight: "3.6em",
        }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto" }}>
          {project.tools.slice(0, 4).map(t => <ToolPill key={t} label={t} />)}
          {project.tools.length > 4 && (
            <span style={{
              fontSize: 11, padding: "2px 8px", borderRadius: 4,
              background: "rgba(128,128,128,0.12)",
              border: "0.5px solid rgba(128,128,128,0.2)",
              opacity: 0.6,
            }}>
              +{project.tools.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Key highlights button — opens modal */}
      <button
        onClick={() => onOpenModal(project)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", background: "none", border: "none",
          borderTop: `0.5px solid ${project.accentColor}22`,
          padding: "10px 14px", cursor: "pointer",
          fontSize: 12, fontFamily: "inherit", color: project.accentColor,
          textAlign: "left", flexShrink: 0,
          transition: "background 0.15s",
          opacity: 0.8,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = project.accentColor + "12";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "";
          e.currentTarget.style.opacity = "0.8";
        }}
      >
        <span style={{ fontWeight: 500 }}>View key highlights</span>
        <span style={{ fontSize: 16 }}>↗</span>
      </button>
    </li>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSelectBoxActive, setIsSelectBoxActive] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter(p => p.category === selectedCategory);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setIsSelectBoxActive(false);
  };

  return (
    <article className="portfolio active" data-page="portfolio">
      <style>{`
        @keyframes pfFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .pf-filter-btn {
          padding: 6px 16px;
          font-size: 13px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.14);
          background: transparent;
          color: inherit;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
          opacity: 0.55;
        }
        .pf-filter-btn:hover  { opacity: 1; border-color: rgba(255,255,255,0.3); }
        .pf-filter-btn.active {
          background: #EEEDFE;
          border-color: #7F77DD;
          color: #3C3489;
          opacity: 1;
          font-weight: 600;
        }
        .project-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          grid-auto-rows: 1fr;
          align-items: stretch;
          gap: 14px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>

      <header>
        <h2 className="h2 article-title">Projects</h2>
      </header>

      <section className="projects">
        <ul className="filter-list">
          {CATEGORIES.map(cat => (
            <li key={cat} className="filter-item">
              <button
                className={`pf-filter-btn${selectedCategory === cat ? " active" : ""}`}
                onClick={() => handleCategoryChange(cat)}
                data-filter-btn
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        <div className="filter-select-box">
          <button
            className={`filter-select ${isSelectBoxActive ? "active" : ""}`}
            onClick={() => setIsSelectBoxActive(v => !v)}
            data-select
          >
            <div className="select-value" data-select-value>{selectedCategory}</div>
            <div className="select-icon"><IoChevronDown className="ion-icon" /></div>
          </button>
          {isSelectBoxActive && (
            <ul className="select-list">
              {CATEGORIES.map(cat => (
                <li key={cat} className="select-item">
                  <button onClick={() => handleCategoryChange(cat)} data-select-item>{cat}</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p style={{ fontSize: 12, opacity: 0.38, margin: "0 0 1rem" }}>
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </p>

        <ul className="project-grid-new">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onOpenModal={setModalProject}
            />
          ))}
        </ul>
      </section>

      {/* Modal — rendered outside the grid, covers everything */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </article>
  );
}
