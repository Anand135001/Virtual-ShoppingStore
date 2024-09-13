export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '1'
    }
  ];
};

// ====== save Cart product in local storage ====== 
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


// ======= Add cart function /amazon.js=======
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage(); //fun call
}


// ===== Update cart quantity icon number =====
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}


// ====== Delete cart function/checkout.js ========
export function removeFromCart(productId) {
   const newCart = [];
   
   cart.forEach((cartItem) =>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
   });
   cart = newCart;
  
   saveToStorage(); //fun call
}

