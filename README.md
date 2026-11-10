# MODANOVA — E-Commerce Web Application (Final Project)

**Group:** SE-2527

Authors: Mansur Nursultanov, Daniyar Baikanov, Temkeshev Aldiyar

Live Demo: https://glore81.github.io/Web-development-midterm/

## Project Overview
MODANOVA is a responsive multi-page e-commerce web platform for everyday apparel, built with semantic HTML5, modern CSS3, Bootstrap 5, and JavaScript.

For the Final Project, the application was transitioned into a dynamic client-side web application featuring Object-Oriented Programming (OOP), persistent storage via localStorage, a full CRUD basket workflow, live multi-attribute filtering & search, REST API asynchronous form submission, and interactive jQuery UI animations.

Key architectural upgrades include:
* **Object-Oriented Programming (OOP):** Encapsulated data structures via ES6 classes (`Product` and `ShoppingCart`).
* **Asynchronous REST API Integration:** Dynamic catalogue fetching via `DummyJSON API` and external mock message dispatches via `JSONPlaceholder API`.
* **State Persistence:** Full client-side persistence using the browser's `localStorage` for the shopping cart, message logs, wishlist status, and global visual theme.
* **Complete CRUD Basket & Checkout:** Add, browse, adjust quantity, delete, and check out with real-time recalculation of subtotals and cross-tab synchronisation.
* **Interactive DOM & jQuery Animations:** Real-time filter/sort pipeline, image fade transitions, dynamic breadcrumbs, and support hour accordion displays.

## Team Work Distribution & Technical Contributions
### 1. Mansur Nursultanov — API Catalogue, Dynamic Routing & Filtering Pipeline
* **Asynchronous API Integration (`js/catalogue.js`, `catalogue.html`):**
  * Integrated the **DummyJSON API** (`https://dummyjson.com/products`) using `fetch()` and `async/await` with query params (`limit=0&select=...`).
  * Filtered incoming clothes/shoes categories (`CLOTHING_CATEGORIES`) and performed currency conversion from USD to KZT (`USD_TO_KZT = 500`).
* **OOP Product Modeling:**
  * Created the `Product` class to map incoming API schemas into application objects with sanitized properties and HTML card generation (`toCardHTML()`).
* **Search, Sort & Filter Pipeline:**
  * Implemented real-time dynamic search by query string (`q=`), dynamic category pill generation (`renderCategoryButtons()`), and numerical sorting (Price: Low to High / High to Low).
  * Built network status feedback handlers (`showLoading()`, `showError()` with automatic retry button, and empty state banners).
* **Product Details Dynamic Routing (`productpg.html`):**
  * Integrated URL parameter extraction via `URLSearchParams(?id=)` to fetch single product items (`fetchProductById(id)`).
  * Implemented defensive image preloading promises (`mainImg.onload`) and gallery thumbnail rendering.
 
### 2. Aldiyar Temkeshev — OOP Cart Engine, CRUD Operations & Storage Architecture
* **OOP Cart Architecture (`js/cart_2.js`):**
  * Designed and built the central `ShoppingCart` class encapsulating cart state, data validation, badge counters, and local persistence.
* **Full CRUD Lifecycle:**
  * **Create (`addItem`):** Adds items with regex-cleaned prices, custom thumbnails, and automatic item grouping.
  * **Read (`renderBasket`):** Generates itemized order summaries, per-item cost calculations, and free delivery thresholds.
  * **Update (`updateQuantity`):** Modifies line quantities directly with boundary checking (decrementing to 0 triggers item removal).
  * **Delete (`removeItem`):** Splices items from memory and storage upon user removal.
* **Checkout Flow & Order Clearing:**
  * Implemented the `checkout()` transaction: permanently clears active cart items, resets navigation badges, and renders an in-place success confirmation receipt banner.
* **Cross-Tab Synchronization & Event Storage:**
  * Implemented `window.addEventListener('storage', ...)` to sync cart additions and removals across multiple browser tabs instantaneously without reloads.
* **Wishlist Management:**
  * Handled persistent wishlist toggles with state array modifications (`indexOf`, `push`, `splice`) and dynamic heart glyph rendering (`♥` / `♡`).

