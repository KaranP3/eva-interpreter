import assert from "assert";
import evaParser from "../parser/evaParser.js";

function test(eva, code, expected) {
  const exp = evaParser.parse(code);
  assert.strictEqual(eva.eval(exp), expected);
}

export default { test };
