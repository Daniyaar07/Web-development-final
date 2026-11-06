document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let wishlist = [];

    const btnAddBasket = document.querySelector('.btn-gold');
    const btnHeart = document.querySelector('button[title="Add to wishlist"]');
    const cartIconBtn = document.querySelector('a[title="Cart"]'); 

    function updateCartBadge() {
        if (!cartIconBtn) return;

        let badge = document.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge shadow-sm';
            badge.style.cssText = 'background:#dc3545; color:white; border-radius:50%; padding:2px 6px; font-size:10px; font-weight:bold; position:absolute; top:-5px; right:-10px; z-index:10;';
            
            cartIconBtn.style.position = 'relative';
            cartIconBtn.appendChild(badge);
        }
        badge.innerText = cart.length;
    }

    if (btnAddBasket) {
        btnAddBasket.addEventListener('click', function() {
            const titleElement = document.querySelector('.product-info h1');
            const priceElement = document.querySelector('.product-info .h3');

            if (titleElement && priceElement) {
                let item = {
                    name: titleElement.innerText,
                    price: priceElement.innerText
                };
                
                cart.push(item);
                updateCartBadge();
                
                let originalText = btnAddBasket.innerText;
                btnAddBasket.innerText = 'Added!';
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
        btnHeart.addEventListener('click', function() {
            const titleElement = document.querySelector('.product-info h1');
            if (!titleElement) return;

            const productName = titleElement.innerText;
            let itemIndex = wishlist.indexOf(productName);
            
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
        });
    }
});