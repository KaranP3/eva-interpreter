import assert from "assert";

export default (eva) => {
  assert.strictEqual(eva.eval(1), 1);
  assert.strictEqual(eva.eval('"hello"'), "hello");
};
