/*
"use client";

import "@/app/globals.css";

export default function Skills() {
  return (
    <article className="resume active" data-page="skills">
      <header>
        <h2 className="h2 article-title">Skills</h2>
      </header>

      <section className="skill">
        <h3 className="h3 skills-title">Technical Skills</h3>

        <ul className="skills-list content-card">
          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Python</h5>
              <data value="90">90%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Java</h5>
              <data value="82">82%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">SQL</h5>
              <data value="90">90%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">C++</h5>
              <data value="78">78%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Flask</h5>
              <data value="85">85%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Databricks</h5>
              <data value="80">80%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Spark</h5>
              <data value="78">78%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">MySQL</h5>
              <data value="84">84%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">PostgreSQL</h5>
              <data value="82">82%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Docker</h5>
              <data value="80">80%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Kubernetes</h5>
              <data value="75">75%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">CI/CD</h5>
              <data value="78">78%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Machine Learning</h5>
              <data value="75">75%</data>
            </div>
          </li>

          <li className="skills-item">
            <div className="title-wrapper">
              <h5 className="h5">Data Structures & Algorithms</h5>
              <data value="80">80%</data>
            </div>
          </li>
        </ul>

      </section>
    </article>
  );
}

*/

"use client";

import { useState, useEffect } from "react";

const SKILLS = [
  { name: "Python",              pct: 90, cat: "lang",    icon: "🐍" },
  { name: "Java",                pct: 82, cat: "lang",    icon: "☕" },
  { name: "SQL",                 pct: 90, cat: "lang",    icon: "🗄️" },
  { name: "C++",                 pct: 78, cat: "lang",    icon: "⚙️" },
  { name: "Bash / Shell",        pct: 76, cat: "lang",    icon: "🖥️" },
  { name: "TypeScript",          pct: 80, cat: "lang",    icon: "🔷" },
  { name: "Flask",               pct: 85, cat: "backend", icon: "🧪" },
  { name: "FastAPI",             pct: 84, cat: "backend", icon: "⚡" },
  { name: "REST APIs",           pct: 88, cat: "backend", icon: "🔌" },
  { name: "Node.js",             pct: 82, cat: "backend", icon: "🟩" },
  { name: "Express.js",          pct: 80, cat: "backend", icon: "🚂" },
  { name: "React",               pct: 83, cat: "backend", icon: "⚛️" },
  { name: "WebSocket",           pct: 75, cat: "backend", icon: "🌐" },
  { name: "Apache Spark",        pct: 78, cat: "data",    icon: "🔥" },
  { name: "PostgreSQL",          pct: 82, cat: "data",    icon: "🐘" },
  { name: "MySQL",               pct: 84, cat: "data",    icon: "🐬" },
  { name: "MongoDB",             pct: 79, cat: "data",    icon: "🍃" },
  { name: "Redis",               pct: 76, cat: "data",    icon: "🔴" },
  { name: "SQLite",              pct: 80, cat: "data",    icon: "📦" },
  { name: "ETL Pipelines",       pct: 82, cat: "data",    icon: "🔄" },
  { name: "AWS (EC2/S3/λ)",      pct: 80, cat: "cloud",   icon: "☁️" },
  { name: "Docker",              pct: 80, cat: "cloud",   icon: "🐳" },
  { name: "Kubernetes",          pct: 75, cat: "cloud",   icon: "⎈" },
  { name: "Terraform",           pct: 78, cat: "cloud",   icon: "🏗️" },
  { name: "CI/CD",               pct: 80, cat: "devops",  icon: "🔁" },
  { name: "Git & GitHub",        pct: 88, cat: "devops",  icon: "🐙" },
  { name: "Microservices",       pct: 80, cat: "devops",  icon: "🧩" },
  { name: "Agile / Scrum",       pct: 85, cat: "devops",  icon: "📋" },
  { name: "Data Structures",     pct: 82, cat: "ml",      icon: "🌲" },
  { name: "Algorithms",          pct: 80, cat: "ml",      icon: "📐" },
  { name: "ML / AI Integration", pct: 76, cat: "ml",      icon: "🤖" },
  { name: "OOP & Design Patterns", pct: 84, cat: "ml",   icon: "🏛️" },
];

const FILTERS = [
  { id: "all",     label: "All" },
  { id: "lang",    label: "Languages" },
  { id: "backend", label: "Web & APIs" },
  { id: "data",    label: "Data & Databases" },
  { id: "cloud",   label: "Cloud & Infra" },
  { id: "devops",  label: "DevOps" },
  { id: "ml",      label: "ML & Algorithms" },
];

