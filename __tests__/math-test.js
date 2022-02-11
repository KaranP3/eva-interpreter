import assert from "assert";

export default (eva) => {
  assert.strictEqual(eva.eval(["+", 1, 5]), 6);
  assert.strictEqual(eva.eval(["+", ["+", 3, 2], 5]), 10);
  assert.strictEqual(eva.eval(["+", ["*", 3, 2], 5]), 11);
  assert.strictEqual(eva.eval(["*", ["*", 3, 2], 5]), 30);
};
