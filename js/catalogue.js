// Catalogue page (Participant 1): products from FakeStore API, Product class, search, category filter, sorting.

const API_URL = "https://fakestoreapi.com/products";

// We are a clothing store, so non-clothing categories of the API are hidden.
const EXCLUDED_CATEGORIES = ["electronics", "jewelery"];

// One product of the catalogue. Created from one JSON object of the API.
class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.title; // API calls it "title"; we keep "name" so filterProducts works
        this.category = data.category;
        this.price = data.price;
        this.image = data.image;
    }

    // Returns the HTML string of this product's card (same classes as before, so the CSS still works).
    toCardHTML() {
        const name = escapeHTML(this.name);
        return `
    <article class="product-card" data-id="${this.id}">
      <a href="productpg.html?id=${this.id}" class="product-image">
        <img src="${escapeHTML(this.image)}" alt="${name}">
      </a>
      <div class="product-info">
        <h2 class="product-name">${name}</h2>
        <p class="price">${formatPrice(this.price)}</p>
      </div>
    </article>`;
    }
}

// All products loaded from the API (array of Product objects).
let products = [];
let isLoaded = false;

// Current search text, selected category and sort mode.
const state = { query: "", category: "all", sort: "default" };

// Turns special characters into safe text, so data cannot break our HTML when we use innerHTML.
function escapeHTML(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

// Returns a price like "$1,234.50" from the number 1234.5.
function formatPrice(price) {
    return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Returns a NEW array with the products that match the search text and the category.
function filterProducts(list, query, category) {
    const text = query.trim().toLowerCase();
    return list.filter(function (product) {
        const matchesCategory = category === "all" || product.category === category;
        const matchesQuery = product.name.toLowerCase().includes(text);
        return matchesCategory && matchesQuery;
    });
}

// Returns a sorted COPY of the list. The original array stays unchanged.
function sortProducts(list, mode) {
    const copy = [...list];
    if (mode === "price-asc") {
        copy.sort((a, b) => a.price - b.price);
    } else if (mode === "price-desc") {
        copy.sort((a, b) => b.price - a.price);
    }
    return copy;
}

// Draws the given list into the grid using a loop.
function renderProducts(list) {
    const grid = document.getElementById("product-grid");
    let html = "";
    for (const product of list) {
        html += product.toCardHTML();
    }
    grid.innerHTML = html;
}

// Adds or removes the "nothing found" message (a DOM element created and deleted on demand).
function showEmptyState(isEmpty) {
    const grid = document.getElementById("product-grid");
    let message = document.getElementById("empty-state");

    if (isEmpty && !message) {
        message = document.createElement("p");
        message.id = "empty-state";
        message.className = "text-center text-muted py-5";
        message.textContent = "Nothing found. Try another search or category.";
        grid.after(message);
    } else if (!isEmpty && message) {
        message.remove();
    }
}

// The block for "loading" and "error" messages. Created once, above the grid.
function getStatusBox() {
    let box = document.getElementById("catalogue-status");
    if (!box) {
        box = document.createElement("div");
        box.id = "catalogue-status";
        box.className = "text-center py-5";
        box.setAttribute("aria-live", "polite");
        document.getElementById("product-grid").before(box);
    }
    return box;
}

function showLoading() {
    const box = getStatusBox();
    box.hidden = false;
    box.innerHTML = `
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`;
}

function showError(text) {
    const box = getStatusBox();
    box.hidden = false;
    box.innerHTML = "";

    const message = document.createElement("p");
    message.className = "text-danger mb-3";
    message.textContent = text;

    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.className = "btn btn-dark";
    retryButton.textContent = "Retry";
    retryButton.addEventListener("click", loadProducts);

    box.append(message, retryButton);
}

function hideStatus() {
    const box = getStatusBox();
    box.hidden = true;
    box.innerHTML = "";
}

// Builds the category buttons from the loaded products: "All" + one button per category.
function renderCategoryButtons(list) {
    const container = document.getElementById("category-filter");
    const categories = [...new Set(list.map(product => product.category))];

    container.innerHTML = "";
    for (const category of ["all", ...categories]) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn text-capitalize";
        button.dataset.category = category;
        button.textContent = category === "all" ? "All" : category;
        container.append(button);
    }

    // If the remembered category no longer exists, go back to "All".
    if (!categories.includes(state.category)) {
        state.category = "all";
    }
    setActiveButton(state.category);
}

// Dark button = active category, outline = inactive.
function setActiveButton(category) {
    document.querySelectorAll("#category-filter button").forEach(function (button) {
        const isActive = button.dataset.category === category;
        button.classList.toggle("btn-dark", isActive);
        button.classList.toggle("btn-outline-dark", !isActive);
    });
}

// One pipeline: filter (category + search) -> sort -> draw.
function applyFilters() {
    if (!isLoaded) return; // nothing to show until the products arrive

    const filtered = filterProducts(products, state.query, state.category);
    const sorted = sortProducts(filtered, state.sort);
    renderProducts(sorted);
    showEmptyState(sorted.length === 0);
}

// Loads the products from the API: loading -> success or error.
async function loadProducts() {
    showLoading();
    showEmptyState(false);

    try {
        const response = await fetch(API_URL);
        // fetch does NOT fail on 404/500, so we check the status ourselves.
        if (!response.ok) {
            throw new Error("Server answered with status " + response.status);
        }
        const data = await response.json();

        products = data
            .map(item => new Product(item))
            .filter(product => !EXCLUDED_CATEGORIES.includes(product.category));
        isLoaded = true;

        hideStatus();
        renderCategoryButtons(products);
        applyFilters();
    } catch (error) {
        // Network is down, or the server returned an error.
        showError("Could not load products. Check your internet connection and try again.");
    }
}

function init() {
    if (!document.getElementById("product-grid")) return; // do not break other pages

    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-form");
    const sortSelect = document.getElementById("sort-select");
    const categoryFilter = document.getElementById("category-filter");

    // Search text may come from the home page: catalogue_2.html?q=shirt
    state.query = new URLSearchParams(window.location.search).get("q") || "";
    searchInput.value = state.query;

    // Live search while typing.
    searchInput.addEventListener("input", function () {
        state.query = searchInput.value;
        applyFilters();
    });

    // Enter / Search button must not reload the page.
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        state.query = searchInput.value;
        applyFilters();
    });

    // Sort select (exists only on catalogue_2.html).
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            state.sort = sortSelect.value;
            applyFilters();
        });
    }

    // Category buttons are created after loading, so we listen on their container (event delegation).
    categoryFilter.addEventListener("click", function (event) {
        const button = event.target.closest("button");
        if (!button) return;
        state.category = button.dataset.category;
        setActiveButton(state.category);
        applyFilters();
    });

    loadProducts(); // load once when the page opens
}

document.addEventListener("DOMContentLoaded", init);
