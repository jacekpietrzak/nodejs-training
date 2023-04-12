// importujemy funkcje ktora chcemy testowac
const sum = require("./index.js");

describe("Testing sum function", () => {
  // schould return sum
  it("schould return sum", () => {
    expect(sum(5, 5)).toBeDefined();
  });

  // check if we didnt pass array
  it("should return false when array is provided", () => {
    // wywolujemy nasza funkcje i podajemy tablice jako pierwszy argument. Uzywamy expect do przekazania co powinno zwrocic.
    expect(sum([1, 2, 3, 4], 223231)).toBe(false);
  });

  // check if we dont try to pass wrong types
  it("should return false if argument type different than number", () => {
    expect(sum("123", 123)).toBe(false);
  });

  // check if we passed both arguments
  it("should return false if we didnt pass any argument", () => {
    // expect(sum(5)).toBe(false);
    expect(() => sum(5)).toThrowError();
  });

  // schould return sum of 5 and 7 = 12
  it("schould return sum of 5 and 7 = 12", () => {
    expect(sum(5, 5)).toBe(10);
  });

  // schould sum more than 10 multiply by 2
  it("schould multiply sum by 2 if sum is greater than 10", () => {
    expect(sum(7, 7)).toEqual(28);
  });

  // schould reduce sum by 5 if sum is less than 10
  xit("schould reduce sum by 5 if sum is less than 10", () => {
    expect(sum(4, 4)).toBe(3);
  });
});
