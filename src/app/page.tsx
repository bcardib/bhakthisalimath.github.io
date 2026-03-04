"use client";

import { useCallback, useEffect, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { homeCopy } from "@/data/home";

export default function HomePage() {
  const content = useMemo(
    () => ({
      hero: homeCopy.hero,
      about: homeCopy.about,
      education: homeCopy.education,
      featuredProjects: homeCopy.featuredProjects,
    }),
    []
  );

  const scrollToAbout = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById("home-projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

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
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section reveal-visible">
        {/* Background glows */}
        <div className="hero-bg">
          <div className="hero-bg-orb hero-bg-orb--left" />
          <div className="hero-bg-orb hero-bg-orb--right" />
          <div className="hero-bg-radial" />
          <div className="hero-bg-fade" />
        </div>

        {/* Main hero card */}
        <div className="hero-card">
          {/* Floating avatar */}
          <div className="hero-avatar-floating">
            <img
              src="/avatar/me1.jpg"
              alt="Bhakthi Salimath"
              className="hero-avatar-floating-img"
            />
          </div>

          {/* Greeting */}
          <header className="hero-header">
            <h1 className="hero-title">
              {content.hero.headline}{" "}
              <span className="hero-wave">{content.hero.wave}</span>
            </h1>
          </header>

          {/* Meta info */}
          <div className="hero-meta">
            <div className="hero-meta-row">
              <div className="hero-current">
                <span className="hero-rocket">🚀</span>
                <span>{content.hero.currently}</span>
              </div>
              <div className="hero-location">
                {content.hero.currentLocation}
              </div>
            </div>

            <p className="hero-role">{content.hero.currentRole}</p>
            <p className="hero-previous">{content.hero.previousTitle}</p>
          </div>

          {/* Creator line */}
          <p className="hero-creator">{content.hero.creator}</p>

          {/* Social links */}
          <div id="contact" className="hero-socials">
            {content.hero.socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hero-social-pill"
              >
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="hero-social-icon"
                  />
                )}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll arrow */}
        <button
          type="button"
          className="hero-scroll-button"
          onClick={scrollToAbout}
          aria-label={content.hero.arrowLabel}
        >
          <span className="hero-scroll-icon">↓</span>
        </button>
      </section>

      <section
        id="about"
        className="home-section home-section--paired reveal-on-scroll"
      >
        <header className="home-section-header">
          <h2 className="home-section-title">{content.about.title}</h2>
          <p className="home-section-subtitle">{content.about.subtitle}</p>
        </header>

        <div className="about-card reveal-on-scroll">
          <div className="about-card-head">
            <span className="section-kicker">{content.about.title}</span>
            <h3 className="about-card-title">
              {content.hero.headline} {content.hero.wave}
            </h3>
          </div>

          <div className="about-text">
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="about-facts">
            {content.about.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <button
            type="button"
            className="section-cta"
            onClick={scrollToProjects}
          >
            {content.about.cta}
          </button>
        </div>
      </section>

      <section
        id="education"
        className="home-section home-section--education reveal-on-scroll"
      >
        <header className="home-section-header">
          <h2 className="home-section-title">{content.education.title}</h2>
          <p className="home-section-subtitle">{content.education.subtitle}</p>
        </header>

        <div className="education-timeline">
          {content.education.items.map((item, index) => (
            <div
              key={item.school}
              className="education-timeline-item reveal-on-scroll"
            >
              <div className="education-timeline-marker">
                <span className="education-dot" />
                {index !== content.education.items.length - 1 && (
                  <span className="education-line" />
                )}
              </div>
              <div className="education-timeline-card">
                <div className="education-card-top">
                  <div>
                    <p className="education-card-degree">{item.degree}</p>
                    <p className="education-card-school">{item.school}</p>
                  </div>
                  <span className="info-card-pill">{item.period}</span>
                </div>
                <p className="education-card-body">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="home-projects"
        className="home-section home-section--projects reveal-on-scroll"
      >
        <header className="home-section-header">
          <h2 className="home-section-title">
            {content.featuredProjects.title}
          </h2>
          <p className="home-section-subtitle">
            {content.featuredProjects.subtitle}
          </p>
        </header>

        <div className="home-projects-grid">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="reveal-on-scroll">
              <ProjectCard
                project={project}
                linkLabel="View on GitHub →"
                compact
              />
            </div>
          ))}
        </div>

        <div className="home-section-footer">
          <a href="/projects" className="home-section-link">
            {content.featuredProjects.cta} →
          </a>
        </div>
      </section>
    </div>
  );
}
