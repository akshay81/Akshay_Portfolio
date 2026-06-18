"use client";

import { IoPaperPlane, IoCheckmarkCircle } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    fullname: "",
    email: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  // Validate form whenever inputs change
  useEffect(() => {
    if (formRef.current) {
      setIsFormValid(formRef.current.checkValidity());
    }
  }, [formState]);

  // Handle input field updates
  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });

        const result = await response.json();

        if (result.success) {
          // Clear form after successful send
          setFormState({ fullname: "", email: "", message: "" });
          setIsMessageSent(true);
          setTimeout(() => setIsMessageSent(false), 5000);
        } else {
          alert("⚠️ Failed: " + (result.error || "Please try again later."));
        }
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        alert("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <article className="contact active" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="contact-form">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          action="#"
          className="form"
          data-form
        >
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              value={formState.fullname}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
            />
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
            />
          </div>

          <textarea
            name="message"
            value={formState.message}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Your Message"
            required
            data-form-input
          ></textarea>

          <button
            className="form-btn"
            type="submit"
            disabled={!isFormValid || isLoading}
            data-form-btn
          >
            {isLoading ? (
              <IoPaperPlane className="ion-icon animate-pulse" />
            ) : isMessageSent ? (
              <IoCheckmarkCircle className="ion-icon text-green-400" />
            ) : (
              <IoPaperPlane className="ion-icon" />
            )}
            <span>
              {isLoading
                ? "Sending..."
                : isMessageSent
                ? "Message Sent!"
                : "Send Message"}
            </span>
          </button>
        </form>
      </section>
    </article>
  );
}
