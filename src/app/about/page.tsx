"use client";

import Link from "next/link";
import { useEffect } from "react";
import { aboutCopy } from "@/data/about";

export default function AboutPage() {
  const copy = aboutCopy;

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll")
    );
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      <section className="home-section home-section--paired reveal-on-scroll">
        <header className="home-section-header">
          <h1 className="home-section-title">{copy.title}</h1>
          <p className="home-section-subtitle">{copy.subtitle}</p>
        </header>

        <div className="about-card reveal-on-scroll">
          <div className="about-card-head">
            <span className="section-kicker">{copy.title}</span>
            <h2 className="about-card-title">Bhakthi Salimath 👋</h2>
          </div>

          <div className="about-text">
            {copy.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="about-facts-heading">{copy.factsTitle}</h3>
          <ul className="about-facts">
            {copy.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <div className="about-page-cta">
            <Link href="/" className="section-cta">
              Back to home
            </Link>
            <Link href="/projects" className="section-cta">
              View projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
