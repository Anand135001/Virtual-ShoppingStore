import { formatCurrency } from "../Scripts/utils/money.js";

console.log("test suite: formatCurrency");

console.log("Converts cents into dollars ");


if(formatCurrency(2095) === "20.95"){
  console.log('pass');
}
else{
    console.log("fail");
}

if (formatCurrency(10000) == "100.00") {
  console.log("pass");
} else {
  console.log("fail");
}

if (formatCurrency(2000.5) === "20.01") {
  console.log("pass");
} else {
  console.log("fail");
}
