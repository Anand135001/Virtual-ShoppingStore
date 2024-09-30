import { formatCurrency } from "../Scripts/utils/money.js";

// function given by jasmine TF 
describe('test suite: formatCurrnecy',() =>{
  it('convert cents into dollars', () =>{
     expect(formatCurrency(2092)).toEqual('20.92');
  });

  it("works with Zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  
  it(" round up the near value", () => {
    expect(formatCurrency(2100.5)).toEqual("21.01");
  });
});