export function formatCurrency(priceCents){
   return (priceCents /100).toFixed(2);
}
/**  
 * === Default export/One file can have only one deafult export ===
 *! export default formatCurrency; 
 */