import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  LockKeyhole,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { profile, projects, toolkit } from "./content";
import { ProjectArtwork } from "./ProjectArtwork";

type Section = "home" | "projects" | "contact";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      return localStorage.getItem("jericho-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [experienceTab, setExperienceTab] = useState<"work" | "education">(
    "work",
  );
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [portraitReady, setPortraitReady] = useState(true);
  const dialogTrigger = useRef<HTMLElement | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const mobileMenuTrigger = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#151515" : "#f7f6f2");
    try {
      localStorage.setItem("jericho-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);

  useEffect(() => {
    function updateActiveSection() {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8
      ) {
        setActiveSection("contact");
        return;
      }
      let current: Section = "home";
      for (const section of ["home", "projects", "contact"] as const) {
        const element = document.getElementById(section);
        if (
          element &&
          element.getBoundingClientRect().top <= window.innerHeight * 0.45
        ) {
          current = section;
        }
      }
      setActiveSection(current);
    }
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !contactOpen) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape" || contactOpen) return;
      event.preventDefault();
      setMobileNavOpen(false);
      mobileMenuTrigger.current?.focus();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileNavOpen, contactOpen]);

  function openContactDialog(trigger: HTMLElement) {
    dialogTrigger.current = trigger;
    setCopied(false);
    setCopyError(false);
    setContactOpen(true);
  }

  function closeDialog() {
    const trigger = dialogTrigger.current;
    dialogRef.current?.close();
    setContactOpen(false);
    setCopied(false);
    setCopyError(false);
    trigger?.focus({ preventScroll: true });
  }

  function navigate(section: Section) {
    setActiveSection(section);
    setMobileNavOpen(false);
    if (mobileNavOpen) {
      // Let the anchor finish its default navigation before moving keyboard focus.
      window.setTimeout(() => {
        document
          .getElementById(section)
          ?.querySelector<HTMLElement>("h1, h2")
          ?.focus({ preventScroll: true });
      }, 0);
    }
  }

  function handleBackgroundKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextTab: "work" | "education";
    if (event.key === "ArrowRight" || event.key === "ArrowLeft")
      nextTab = experienceTab === "work" ? "education" : "work";
    else if (event.key === "Home") nextTab = "work";
    else if (event.key === "End") nextTab = "education";
    else return;
    event.preventDefault();
    setExperienceTab(nextTab);
    document.getElementById(`${nextTab}-tab`)?.focus();
  }

  async function copyName() {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(profile.name);
      setCopied(true);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="header-inner">
          <a
            href="#home"
            className="wordmark"
            aria-label="Jericho home"
            onClick={() => navigate("home")}
          >
            jericho<span>.</span>
          </a>
          <nav
            ref={navigationRef}
            id="mobile-navigation"
            className={
              mobileNavOpen ? "navigation navigation-open" : "navigation"
            }
            aria-label="Main navigation"
          >
            {(["home", "projects", "contact"] as Section[]).map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={
                  activeSection === section ? "nav-link active" : "nav-link"
                }
                aria-current={
                  activeSection === section ? "location" : undefined
                }
                onClick={() => navigate(section)}
              >
                {section}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <span className="header-divider" />
            <button
              className="icon-button theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              ref={mobileMenuTrigger}
              className="icon-button mobile-menu"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="page-shell">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> MY LITTLE CORNER OF THE INTERNET
            </div>
            <h1 id="hero-title" tabIndex={-1}>
              hi, jericho here<span className="accent">.</span>
              <span className="wave" role="img" aria-label="Waving hand">
                👋
              </span>
            </h1>
            <div className="hero-name">
              {profile.name}
              <span className="name-line" />
            </div>
            <h2 className="hero-tagline">
              Curiosity. Creativity.
              <br />A little bit of code.
            </h2>
            <p className="hero-description">{profile.bio}</p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href="#projects"
                onClick={() => navigate("projects")}
              >
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a
                href={profile.github}
                className="button button-secondary"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <Github size={17} /> GitHub{" "}
                <ArrowUpRight size={14} className="muted-icon" />
              </a>
            </div>
            <a className="scroll-hint" href="#about">
              <ArrowDown size={14} /> A little more about me
            </a>
          </div>
          <div className="portrait-area">
            <div className="portrait-corner portrait-corner-top" />
            <div className="portrait-frame">
              {portraitReady ? (
                <img
                  src={profile.portrait}
                  onError={() => setPortraitReady(false)}
                  alt="AI-generated studio portrait of Jericho Ivan Villamor"
                  className="portrait"
                  width="1024"
                  height="1024"
                  fetchPriority="high"
                />
              ) : (
                <div
                  className="portrait-fallback"
                  aria-label="Jericho Ivan Villamor"
                >
                  JIV
                </div>
              )}
              <div className="portrait-caption">
                <span className="caption-dot" /> THE PERSON BEHIND THE PIXELS{" "}
                <ArrowUpRight size={13} />
              </div>
            </div>
            <div className="portrait-corner portrait-corner-bottom" />
            <div className="portrait-note">
              <ArrowDownLeft size={23} strokeWidth={1.2} />
              <span>yep, that’s me.</span>
            </div>
            <span className="portrait-index">01 / INTRODUCTION</span>
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <div>
              <div className="section-kicker">A BIT OF BACKGROUND</div>
              <h2 id="about-title">
                Every chapter counts<span className="accent">.</span>
              </h2>
            </div>
            <span className="section-number">01 — ABOUT</span>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <span className="small-star">
                <Sparkles size={23} strokeWidth={1.25} />
              </span>
              <h3>
                A person.
                <br />
                An ongoing story.
              </h3>
              <p>
                This is where I’ll share the journey — what I’m learning, what
                I’m working on, and the experiences along the way.
              </p>
              <div className="small-note">
                <span className="status-dot" /> More of my story, coming soon.
              </div>
            </div>
            <div className="experience-card">
              <div
                className="experience-tabs"
                role="tablist"
                aria-label="Background"
              >
                <button
                  id="work-tab"
                  role="tab"
                  aria-selected={experienceTab === "work"}
                  aria-controls="work-panel"
                  tabIndex={experienceTab === "work" ? 0 : -1}
                  className={
                    experienceTab === "work"
                      ? "experience-tab selected"
                      : "experience-tab"
                  }
                  onClick={() => setExperienceTab("work")}
                  onKeyDown={handleBackgroundKeyDown}
                >
                  <Code2 size={16} /> Work
                </button>
                <button
                  id="education-tab"
                  role="tab"
                  aria-selected={experienceTab === "education"}
                  aria-controls="education-panel"
                  tabIndex={experienceTab === "education" ? 0 : -1}
                  className={
                    experienceTab === "education"
                      ? "experience-tab selected"
                      : "experience-tab"
                  }
                  onClick={() => setExperienceTab("education")}
                  onKeyDown={handleBackgroundKeyDown}
                >
                  <BookOpen size={16} /> Education
                </button>
              </div>
              {(["work", "education"] as const).map((tab) => {
                const entries =
                  tab === "work" ? profile.work : profile.education;
                return (
                  <div
                    key={tab}
                    className="experience-content"
                    id={`${tab}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${tab}-tab`}
                    tabIndex={0}
                    hidden={experienceTab !== tab}
                  >
                    {entries.length > 0 ? (
                      <div className="timeline-items">
                        {entries.map((item) => (
                          <div
                            className="timeline-item"
                            key={`${item.title}-${item.period}`}
                          >
                            <div className="timeline-marker">
                              <span />
                            </div>
                            <div>
                              <span className="timeline-period">
                                {item.period}
                              </span>
                              <h3>{item.title}</h3>
                              <span className="timeline-type">
                                {item.organization}
                              </span>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="timeline-item">
                        <div className="timeline-marker">
                          <span />
                        </div>
                        <div>
                          <span className="timeline-period">
                            {tab === "work"
                              ? "THE NEXT CHAPTER"
                              : "ALWAYS LEARNING"}
                          </span>
                          <h3>
                            {tab === "work"
                              ? "Good things are taking shape."
                              : "A journey of curiosity."}
                          </h3>
                          <span className="timeline-type">
                            {tab === "work"
                              ? "Experience & milestones"
                              : "Education & learning"}
                          </span>
                          <p>
                            {tab === "work"
                              ? "My work history and experiences will live here. Check back soon for the full story."
                              : "My education, courses, and learning milestones will live here. More details are on the way."}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="experience-bottom">
                      <span className="tiny-dot" /> A story still being written{" "}
                      <span>↗</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="toolkit-section" aria-labelledby="toolkit-title">
          <div className="toolkit-intro">
            <h2 id="toolkit-title">
              Built with good tools<span className="accent">.</span>
            </h2>
            <p>The tools behind GIS and ATMS.</p>
          </div>
          <div className="toolkit-items">
            {toolkit.map((tool) => (
              <div className="tool-item" key={tool.name}>
                <div className="tool-icon" aria-hidden="true">
                  {tool.badge}
                </div>
                <div>
                  <h3>{tool.name}</h3>
                  <span>{tool.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="projects-section"
          aria-labelledby="projects-title"
        >
          <div className="section-heading projects-heading">
            <div>
              <div className="section-kicker">IDEAS, TURNED INTO SOMETHING</div>
              <h2 id="projects-title" tabIndex={-1}>
                Selected projects<span className="accent">.</span>
                <span className="section-subtitle">
                  A closer look at the things I build.
                </span>
              </h2>
            </div>
            <span className="section-number">02 — PROJECTS</span>
          </div>
          <div className="project-toolbar">
            <span className="projects-count">
              {String(projects.length).padStart(2, "0")} PROJECTS
            </span>
            <span className="project-privacy-note">
              <LockKeyhole size={13} aria-hidden="true" /> Private repositories
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card project-card--${project.artwork}`}
                aria-labelledby={`${project.id}-title`}
              >
                <header className="project-card-header">
                  <div className="project-topline">
                    <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3 id={`${project.id}-title`} className="project-title">
                    <span className="project-acronym">{project.shortName}</span>
                    <span className="project-name">{project.title}</span>
                  </h3>
                </header>
                <ProjectArtwork kind={project.artwork} />
                <div className="project-details">
                  <p className="project-description">{project.description}</p>
                  <div className="project-highlight">
                    <p>{project.highlight}</p>
                  </div>
                  <ul
                    className="project-tags"
                    aria-label={`${project.shortName} technologies`}
                  >
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="project-footer">
                    <span className="private-repo-label">
                      <LockKeyhole size={13} aria-hidden="true" /> Private repo
                    </span>
                    <span className="project-demo-note">No public demo</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a
            className="github-note"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={15} />
            <span>More code. More curiosity.</span> Find me on GitHub{" "}
            <ArrowUpRight size={15} />
          </a>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-topline">
            <span className="section-kicker">
              <span className="status-dot" /> GOOD THINGS START WITH A
              CONVERSATION
            </span>
            <span className="section-number">03 — CONTACT</span>
          </div>
          <div className="contact-content">
            <div>
              <h2 id="contact-title" tabIndex={-1}>
                Have something in mind<span className="accent">?</span>
              </h2>
              <p>A project, an idea, or just a hello. I’d love to hear it.</p>
            </div>
            {profile.email ? (
              <a
                className="button contact-button"
                href={`mailto:${profile.email}`}
              >
                Let’s talk <ArrowUpRight size={18} />
              </a>
            ) : (
              <button
                className="button contact-button"
                onClick={(event) => openContactDialog(event.currentTarget)}
              >
                Let’s connect <ArrowUpRight size={18} />
              </button>
            )}
          </div>
          <div className="contact-bottom">
            <span>{profile.name}</span>
            <span className="handwritten">
              on to the next good thing. <ArrowRight size={15} />
            </span>
          </div>
        </section>
      </main>

      <footer className="footer page-shell">
        <div>
          <a
            href="#home"
            className="footer-wordmark"
            onClick={() => navigate("home")}
          >
            jericho<span>.</span>
          </a>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
        <div className="footer-right">
          <span>Made with curiosity & a little code.</span>
          <a
            className="icon-button"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            className="icon-button back-top"
            href="#home"
            aria-label="Back to top"
            onClick={() => navigate("home")}
          >
            <ArrowUp size={17} />
          </a>
        </div>
      </footer>

      {contactOpen && (
        <dialog
          ref={dialogRef}
          className="contact-dialog"
          aria-labelledby="dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            closeDialog();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <button
            className="icon-button dialog-close"
            aria-label="Close dialog"
            onClick={closeDialog}
          >
            <X size={20} />
          </button>
          <div className="dialog-icon">
            <Sparkles size={25} />
          </div>
          <span className="section-kicker">LET’S KEEP IN TOUCH</span>
          <h2 id="dialog-title">
            Hello, from Jericho<span className="accent">.</span>
          </h2>
          <p>
            My contact details are coming soon. In the meantime, you can explore
            GitHub or save my name for later.
          </p>
          <a
            className="button button-primary dialog-action"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            Explore GitHub <ExternalLink size={16} />
          </a>
          <button
            className="button button-secondary copy-button"
            onClick={copyName}
          >
            {copied ? (
              <>
                <Check size={16} /> Name copied
              </>
            ) : (
              <>
                Copy my name <ChevronRight size={16} />
              </>
            )}
          </button>
          <span className="copy-status" role="status" aria-live="polite">
            {copied
              ? `${profile.name} copied to clipboard.`
              : copyError
                ? `Could not copy the name. You can select and copy ${profile.name} instead.`
                : ""}
          </span>
        </dialog>
      )}
    </>
  );
}

export default App;
