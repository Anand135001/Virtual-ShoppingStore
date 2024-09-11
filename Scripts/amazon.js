import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productHtml = "";
// ========= 1 Generate Products Html ==============
products.forEach((product) => {
  productHtml += ` 
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
                    src="images/ratings/rating-${
                      product.rating.stars * 10
                    }.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select>
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

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
                
                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
                  product.id
                }">
                    Add to Cart
                </button>
                </div>`;
});

// ===== Insert Generated Html inside Grid div ====
document.querySelector(".js-products-grid").innerHTML = productHtml;

// ===== change cart quantity icon number =====
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

// ============ 2 Add Cart functionality ============
document.querySelectorAll(".js-add-to-cart").forEach((Addbutton) => {
  Addbutton.addEventListener("click", () => {
    // ==== using data attributes of html here as ====
    const productId = Addbutton.dataset.productId;
    addToCart(productId); //fun call /cart.js
    updateCartQuantity(); //fun call
  });
});
