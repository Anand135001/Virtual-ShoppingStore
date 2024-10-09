import { formatCurrency } from "../Scripts/utils/money.js";

export function getProduct(productId){
  let matchedProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchedProduct = product;
    }
  });
  return matchedProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(prodcutDetails){
    this.id = prodcutDetails.id;
    this.image = prodcutDetails.image;
    this.name = prodcutDetails.name;
    this.rating = prodcutDetails.rating;
    this.priceCents = prodcutDetails.priceCents;
  }

  getStarUrl(){
     return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(){
     return `$${formatCurrency(this.priceCents)}`;
  }
   
  extraInfoHTML(){
      return ``;
    }
}

class Clothing extends Product{
    sizeChartLink;

    constructor(prodcutDetails){
      super(prodcutDetails);  //call product constructor
      this.sizeChartLink = prodcutDetails.sizeChartLink;
    }

    extraInfoHTML(){
      return `<a href="${this.sizeChartLink}">Size Chart </a>`;
    }
}

class Appliance extends Product{
  instructionLink;
  warrantyLink;

  constructor(prodcutDetails){
    super(prodcutDetails);
    this.instructionLink = prodcutDetails.instructionLink;
    this.warrantyLink = prodcutDetails.warrantyLink;
  }

  extraInfoHTML(){
    return `
      <a href="${this.instructionLink}">Instructions </a>
      <a href="${this.warrantyLink}" >Warranty </a> `;
  }
}


export let products = [];

export function loadProductsFetch(){
      
  const promise = fetch(
    'https://supersimplebackend.dev/products'
     ).then((response) => {
      return response.json();
      
    }).then((productsData) => {

    products = productsData.map((prodcutDetails) => {  
      if(prodcutDetails.type === "clothing"){
        return new Clothing(prodcutDetails);
      }
      else if (prodcutDetails.type === "appliance"){
        return new Appliance(prodcutDetails);
      }
      else{
        return new Product(prodcutDetails);
      }
    });
    console.log("load product aync");
    }).catch(() =>{
     console.log('Unecpected error, Try Again');
    })
    return promise;
}
                        

export function loadProducts(fun){
  const xhr =  new XMLHttpRequest();

  xhr.addEventListener('load', () =>{
   products = JSON.parse(xhr.response).map((prodcutDetails) => {
    if (prodcutDetails.type === "clothing") {
      return new Clothing(prodcutDetails);
    }
    else if(prodcutDetails.type === 'appliance'){
      return new Appliance(prodcutDetails);
    }
      return new Product(prodcutDetails);
    });
    console.log('load product xml');
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