const TAG_STYLES = {
  lang:    { label: "Language",  bg: "var(--tag-lang-bg)",    color: "var(--tag-lang-text)"    },
  backend: { label: "Web / API", bg: "var(--tag-backend-bg)", color: "var(--tag-backend-text)" },
  cloud:   { label: "Cloud",     bg: "var(--tag-cloud-bg)",   color: "var(--tag-cloud-text)"   },
  data:    { label: "Data",      bg: "var(--tag-data-bg)",    color: "var(--tag-data-text)"    },
  devops:  { label: "DevOps",    bg: "var(--tag-devops-bg)",  color: "var(--tag-devops-text)"  },
  ml:      { label: "ML / Algo", bg: "var(--tag-ml-bg)",      color: "var(--tag-ml-text)"      },
};

const BAR_COLORS = {
  lang:    "#7F77DD",
  backend: "#1D9E75",
  data:    "#BA7517",
  cloud:   "#378ADD",
  devops:  "#639922",
  ml:      "#D4537E",
};

const HIGHLIGHT_CHIPS = [
  { label: "React",             icon: "⚛️" },
  { label: "FastAPI",           icon: "⚡" },
  { label: "PostgreSQL",        icon: "🐘" },
  { label: "AWS",               icon: "☁️" },
  { label: "Docker",            icon: "🐳" },
  { label: "Anthropic Claude API", icon: "🤖" },
  { label: "TypeScript",        icon: "🔷" },
  { label: "Apache Spark",      icon: "🔥" },
];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const visibleSkills = activeFilter === "all"
    ? SKILLS
    : SKILLS.filter(s => s.cat === activeFilter);

  return (
    <article className="resume active" data-page="skills">
      {/* CSS custom properties — adjust to match your existing palette */}
      <style>{`
        :root {
          --tag-lang-bg:    #EEEDFE; --tag-lang-text:    #3C3489;
          --tag-backend-bg: #E1F5EE; --tag-backend-text: #085041;
          --tag-cloud-bg:   #E6F1FB; --tag-cloud-text:   #0C447C;
          --tag-data-bg:    #FAEEDA; --tag-data-text:    #633806;
          --tag-devops-bg:  #EAF3DE; --tag-devops-text:  #27500A;
          --tag-ml-bg:      #FBEAF0; --tag-ml-text:      #72243E;
        }

        .skills-filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .skills-filter-btn {
          padding: 6px 14px;
          font-size: 13px;
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.15);
          background: transparent;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
          color: inherit;
          opacity: 0.7;
        }

        .skills-filter-btn:hover {
          opacity: 1;
          border-color: rgba(0,0,0,0.3);
        }

        .skills-filter-btn.active {
          background: #EEEDFE;
          border-color: #7F77DD;
          color: #3C3489;
          font-weight: 600;
          opacity: 1;
        }

        .skills-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 10px;
        }

        .skill-card {
          background: var(--eerie-black-2, #1e1e1e);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px;
          transition: border-color 0.15s, transform 0.15s;
          animation: skillFadeIn 0.3s ease both;
        }

        .skill-card:hover {
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        @keyframes skillFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .skill-card-icon {
          font-size: 20px;
          margin-bottom: 8px;
          display: block;
        }

        .skill-card-name {
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .skill-bar-track {
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-tag {
          display: inline-block;
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 20px;
          margin-top: 8px;
          font-weight: 500;
        }

        .skills-highlight-section {
          margin-top: 2rem;
        }

        .skills-section-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.45;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .highlight-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .highlight-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          font-size: 12px;
          opacity: 0.8;
          transition: opacity 0.15s, border-color 0.15s;
        }

        .highlight-chip:hover {
          opacity: 1;
          border-color: rgba(255,255,255,0.2);
        }
      `}</style>

      <header>
        <h2 className="h2 article-title">Skills</h2>
      </header>

      <section className="skill">
        {/* Filter buttons */}
        <div className="skills-filter-bar">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`skills-filter-btn${activeFilter === f.id ? " active" : ""}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <div className="skills-card-grid">
          {visibleSkills.map((s, i) => {
            const tag = TAG_STYLES[s.cat];
            return (
              <div
                key={s.name}
                className="skill-card"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="skill-card-icon">{s.icon}</span>
                <div className="skill-card-name">{s.name}</div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: animated ? `${s.pct}%` : "0%",
                      background: BAR_COLORS[s.cat],
                    }}
                  />
                </div>
                <span
                  className="skill-tag"
                  style={{ background: tag.bg, color: tag.color }}
                >
                  {tag.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Production highlights */}
        <div className="skills-highlight-section">
          <div className="skills-section-label">Used in production projects</div>
          <div className="highlight-chips-row">
            {HIGHLIGHT_CHIPS.map(c => (
              <div key={c.label} className="highlight-chip">
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
