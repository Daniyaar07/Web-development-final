// Catalogue page (Participant 1): products array, render with a loop, category filter, live search.

// 1. Data: array of objects. sale = discount percent or null.
const products = [
    { id: 1, name: "Basic cotton tee",    category: "tops",      price: 5260,  sale: 10,   image: "photo/blacktshirt1.jpg" },
    { id: 2, name: "Relaxed linen shirt", category: "tops",      price: 8670,  sale: null, image: "photo/linen.jpg" },
    { id: 3, name: "Knit sweater",        category: "tops",      price: 13910, sale: null, image: "photo/knit.png" },
    { id: 4, name: "Wide-leg trousers",   category: "bottoms",   price: 11820, sale: null, image: "photo/trousers.jpg" },
    { id: 5, name: "Wool overcoat",       category: "outerwear", price: 42500, sale: null, image: "photo/overcoat.jpg" },
    { id: 6, name: "Denim jacket",        category: "outerwear", price: 15900, sale: 20,   image: "photo/denim.jpg" },
    { id: 7, name: "Straight jeans",      category: "bottoms",   price: 12460, sale: null, image: "photo/jeans.jpg" },
    { id: 8, name: "Oversized hoodie",    category: "tops",      price: 13380, sale: null, image: "photo/hoodie.jpg" }
];

// Current search text and selected category.
const state = { query: "", category: "all" };

// Returns a price like "5 260 ₸" from the number 5260.
function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₸";
}

// Returns the HTML string of one product card (same markup as the old static cards).
function createCard(product) {
    const badge = product.sale
        ? `<span class="badge-sale">-${product.sale}%</span>`
        : "";
    return `
    <article class="product-card" data-id="${product.id}">
      <a href="productpg.html" class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${badge}
      </a>
      <div class="product-info">
        <h2 class="product-name">${product.name}</h2>
        <p class="price">${formatPrice(product.price)}</p>
      </div>
    </article>`;
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

// Draws the given list into the grid using a loop.
function renderProducts(list) {
    const grid = document.getElementById("product-grid");
    let html = "";
    for (const product of list) {
        html += createCard(product);
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

// Dark button = active category, outline = inactive.
function setActiveButton(category) {
    document.querySelectorAll("#category-filter button").forEach(function (button) {
        const isActive = button.dataset.category === category;
        button.classList.toggle("btn-dark", isActive);
        button.classList.toggle("btn-outline-dark", !isActive);
    });
}

// Applies search + category and redraws the grid.
function applyFilters() {
    const result = filterProducts(products, state.query, state.category);
    renderProducts(result);
    showEmptyState(result.length === 0);
}

function init() {
    if (!document.getElementById("product-grid")) return; // do not break other pages

    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-form");

    // Search text may come from the home page: catalogue.html?q=tee
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

    // Category buttons.
    document.querySelectorAll("#category-filter button").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            state.category = button.dataset.category;
            setActiveButton(state.category);
            applyFilters();
        });
    });

    applyFilters(); // first draw
}

document.addEventListener("DOMContentLoaded", init);