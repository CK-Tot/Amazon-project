import { renderOrderSummary } from "../scripts/checkout.js";

export let cart = JSON.parse(localStorage.getItem('cart')) ||  [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'

}, 
{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
}];

export function saveToStorage()
{
    localStorage.setItem('cart', JSON.stringify(cart))
}


     export function addToCart(productId, selectEl)
    {
        let mathcingItem = cart.find(cartItem => {
            return productId === cartItem.productId;
        });

        if (mathcingItem)
            {
                mathcingItem.quantity += Number(selectEl.value);
            } else {
                cart.push({
                    productId,
                    quantity: Number(selectEl.value),
                    deliveryOptionId: '1'
                })
            }

            saveToStorage();

    }

  export  function removeFromCart(productId)
    {
        let newCart =[]
        cart.forEach(cartItem => {
            if (cartItem.productId !== productId)
            {
                newCart.push(cartItem);
            }
        });

        cart = newCart;

        saveToStorage();
      
    }

export function updateCartQuantity()
{
    let cartQuantity = 0; 
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}


export function updateQuantity(productId, newQuantity)
{
   let matchingItem =  cart.find(cartItem => {
        return productId === cartItem.productId;
    });

    matchingItem.quantity = newQuantity
    
    saveToStorage()
    return matchingItem.quantity;

}


export function updateDeliveryOption(productId, deliveryOptionId)
{
    const mathcingItem = cart.find(cartItem => {
        return cartItem.productId === productId;
    });

    // if (mathcingItem) return;

    mathcingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();

    renderOrderSummary()

}