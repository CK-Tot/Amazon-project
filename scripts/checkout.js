import { cart, removeFromCart, updateCartQuantity , updateQuantity , updateDeliveryOption} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateHeaderDisplay } from "./utils/updateheader.js";
// import { updateCartQuantity } from "../scripts/amazon.js"
import { deliveryOptions } from "../data/deliveryOptions.js";

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D, YYYY'));


export function renderOrderSummary()
{
    const orderSummaryEl = document.querySelector('.js-order-summary');
let cartSummaryHtml = '';

cart.forEach(cartItem => {
    const productId = cartItem.productId;

    let matchingProduct = products.find(product => {
        return product.id === productId;
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = deliveryOptions.find(option => {
        return option.id = deliveryOptionId;
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');




    cartSummaryHtml += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                   ${matchingProduct.name}
                </div>
                <div class="product-price">
                   $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span class="link-primary">
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link  js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input qauntity-input-id-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>

                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                
                </div>
                </div>
            </div>
            </div>

    `;
});

function deliveryOptionsHTML (matchingProduct, cartItem) {
    let html = '';


    deliveryOptions.forEach(deliveryOption => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D, YYYY');
        const priceString = deliveryOption.priceCents === 0 ? 'FREE': `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked  = deliveryOption.id === cartItem.deliveryOptionId;

        
        html += `
            <div class="delivery-option js-delivery-option" data-product-id='${matchingProduct.id}' data-delivery-option-id='${deliveryOption.id}'>
                <input ${isChecked ? 'checked' : '' } type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>
        
        `
    });

    return html;
}

orderSummaryEl.innerHTML = cartSummaryHtml;

const deleteLinkEl = document.querySelectorAll('.js-delete-link');
const checkoutHeader = document.querySelector('.js-checkout-header');

const updateQuntityLinkEl = document.querySelectorAll(`.js-update-quantity-link`);
// Update logic
updateQuntityLinkEl.forEach(link => {
    link.addEventListener('click', ()=> {
        const productId = link.dataset.productId;
        const cartContainerProduct = document.querySelector(`.js-cart-item-container-${productId}`)
        cartContainerProduct.classList.add('is-editing-quantity');
        
    });
});






let total = updateCartQuantity();
updateHeaderDisplay(checkoutHeader, total);


deleteLinkEl.forEach((link, index) => {

    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const productContianer = document.querySelector(`.js-cart-item-container-${productId}`);
        productContianer.remove();
        let updatedQuantity = updateCartQuantity();
        updateHeaderDisplay(checkoutHeader, updatedQuantity);
    })
})


// Save quantity logic
const saveQuantityEl = document.querySelectorAll(`.save-quantity-link`);

saveQuantityEl.forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const inputEl = document.querySelector(`.qauntity-input-id-${productId}`);
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        const inputVal = Number(inputEl.value);
        const cartContainerProduct = document.querySelector(`.js-cart-item-container-${productId}`)
        cartContainerProduct.classList.remove('is-editing-quantity');

        // if (inputVal < 1 || isNaN(inputVal));
        // {
        //     alert('Please enter valid Number');
        //     return;
        // }

         updateQuantity(productId, inputVal);

         const updatedCartQuantity = updateCartQuantity(productId, inputVal);
        quantityLabel.innerHTML = inputVal;

        updateHeaderDisplay(checkoutHeader, updatedCartQuantity);
        inputEl.value = '';



    })
})




    document.querySelectorAll('.js-delivery-option').forEach(option => {
        option.addEventListener('click', () => {
            const { productId, deliveryOptionId } = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
        })
})

    
}

renderOrderSummary();


