import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  FileText,
  Github,
  Linkedin,
  LockKeyhole,
  Mail,
  Menu,
  Moon,
  Plug,
  Server,
  Sparkles,
  Sun,
  Trophy,
  Wrench,
  X,
} from "lucide-react";
import { profile, projects, toolkitGroups, trainingCertificates } from "./content";

type Section = "home" | "projects" | "contact";

const toolkitIcons = {
  ai: Bot,
  frontend: Wrench,
  backend: Server,
  database: Database,
  cloud: Cloud,
  integrations: Plug,
};

const issueYearFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  timeZone: "UTC",
});

function SocialLinks({
  showLabels = false,
  showLinkedIn = true,
}: {
  showLabels?: boolean;
  showLinkedIn?: boolean;
}) {
  const links = [
    { label: "GitHub", href: profile.github, icon: Github, external: true },
    ...(showLinkedIn
      ? [{ label: "LinkedIn", href: profile.linkedin, icon: Linkedin, external: true }]
      : []),
    ...(profile.email
      ? [{ label: "Email", href: `mailto:${profile.email}`, icon: Mail, external: false }]
      : []),
  ];

  return (
    <nav
      className={showLabels ? "contact-social-list" : "social-links"}
      aria-label={showLabels ? "Ways to get in touch" : "Social and contact links"}
    >
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            key={link.label}
            className={showLabels ? "contact-social-link" : "icon-button"}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={link.label === "Email" ? `Email ${profile.name}` : link.label}
            title={link.label === "Email" ? profile.email ?? undefined : link.label}
          >
            {showLabels ? (
              <>
                <span className="contact-social-icon">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <span>{link.label}</span>
              </>
            ) : (
              <Icon size={17} aria-hidden="true" />
            )}
          </a>
        );
      })}
    </nav>
  );
}

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
  const contactValue = profile.email ?? profile.name;
  const contactLabel = profile.email ? "email" : "name";
  const resumeRequestLink = profile.email
    ? `mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}&body=${encodeURIComponent("Hi Jericho,\n\nI would like to request a copy of your resume.\n\nThank you.")}`
    : null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#151515" : "#f5f5f5");
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

  async function copyContact() {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(contactValue);
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
            <h2 className="hero-tagline">Full Stack Developer</h2>
            <p className="hero-description">{profile.bio}</p>
            <p className="hero-escalation">
              For escalations, please contact{" "}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jericho Villamor on LinkedIn"
              >
                Jericho Villamor
              </a>
              .
            </p>
            <div className="hero-actions">
              <div className="hero-contact-links">
                {resumeRequestLink ? (
                  <a
                    href={resumeRequestLink}
                    className="button button-secondary resume-button"
                    aria-label="Request Jericho Ivan Villamor's resume by email"
                  >
                    Request Resume <FileText size={16} aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="button button-secondary resume-button"
                    aria-haspopup="dialog"
                    onClick={(event) => openContactDialog(event.currentTarget)}
                  >
                    Request Resume
                    <FileText size={16} aria-hidden="true" />
                  </button>
                )}
                <SocialLinks />
              </div>
            </div>
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
          </div>
        </section>

        <section
          id="about"
          className="experience-section"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <div>
              <h2 id="experience-title">
                Experience & education<span className="accent">.</span>
              </h2>
            </div>
            <span className="section-number">01 — EXPERIENCE</span>
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
                        {entries.map((item, index) => {
                          const certificates =
                            tab === "education" && index === 0
                              ? trainingCertificates
                              : [];
                          const hasHighlights =
                            Boolean(item.highlights?.length) || certificates.length > 0;

                          return (
                            <div
                              className={
                                tab === "work"
                                  ? "timeline-item timeline-item-work"
                                  : item.logo
                                    ? "timeline-item timeline-item-with-logo"
                                    : "timeline-item"
                              }
                              key={`${item.organization}-${item.title}-${item.period}`}
                            >
                              <div className="timeline-marker">
                                {tab === "work" ? (
                                  <span
                                    className="timeline-initials"
                                    aria-hidden="true"
                                  >
                                    {item.initials ??
                                      item.organization
                                        .split(/\s+/)
                                        .slice(0, 2)
                                        .map((word) => word[0])
                                        .join("")
                                        .toUpperCase()}
                                  </span>
                                ) : item.logo ? (
                                  <img
                                    className="timeline-logo"
                                    src={item.logo}
                                    alt={`${item.title} logo`}
                                    width="44"
                                    height="44"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                ) : (
                                  <span />
                                )}
                              </div>
                              <div className="timeline-copy">
                                <span className="timeline-period">
                                  {item.period}
                                </span>
                                <h3>
                                  {tab === "work" ? item.organization : item.title}
                                </h3>
                                <span className="timeline-type">
                                  {tab === "work" ? item.title : item.organization}
                                </span>
                                {item.description && <p>{item.description}</p>}
                                {hasHighlights && (
                                  <ul
                                    className="timeline-highlights"
                                    id={certificates.length > 0 ? "training" : undefined}
                                  >
                                    {item.highlights?.map((highlight) => (
                                      <li key={highlight}>{highlight}</li>
                                    ))}
                                    {certificates.map((certificate) => (
                                      <li key={certificate.id}>
                                        {certificate.title} — {certificate.issuer}{" "}
                                        {certificate.kind.toLowerCase()} (
                                        <time dateTime={certificate.issuedOn}>
                                          {issueYearFormat.format(
                                            new Date(certificate.issuedOn),
                                          )}
                                        </time>
                                        ).
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          );
                        })}
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
                    {entries.length === 0 && (
                      <div className="experience-bottom">
                        <span className="tiny-dot" /> A story still being written{" "}
                        <span>↗</span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>

        <section id="tools" className="toolkit-section" aria-labelledby="toolkit-title">
          <div className="toolkit-intro">
            <h2 id="toolkit-title">
              Built with good tools<span className="accent">.</span>
            </h2>
            <p>The tools behind my projects.</p>
          </div>
          <div className="toolkit-grid">
            {toolkitGroups.map((group) => {
              const Icon = toolkitIcons[group.icon];

              return (
                <article
                  className="toolkit-card"
                  key={group.id}
                  aria-labelledby={`toolkit-${group.id}-title`}
                >
                  <header className="toolkit-card-header">
                    <span className="toolkit-card-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <h3 id={`toolkit-${group.id}-title`}>{group.title}</h3>
                  </header>
                  <ul className="toolkit-tags" aria-label={`${group.title} tools`}>
                    {group.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
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
                className="project-card"
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
                <div className="project-details">
                  <ul
                    className="project-tags"
                    aria-label={`${project.shortName} technologies`}
                  >
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="project-description">{project.description}</p>
                  <div className="project-highlight">
                    <Trophy size={17} strokeWidth={1.5} aria-hidden="true" />
                    <p>{project.highlight}</p>
                  </div>
                  <div className="project-footer">
                    <button
                      type="button"
                      className="private-repo-button"
                      aria-haspopup="dialog"
                      aria-label={`Contact Jericho about the ${project.shortName} private repository`}
                      onClick={(event) => openContactDialog(event.currentTarget)}
                    >
                      <Github size={15} aria-hidden="true" />
                      Private Repo – Contact Dev
                    </button>
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
          <h2 id="contact-title" tabIndex={-1}>
            get in touch.
          </h2>
          <p className="contact-intro">
            Open to engineering roles, freelance projects, and technical
            collaborations. Let’s build something.
          </p>
          <div className="contact-columns">
            <div className="contact-socials">
              <h3>socials</h3>
              <SocialLinks showLabels />
            </div>
            <div className="contact-direct">
              <h3>direct email</h3>
              <p>
                For opportunities, project enquiries, or a copy of my résumé,
                send me a message.
              </p>
              {profile.email ? (
                <a className="contact-button" href={`mailto:${profile.email}`}>
                  <Mail size={16} aria-hidden="true" /> Say Hello
                </a>
              ) : (
                <button
                  type="button"
                  className="contact-button"
                  onClick={(event) => openContactDialog(event.currentTarget)}
                >
                  <Mail size={16} aria-hidden="true" /> Say Hello
                </button>
              )}
            </div>
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
          <SocialLinks />
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
            Have a project in mind or want to discuss a private repository?{" "}
            {profile.email ? (
              <>
                Reach me at{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </>
            ) : (
              "Find me on LinkedIn or GitHub to start a conversation."
            )}
          </p>
          <SocialLinks />
          <a
            className="button button-primary dialog-action"
            href={profile.email ? `mailto:${profile.email}` : profile.linkedin}
          >
            {profile.email ? "Email me" : "Find me on LinkedIn"}{" "}
            {profile.email ? <Mail size={16} /> : <Linkedin size={16} />}
          </a>
          <button
            className="button button-secondary copy-button"
            onClick={copyContact}
          >
            {copied ? (
              <>
                <Check size={16} />{" "}
                {profile.email ? "Email copied" : "Name copied"}
              </>
            ) : (
              <>
                {profile.email ? "Copy email" : "Copy my name"}{" "}
                <ChevronRight size={16} />
              </>
            )}
          </button>
          <span className="copy-status" role="status" aria-live="polite">
            {copied
              ? `${contactValue} copied to clipboard.`
              : copyError
                ? `Could not copy the ${contactLabel}. You can select and copy ${contactValue} instead.`
                : ""}
          </span>
        </dialog>
      )}
    </>
  );
}

export default App;
