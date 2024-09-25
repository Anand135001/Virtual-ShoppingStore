import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateDeliveryOption,
  updateQuantity
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// =========== Render cart Html ============
export function renderOrderSummary() {
  let cartSummaryHtml = "";

  cart.forEach((cartItem) => {
    
    const productId = cartItem.productId;
    const matchedProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliverydate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliverydate.format("dddd, MMMM, D");

    cartSummaryHtml += `
        <div class="cart-item-container 
        js-cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>
    
          <div class="cart-item-details-grid">
              <img class="product-image"
              src="${matchedProduct.image}">
    
              <div class="cart-item-details">
                <div class="product-name">
                ${matchedProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchedProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchedProduct.id}">${cartItem.quantity} </span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link"
                      data-product-id="${matchedProduct.id}" >
                      Update   
                    </span>
                    <input class="quantity-input js-quantity-input-${
                      matchedProduct.id
                    }">
                    <span class="save-quantity-link link-primary js-save-link"
                      data-product-id="${matchedProduct.id}">
                      Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" 
                      data-product-id = "${matchedProduct.id}">
                      Delete
                    </span>
                </div>
              </div>
    
              <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                  ${deliveryOptionHtml(matchedProduct, cartItem)}
              </div>
          </div>
        </div> 
      `;
  });

  // ==== Delivery Options Html/extrnal libaries/deliveryOptions.js/monery.js ===
  function deliveryOptionHtml(matchedProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      // Calculating Days
      const today = dayjs();
      const deliverydate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliverydate.format("dddd, MMMM, D");

      // Calucluting shipping money
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += 
      ` <div class="delivery-option js-delivery-option"
          data-product-id = "${matchedProduct.id}"
          data-delivery-option-id = "${deliveryOption.id}">
          
                <input type="radio" ${isChecked ? "checked" : ""}
                  class="delivery-option-input"
                  name="delivery-option-${matchedProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
        </div>
      `;
    });

    return html;
  }

  // =========== Insert Generated Product Html ===========
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".js-return-to-home-link")
    .innerHTML = `${cartQuantity} items`;
  }
  updateCartQuantity();


//  =========== Update product button ==========
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

//  --- Save update --
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {

    const productId = link.dataset.productId;    
    
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQuantity = Number(quantityInput.value);
    
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }

    updateQuantity(productId, newQuantity); 

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    const quantityLabel = document.querySelector(`
      .js-quantity-label-${productId}`
    )    
    quantityLabel.innerHTML = newQuantity;
    updateCartQuantity();
    renderPaymentSummary();

    });
  });


  // ========== Delete Button functionality ============
  document.querySelectorAll(".js-delete-link")
    .forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        const productId = deleteButton.dataset.productId;
        removeFromCart(productId); //fun call/cart.js

        const container = document.querySelector(
        `.js-cart-item-container-${productId}`
        );
        container.remove();
        updateCartQuantity();
        renderPaymentSummary();
    });
  });

  // ============= choose delivery options ============
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      // Use of html data attributes/shorthand property
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}


