"use client"

import "@/app/globals.css";
import {
  IoChevronDown,
  IoLocationOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoDownloadOutline,
} from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import MyImage from "../components/Image";
import avatar from "@/public/my-avatar.jpg";
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function SideBar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  return (
    <aside className={isActive ? 'sidebar active' : 'sidebar'} data-sidebar>

      <div className="sidebar-info">

        <figure className="avatar-box">
          <MyImage src={avatar} alt="Akshay Ajay Sharma" width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title="Akshay Ajay Sharma">Akshay A Sharma</h1>

          <p className="title text-lg font-medium">
            <TypeAnimation
              sequence={[
                'Software Developer', 2000,
                'Backend Developer', 2000,
                'Frontend Developer', 2000,
                'AI Developer', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
        </div>

        <button onClick={toggleActive} className="info_more-btn">
          <span>Show Contacts</span>
          <IoChevronDown className="ion-icon" />
        </button>

        {/* ── Download Resume button ── */}
        <a
href="/AKSHAY_AJAY_SHARMA_Resume.pdf"
  download="Akshay_Ajay_Sharma_Resume.pdf"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    margin: "12px 0 0",        // ← removed side margins so it stretches full width
    padding: "12px 0",         // ← taller button
    borderRadius: 10,
    background: "transparent", // ← transparent background
    color: "var(--orange-yellow-crayola, #e8a04a)", // ← matches vCard accent gold
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    border: "1px solid var(--orange-yellow-crayola, #e8a04a)", // ← outlined style
    width: "100%",             // ← full width like the Show Contacts button
    transition: "background 0.15s, color 0.15s, transform 0.15s",
    boxSizing: "border-box",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = "var(--orange-yellow-crayola, #e8a04a)";
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.transform = "translateY(-1px)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "var(--orange-yellow-crayola, #e8a04a)";
    e.currentTarget.style.transform = "";
  }}
>
  <IoDownloadOutline style={{ fontSize: 17 }} />
  Download Resume
</a>

      </div>

      <div className="sidebar-info_more">
        <br />
        <ul className="contacts-list">

          <li className="contact-item">
            <div className="icon-box">
              <IoMailOutline />
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:akshaysharmawork11@gmail.com" className="contact-link">
                akshaysharmawork11@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <IoPhonePortraitOutline />
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+18726640766" className="contact-link">+1 8726640766</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <IoLocationOutline />
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>United States</address>
            </div>
          </li>

        </ul>

        <div className="separator"></div>

        <ul className="social-list">

          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/AKSHAY-AJAY-SHARMA"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoLinkedin />
            </a>
          </li>

          <li className="social-item">
            <a
              href="https://github.com/akshay81"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoGithub />
            </a>
          </li>

          <li className="social-item">
            <a href="mailto:akshaysharmawork11@gmail.com" className="social-link">
              <FaEnvelope />
            </a>
          </li>

        </ul>
      </div>

    </aside>
  );
}
