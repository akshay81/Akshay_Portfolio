"use client";

import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  IoPersonOutline,
  IoDocumentTextOutline,
  IoCodeSlashOutline,
  IoGridOutline,
  IoMailOutline,
} from "react-icons/io5";

const NAV_ITEMS = [
  { label: "About",    href: "/",          Icon: IoPersonOutline       },
  { label: "Resume",   href: "/resume",    Icon: IoDocumentTextOutline },
  { label: "Skills",   href: "/skills",    Icon: IoCodeSlashOutline    },
  { label: "Projects", href: "/portfolio", Icon: IoGridOutline         },
  { label: "Contact",  href: "/contact",   Icon: IoMailOutline         },
];

export default function NavBar() {
  const pathname  = usePathname();
  const navRef    = useRef(null);
  const [bar, setBar]       = useState({ left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  // Only run on client — avoids hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector("[data-active='true']");
    if (!active) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    setBar({
      left:  btnRect.left - navRect.left + 6,
      width: btnRect.width - 12,
    });
  }, [pathname, mounted]);

  return (
    <nav className="navbar">
      <ul
        ref={navRef}
        className="navbar-list"
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 2,
          borderRadius: 12,
          padding: 4,
          position: "relative",
          listStyle: "none",
          margin: 0,
          width: "100%",
        }}
      >
        {/* Sliding bottom bar — only rendered client-side */}
        {mounted && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              height: 2.5,
              background: "#7F77DD",
              borderRadius: "2px 2px 0 0",
              pointerEvents: "none",
              zIndex: 0,
              left: bar.left,
              width: bar.width,
              transition: "left 0.3s cubic-bezier(0.34,1.3,0.64,1), width 0.3s cubic-bezier(0.34,1.3,0.64,1)",
            }}
          />
        )}

        {NAV_ITEMS.map(({ label, href, Icon }) => {
          const isActive = pathname === href;
          return (
            <li
              key={href}
              className="navbar-item"
              style={{ flex: 1, display: "flex" }}
            >
              <Link
                href={href}
                data-active={String(isActive)}
                data-nav-link
                className="navbar-link"
                style={{
                  flex: 1,
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "10px 8px 8px",
                  borderRadius: 9,
                  fontSize: 11,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#7F77DD" : "var(--light-gray)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s, background 0.15s",
                  background: isActive ? "#EEEDFE18" : "transparent",
                }}
              >
                <Icon style={{ fontSize: 18 }} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
