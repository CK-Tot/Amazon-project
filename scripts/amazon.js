import { cart, addToCart } from "../data/cart.js";
import { products,  } from "../data/products.js";
const productContainer = document.querySelector('.products-grid');
    
const renderProducts = (products) => {
     const productRender =  products.map((product) => {
        return `
        <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                   ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${(product.priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-select-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart add-To-cart-message-${[product.id]}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button js-add-to-cart-btn button-primary" data-product-id="${product.id}">
                    Add to Cart
                </button>
        </div>
 `
    }).join('');

    productContainer.innerHTML  = productRender;
    const addToCartBtn = document.querySelectorAll('.js-add-to-cart-btn');

    function updateCartQuantity(quantityEL)
    {
        let cartQuantity = 0; 
        cart.forEach(cartItem => {
                    cartQuantity += cartItem.quantity;
                });

                quantityEL.textContent = cartQuantity;

                console.log(cart);
    }


    function addToCartMsg(addToCartMsg, msgTimeoutId)
    {
        
        // add to cart mesaage
            addToCartMsg.classList.add('msg')
                if (msgTimeoutId)
                {
                    clearTimeout(msgTimeoutId)
                }

                msgTimeoutId= setTimeout(() => {
                addToCartMsg.classList.remove('msg');
                }, 2000);
    }
    
    addToCartBtn.forEach(btn => {
        let msgTimeoutId;
        btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            const selectEl = document.querySelector(`.js-quantity-select-${productId}`);
            const quantityEL = document.querySelector('.js-cart-quantity');
            const addToCartMsgEl = document.querySelector(`.add-To-cart-message-${productId}`);
            
            // Add to cart msg function
                addToCartMsg(addToCartMsgEl, msgTimeoutId);
             
                // add to cart function
                addToCart(productId, selectEl);
             
                // Dom quantity update
                updateCartQuantity(quantityEL)

                
        })
    })
}

renderProducts(products);


