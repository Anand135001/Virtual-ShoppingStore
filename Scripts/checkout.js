import { renderOrderSummary } from "./checkoutPage/orderSummary.js";
import { renderPaymentSummary } from "./checkoutPage/paymentSummary.js";
import { loadProducts } from "../data/products.js";

loadProducts(() =>{
    renderOrderSummary();
    renderPaymentSummary();
})