### 3. Daniyar Baikanov — Form Validation, API Communication, UI Effects & Dark Mode
* **Contact Validation & Asynchronous Posting (`js/validation_2.js`):**
  * Engineered complete client-side validation verifying string lengths and regex pattern checking for emails (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  * Implemented dynamic conditional input displays: selecting the topic "Returns" dynamically reveals the required "Order ID" input field.
  * Built asynchronous message submission (`fetch` POST to JSONPlaceholder) with dynamic submit button loading states (`Sending...` -> `Send message`).
  * Integrated local message history logging (`localStorage.getItem("messages")`) with dynamic display via `#loadMessages`.
* **jQuery UI Effects & Animations (`js/ui-effects_2.js`):**
  * Implemented the support schedule accordion toggle using `.slideToggle(800)` on `contact_2.html`.
  * Built smooth thumbnail image swapping with chained `.fadeOut(200)` and `.fadeIn(200)` transitions on `productpg_2.html`.
  * Handled apparel size button selection toggling active classes across siblings.
* **Persistent Theme Switcher (Dark Mode):**
  * Created global dark mode toggling (`body.dark-mode`) preserved via `localStorage.getItem("theme")`.
  * Customized theme color schemes for cards, checkout summary containers, data tables, search inputs, and `.btn-gold` call-to-actions.

## Requirements Compliance Matrix

| Requirement | Implementation Details | Target File(s) |
| :--- | :--- | :--- |
| **Object-Oriented Programming (OOP)** | `Product` class for items; `ShoppingCart` class for cart business logic | `js/catalogue.js`, `js/cart.js` |
| **Data Persistence (`localStorage`)** | Persistent storage for Cart (`modanova_cart`), Wishlist (`modanova_wishlist`), Theme (`theme`), and Messages (`messages`) | `js/cart.js`, `js/validation.js`, `js/ui-effects.js` |
| **External REST API Integration** | `GET` from DummyJSON (`/products`); `POST` to JSONPlaceholder (`/posts`) | `js/catalogue.js`, `js/validation.js` |
| **CRUD Lifecycle** | Create (add to cart), Read (render basket), Update (adjust qty), Delete (remove items) | `basket.html`, `js/cart.js` |
| **Form Validation & Regex** | Email regex testing, dynamic input toggles (`#orderField`), and error prompt generation | `js/validation.js` |
| **Asynchronous JavaScript** | `async/await`, Promises for image preloading, and `fetch()` error handling | `js/catalogue.js`, `js/validation.js`, `productpg.html` |
| **Cross-Tab Synchronization** | Browser `storage` event listener ensuring multi-tab cart coherence | `js/cart.js` |
| **DOM & UI Animations** | jQuery `.slideToggle()`, `.fadeOut()/.fadeIn()`, and responsive Bootstrap 5 styling | `js/ui-effects.js`, `css/style.css` |

---

## Project Directory Structure

```text
├── index.html            # Landing page with hero promo and quick search
├── catalogue.html        # Production catalogue with API loading, search, category filter & sorting
├── productpg.html        # Dynamic single product page reading (?id=) with gallery preview
├── basket.html           # Full CRUD basket page with checkout summary and confirmation
├── contact.html          # Contact form with async API submission, support hours table & map
├── about.html            # Brand story and mission statement layout
│
├── css/
│   ├── style.css         # Global typography, navigation, dark mode, and buttons
│   ├── main.css          # Homepage promotional grid layout
│   ├── catalogue.css     # Catalogue display grid, sales badges, and filter buttons
│   ├── productpg.css     # Gallery thumbnails, sizing pills, and product specs
│   ├── contact.css       # Contact cards, form layout, and support table styling
│   └── about.css         # Responsive narrative layout
│
├── js/
│   ├── catalogue.js    # Product class, DummyJSON API loader, live search, sort & filters
│   ├── cart.js         # ShoppingCart class, CRUD methods, localStorage, badge & checkout
│   ├── validation.js   # Form validation, async JSONPlaceholder POST, message retrieval
│   └── ui-effects.js   # jQuery animations, thumbnail cross-fade, dark mode toggling
│
└── photo/                # Local graphic assets (logos, fallback photos, map pin)
```

---

## How to Run

1. **Launch Application:**
   * Open `index.html` in any modern web browser or run it via a local server (e.g., Live Server in VS Code).
