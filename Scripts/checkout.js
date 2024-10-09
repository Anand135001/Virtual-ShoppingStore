import { renderOrderSummary } from "./checkoutPage/orderSummary.js";
import { renderPaymentSummary } from "./checkoutPage/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";


async function loadPage(){
 try{
    await loadProductsFetch();
  } catch(error){
  console.log('Unexpected error');
  }
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();



