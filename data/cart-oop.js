function Cart(localStorageKey){

   const cart = {
   cartItems: undefined,


   loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        if (!this.cartItems) 
        {this.cartItems = []}
    },
    
    saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId){
         let matchingItem;
       
         this.cartItems.forEach((cartItem) => {
           if (productId === cartItem.productId) {
             matchingItem = cartItem;
           }
         });
       
         if (matchingItem) {
           matchingItem.quantity++;
         } else {
           this.cartItems.push({
             productId: productId,
             quantity: 1,
             deliveryOptionId: "1",
           });
         }
        this.saveToStorage();
    },
     
    removeFromCart(productId) {
       const newCart = [];

       this.cartItems.forEach((cartItem) => {
           if(cartItem.productId !== productId) {
              newCart.push(cartItem);
            }
    });
        this.cartItems = newCart;

        this.saveToStorage();
    },


    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
              if(productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

   
   };

   return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('businessCart');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);


