export const cart = [];


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
                    quantity: Number(selectEl.value) 
                })
            }

    }