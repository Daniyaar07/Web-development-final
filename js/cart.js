//Class manages cart array and loads saved data on initialization
class ShoppingCart {
    constructor() {
        const storedCart = localStorage.getItem('modanova_cart');
        this.items = storedCart ? JSON.parse(storedCart) : [];
    }

    // Stringify and save the updated array to browser memory
    saveData() {
        localStorage.setItem('modanova_cart', JSON.stringify(this.items));
        this.updateBadge();
    }

    addItem(name, price) {
        this.items.push({ name, price });
        this.saveData();
    }

    // Create or update the cart counter badge
    updateBadge() {
        const cartIconBtn = document.querySelector('a[title="Cart"]');
        if (!cartIconBtn) return;

        let badge = document.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge shadow-sm';
            badge.style.cssText = 'background:#dc3545; color:white; border-radius:50%; padding:2px 6px; font-size:10px; font-weight:bold; position:absolute; top:-5px; right:-10px; z-index:10;';
            cartIconBtn.style.position = 'relative';
            cartIconBtn.appendChild(badge);
        }
        
        badge.innerText = this.items.length;
        badge.style.display = this.items.length > 0 ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const appCart = new ShoppingCart();
    appCart.updateBadge();

    const btnAddBasket = document.querySelector('.btn-gold');
    const btnHeart = document.querySelector('button[title="Add to wishlist"]');
    let wishlist = JSON.parse(localStorage.getItem('modanova_wishlist')) || [];
    
    if (btnAddBasket) {
        btnAddBasket.addEventListener('click', () => {
            const titleElement = document.querySelector('.product-info h1');
            const priceElement = document.querySelector('.product-info .h3');

            if (titleElement && priceElement) {
                //Call class method to add item on button click
                appCart.addItem(titleElement.innerText, priceElement.innerText);
                
                let originalText = btnAddBasket.innerText;
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

    if (btnHeart) {
        const titleElement = document.querySelector('.product-info h1');
        
        if (titleElement && wishlist.includes(titleElement.innerText)) {
            btnHeart.innerText = '♥';
            btnHeart.style.color = '#dc3545';
            btnHeart.style.borderColor = '#dc3545';
        }

        btnHeart.addEventListener('click', () => {
            if (!titleElement) return;
            const productName = titleElement.innerText;
            const itemIndex = wishlist.indexOf(productName);
            
            //Toggle item in wishlist array and save to Local Storage
            if (itemIndex === -1) {
                wishlist.push(productName);
                btnHeart.innerText = '♥';
                btnHeart.style.color = '#dc3545';
                btnHeart.style.borderColor = '#dc3545';
            } else {
                wishlist.splice(itemIndex, 1);
                btnHeart.innerText = '♡';
                btnHeart.style.color = '';
                btnHeart.style.borderColor = '';
            }
            
            localStorage.setItem('modanova_wishlist', JSON.stringify(wishlist));
        });
    }
});