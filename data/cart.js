export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) { cart = []; }
}

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


// ====== Delete cart function ========
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

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

// Update delivery option on the top of the product/checkout.js 
export function updateDeliveryOption(productId, deliveryOptionId){
   let matchingItem;

   cart.forEach((cartItem) => {
     if (productId === cartItem.productId) {
       matchingItem = cartItem;
     }
   });
   matchingItem.deliveryOptionId = deliveryOptionId;
   
   saveToStorage();
}


export let products = [];

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
   xhr.addEventListener("load", () => {
    console.log('loadcart');
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

