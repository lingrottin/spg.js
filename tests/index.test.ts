import spg, { gen, gens, create } from "../src/index";

test("single character generation", () => {
  expect(gen("c1", 10)).toBe("1111111111");
  expect(gens("c1", 10)).toBe("1111111111");
});

test("no character passed", () => {
  expect(gen("", 10)).toBe("");
  expect(gens("", 10)).toBe("");
});

test("create instances", () => {
  expect(create(false).safe).toBe(false);
  expect(create(true).safe).toBe(true);
});

test("common generation", () => {
  expect(gen("aA", 10)).toMatch(
    /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]*$/,
  );
  expect(gens("aA", 10)).toMatch(
    /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]*$/,
  );
  expect(gens("0aA", 10)).toMatch(
    /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890]*$/,
  );
  expect(gens("0aA", 10)).toMatch(
    /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890]*$/,
  );
});
