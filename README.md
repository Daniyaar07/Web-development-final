# MODANOVA — E-Commerce Web Application (Midterm Project)

Group: SE-2527

Authors: Mansur Nursultanov, Daniyar Baikanov, Temkeshev Aldiyar

Live Demo: https://glore81.github.io/Web-development-midterm/

## Project Overview
MODANOVA is a multi-page responsive website for a contemporary online store offering high-quality basic and trend-focused everyday apparel. Developed as a university midterm submission, the project demonstrates proficiency in semantic HTML5, modern CSS techniques (Flexbox, CSS Grid, Positioning, custom Media Queries), and responsive layouts built with the Bootstrap 5 framework.

## Structure & Pages (5 Pages)
The web application includes five fully styled pages connected by a consistent navigation bar and shared design system

- **Home (`index.html`)** — Entry page featuring a hero promotional banner, quick search bar, and highlighted new arrivals.

- **Catalogue (`catalogue.html`)** — Product catalog equipped with category filter controls, instant search input, and an adaptive product display grid.

- **Product Page (`productpg.html`)** — Single item page with image gallery views, size and color selectors, delivery policies, and cart action buttons.

- **About Us (`about.html`)** — Brand presentation detailing corporate mission, wardrobe concepts, and visual store showcase layouts.

- **Contact (`contact.html`)** — Feedback page with a validated inquiry form, CSS-positioned store location map, direct contact details, and support service timetable.

## Features Implemented
- **HTML5 Semantics:** Proper heading hierarchy, semantic landmarks (`<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`), validated forms, and a support schedule table.
- **CSS Layouts:** Extensive use of CSS Grid (`.product-grid`, `.contact-grid`), Flexbox (navbar, cards), and Positioning (`position: absolute` for map pin and badges).
- **Responsive Design:** Fully responsive layout using the Bootstrap 5 grid system alongside custom media queries for tablet (992px) and mobile (576px) viewports.
- **Consistent UI/UX:** Unified color palette, shared navigation, and dedicated detail pages across all 5 views.

## Project Structure
```
├── *.html            # 5 web pages (Home, Catalogue, Product, About, Contact)
├── css/
│   ├── style.css     # Global styles (Navbar, Footer, base rules)
│   └── *.css         # Page-specific stylesheets
├── js/
│   ├── catalogue.js  # Catalogue: product list, category filter, live search
│   └── validation.js # Contact form validation
├── photo/            # Media assets (product images, branding icons, map)
└── README.md         # Project documentation
```
