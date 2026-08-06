# NovaAI — Responsive Landing Page

A production-ready, responsive landing page for **NovaAI**, a fictional AI operations
SaaS startup. Built with plain **HTML5, CSS3, and vanilla JavaScript (ES6)** — no
frameworks, no build step, no dependencies.

![Tech](https://img.shields.io/badge/HTML5-E34F26?style=flat)
![Tech](https://img.shields.io/badge/CSS3-1572B6?style=flat)
![Tech](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat)

---

## 🔗 Live Demo

```
https://nova-ai-landing-page-ap.vercel.app/

https://awadhlal.github.io/LANDING-PAGE-NovaAI/

```

---

## Project Overview

NovaAI's landing page is designed as a dark-themed, glassmorphic marketing site for
an AI automation platform. It communicates the product's value proposition (automate
repetitive workflows, unify team data, move faster) through a hero section with a
live animated neural-network canvas, feature highlights, social proof, pricing,
testimonials, FAQ, and a working contact form — all fully responsive and built
mobile-first.

**Design language:** deep indigo-violet background, a violet → cyan signal gradient,
sparing amber highlights, `Space Grotesk` for display type, `Inter` for body copy,
and `JetBrains Mono` for data/labels — paired with glassmorphism panels, floating
gradient orbs, and scroll-triggered reveal animations.

---

## Features

- **Sticky, responsive navigation bar** with logo, anchor links, CTA button, and an
  animated mobile hamburger menu
- **Hero section** with animated gradient background, floating glow shapes, a
  canvas-based neural-network particle animation that reacts to the cursor, and a
  glassmorphic workflow preview card
- **6 feature cards** — AI Automation, Cloud Storage, Analytics, Team Collaboration,
  Security, 24/7 Support — with custom SVG icons and hover effects
- **About section** with a company summary and an illustrated placeholder graphic
- **Animated statistics counters** (10K+ Users, 250+ Companies, 99.9% Uptime, 24/7
  Support) that count up when scrolled into view
- **Three-tier pricing section** (Starter / Pro / Enterprise) with the Pro plan
  visually highlighted
- **Testimonials** with gradient avatar placeholders
- **FAQ accordion** built with vanilla JavaScript (single-open behavior, accessible
  `aria-expanded` states)
- **Contact form** with client-side validation (required fields, email format,
  minimum message length) and inline error/success messaging — no backend required
- **Scroll progress bar**, **navbar shadow on scroll**, **smooth scrolling**,
  **scroll-reveal animations**, and a **back-to-top** button
- Fully **responsive** (mobile-first) down to small phone widths
- **Accessible**: semantic landmarks, visible focus states, `aria-*` attributes on
  interactive elements, and `prefers-reduced-motion` support
- **SEO-friendly** semantic HTML with meta description and Open Graph tags

---

## Folder Structure

```
LANDING-PAGE-NovaAI/
├── index.html      # Semantic markup for all sections
├── style.css        # Design tokens, layout, animations, responsive rules
├── script.js         # Vanilla JS: nav, accordion, counters, canvas, form validation
└── README.md          # Project documentation (this file)
```

---

## Technologies Used

| Technology        | Purpose                                              |
|--------------------|-------------------------------------------------------|
| HTML5              | Semantic structure and accessibility                 |
| CSS3               | Custom properties, Flexbox, Grid, animations, glassmorphism |
| JavaScript (ES6)   | DOM interactivity, IntersectionObserver, Canvas API   |
| Google Fonts       | Space Grotesk, Inter, JetBrains Mono                  |

No frameworks (React, Bootstrap, Tailwind) or libraries (jQuery) are used, per the
task requirements.

---

## Installation

1. **Download or clone the project**

   ```bash
   git clone https://github.com/AwadhLal/LANDING-PAGE-NovaAI.git
   cd LANDING-PAGE-NovaAI
   ```

2. **Open it locally** — no build step or dependencies are required.

   - Easiest: double-click `index.html` to open it in your browser.

---

## Browser Support

Tested on the latest versions of Chrome, Firefox, Edge, and Safari. The site uses
`backdrop-filter` for glassmorphism (gracefully degrades to a solid panel on older
browsers) and the `IntersectionObserver` and `Canvas` APIs, both widely supported in
modern browsers.

---

## License

This project was built for educational purposes as part of the Novexa Technologies
Full Stack Development internship task. Free to use and adapt.
