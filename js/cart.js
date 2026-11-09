// OOP ShoppingCart class managing local storage persistence and basket state
class ShoppingCart {
    constructor() {
        const storedCart = localStorage.getItem('modanova_cart');
        
        if (storedCart !== null) {
            try {
                this.items = JSON.parse(storedCart);
                if (!Array.isArray(this.items)) this.items = [];
            } catch (e) {
                this.items = [];
            }
        } else {
            this.items = [
                {
                    name: "Basic cotton tee",
                    price: 8670,
                    image: "photo/blacktshirt1.jpg",
                    quantity: 1
                },
                {
                    name: "Relaxed linen shirt",
                    price: 12450,
                    image: "photo/blacktshirt2.jpg",
                    quantity: 2
                }
            ];
            localStorage.setItem('modanova_cart', JSON.stringify(this.items));
        }
    }

    saveData() {
        localStorage.setItem('modanova_cart', JSON.stringify(this.items));
        this.updateBadge();
        this.renderBasket();
    }

    addItem(name, priceStr, imageSrc) {
        const cleanPrice = String(priceStr).replace(/[^\d]/g, '');
        const priceNum = cleanPrice ? parseInt(cleanPrice, 10) : 0;
        const validImage = imageSrc || 'photo/blacktshirt1.jpg';

        const existingItem = this.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
        } else {
            this.items.push({
                name: name,
                price: priceNum,
                image: validImage,
                quantity: 1
            });
        }
        this.saveData();
    }

    removeItem(index) {
        if (this.items[index]) {
            this.items.splice(index, 1);
            this.saveData();
        }
    }

    updateQuantity(index, change) {
        if (this.items[index]) {
            this.items[index].quantity = (Number(this.items[index].quantity) || 1) + change;
            if (this.items[index].quantity <= 0) {
                this.removeItem(index);
            } else {
                this.saveData();
            }
        }
    }

    checkout() {
        if (!this.items || this.items.length === 0) return;

        // Очищаем корзину в объекте и в localStorage
        this.items = [];
        localStorage.setItem('modanova_cart', JSON.stringify(this.items));
        this.updateBadge();

        // Выводим сообщение о покупке
        const container = document.getElementById('cart-items-container');
        const summary = document.getElementById('cart-summary');
        
        if (container) {
            container.innerHTML = `
                <div class="text-center py-5 bg-light-subtle rounded border">
                    <span style="font-size: 48px; color: #198754;">✓</span>
                    <h2 class="fw-bold mt-3 mb-2">Thank you for your purchase!</h2>
                    <p class="text-muted mb-4">Your order has been placed successfully.</p>
                    <a href="catalogue.html" class="btn btn-dark px-4">Continue Shopping</a>
                </div>`;
        }
        if (summary) {
            summary.innerHTML = '';
        }
    }

    renderBasket() {
        const container = document.getElementById('cart-items-container');
        const summary = document.getElementById('cart-summary');
        if (!container || !summary) return;

        // Не перезаписывать, если сейчас показано сообщение об успехе
        if (container.querySelector('h2')) return;

        if (!this.items || this.items.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5 bg-light-subtle rounded border">
                    <h4 class="text-muted mb-3">Your basket is empty</h4>
                    <a href="catalogue.html" class="btn btn-dark px-4">Continue Shopping</a>
                </div>`;
            summary.innerHTML = '';
            return;
        }

        let html = '';
        let totalPrice = 0;

        this.items.forEach((item, index) => {
            const price = Number(item.price) || 0;
            const qty = Number(item.quantity) || 1;
            const itemTotal = price * qty;
            totalPrice += itemTotal;

            html += `
                <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between border-bottom py-4 gap-3">
                    <div class="d-flex align-items-center gap-3">
                        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; border: 1px solid #eee;">
                        <div>
                            <h5 class="mb-1 fw-bold fs-6">${item.name}</h5>
                            <p class="mb-0 text-muted small">${price.toLocaleString("ru-RU")} ₸</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-3 ms-auto">
                        <div class="btn-group btn-group-sm border rounded" role="group">
                            <button type="button" class="btn btn-light px-2" onclick="window.appCart.updateQuantity(${index}, -1)">-</button>
                            <span class="btn btn-light disabled text-dark px-3 fw-bold">${qty}</span>
                            <button type="button" class="btn btn-light px-2" onclick="window.appCart.updateQuantity(${index}, 1)">+</button>
                        </div>
                        <span class="fw-bold text-end" style="min-width: 85px;">${itemTotal.toLocaleString("ru-RU")} ₸</span>
                        <button class="btn btn-sm btn-outline-danger border-0" onclick="window.appCart.removeItem(${index})">✕</button>
                    </div>
                </div>`;
        });
        container.innerHTML = html;

        summary.innerHTML = `
            <div class="p-4 bg-light-subtle rounded border sticky-top" style="top: 20px;">
                <h4 class="fw-bold mb-4">Order Summary</h4>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Subtotal</span>
                    <span class="fw-semibold">${totalPrice.toLocaleString("ru-RU")} ₸</span>
                </div>
                <div class="d-flex justify-content-between mb-4 border-bottom pb-3">
                    <span class="text-muted">Shipping</span>
                    <span class="fw-semibold text-success">Free</span>
                </div>
                <div class="d-flex justify-content-between mb-4">
                    <span class="h5 fw-bold mb-0">Total</span>
                    <span class="h5 fw-bold mb-0 text-dark">${totalPrice.toLocaleString("ru-RU")} ₸</span>
                </div>
                <button class="btn btn-gold w-100 btn-lg fw-bold text-dark" onclick="window.appCart.checkout()">Checkout</button>
            </div>`;
    }

    updateBadge() {
        const cartIconBtns = document.querySelectorAll('a[title="Cart"]');
        const totalItems = this.items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

        cartIconBtns.forEach(btn => {
            btn.setAttribute('href', 'basket.html');
            let badge = btn.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge shadow-sm';
                badge.style.cssText = 'background:#dc3545; color:white; border-radius:50%; padding:2px 6px; font-size:10px; font-weight:bold; position:absolute; top:-5px; right:-10px; z-index:10;';
                btn.style.position = 'relative';
                btn.appendChild(badge);
            }
            badge.innerText = totalItems;
            badge.style.display = totalItems > 0 ? 'block' : 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.appCart = new ShoppingCart();
    window.appCart.updateBadge();
    window.appCart.renderBasket();

    // Cross-tab storage synchronization
    window.addEventListener('storage', (e) => {
        if (e.key === 'modanova_cart') {
            try {
                window.appCart.items = JSON.parse(e.newValue || '[]');
            } catch (err) {
                window.appCart.items = [];
            }
            window.appCart.updateBadge();
            window.appCart.renderBasket();
        }
    });

    const btnAddBasket = document.querySelector('.btn-gold');
    const isProductPage = document.querySelector('#mainImage') !== null;

    if (btnAddBasket && isProductPage) {
        btnAddBasket.addEventListener('click', () => {
            const titleElement = document.querySelector('.product-info h1');
            const priceElement = document.querySelector('.product-info .h3');
            const imgElement = document.querySelector('#mainImage');

            if (titleElement && priceElement) {
                window.appCart.addItem(
                    titleElement.innerText.trim(),
                    priceElement.innerText.trim(),
                    imgElement ? imgElement.getAttribute('src') : 'photo/blacktshirt1.jpg'
                );

                const originalText = btnAddBasket.innerText;
                btnAddBasket.innerText = 'Saved to Cart!';
                btnAddBasket.style.backgroundColor = '#198754';
                btnAddBasket.style.color = 'white';
                btnAddBasket.style.borderColor = '#198754';

                setTimeout(() => {
                    btnAddBasket.innerText = originalText;
                    btnAddBasket.style.backgroundColor = '';
                    btnAddBasket.style.color = '';
                    btnAddBasket.style.borderColor = '';
                }, 1000);
            }
        });
    }

    const btnHeart = document.querySelector('button[title="Add to wishlist"]');
    let wishlist = [];
    try {
        wishlist = JSON.parse(localStorage.getItem('modanova_wishlist')) || [];
    } catch (e) {
        wishlist = [];
    }

    if (btnHeart) {
        const titleElement = document.querySelector('.product-info h1');
        if (titleElement && wishlist.includes(titleElement.innerText.trim())) {
            btnHeart.innerText = '♥';
            btnHeart.style.color = '#dc3545';
        }

        btnHeart.addEventListener('click', () => {
            if (!titleElement) return;
            const productName = titleElement.innerText.trim();
            const itemIndex = wishlist.indexOf(productName);

            if (itemIndex === -1) {
                wishlist.push(productName);
                btnHeart.innerText = '♥';
                btnHeart.style.color = '#dc3545';
            } else {
                wishlist.splice(itemIndex, 1);
                btnHeart.innerText = '♡';
                btnHeart.style.color = '';
            }

            localStorage.setItem('modanova_wishlist', JSON.stringify(wishlist));
        });
    }
});