/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL CONTENT CONFIG
 *  Edit this one file to update your name, role, links, and
 *  key stats everywhere on the portfolio at once.
 * ─────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Kaushar Halani",
  initials: "KH",

  role: {
    current: "Aspiring Data Analyst",
    path: "Data Analyst → Data Engineer → Data Scientist / AI-ML Engineer",
    badge: "Target Role: Data Analyst (Path to Data Engineer and Data Scientist)",
    openTo: "Open to internships, entry-level, and freelance data roles",
  },

  tagline: "Aspiring Data Analyst Building Toward Data Engineering & Data Science",

  bio: "I transform raw data into decision-ready insights through practical analysis, dashboarding, and reproducible workflows while growing into end-to-end data and ML engineering.",

  /** ── Update these with your real URLs ── */
  links: {
    linkedin:  "https://www.linkedin.com/in/your-linkedin-handle",   // TODO: replace
    github:    "https://github.com/your-github-handle",              // TODO: replace
    twitter:   "",                                                    // optional
    email:     "",                                                    // TODO: add your email
    resume:    "/resume",
    profile:   "/profile",
  },

  /** ── Hero stats — replace with real numbers when ready ── */
  stats: [
    { value: "4",  label: "Projects" },
    { value: "23", label: "Technologies" },
    { value: "3",  label: "Languages" },
    { value: "2",  label: "Experience Entries" },
  ],

  /** ── SEO ── */
  seo: {
    title: "Kaushar Halani — Data Analyst | Data Engineer | Data Scientist",
    description:
      "Aspiring Data Analyst building toward Data Engineering and Data Science. Projects in churn prediction, sentiment analysis, sales forecasting, and housing price modelling.",
    url: "https://kausharhalani.replit.app/",
  },
} as const;
