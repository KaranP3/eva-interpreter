import Eva from "../Eva.js";
import selfEvalTest from "./self-eval-test.js";
import mathTest from "./math-test.js";
import variablesTest from "./variables-test.js";
import blockTest from "./block-test.js";
import ifTest from "./if-test.js";
import whileTest from "./while-test.js";
import builtInFunctionTest from "./built-in-function-test.js";

const tests = [
  selfEvalTest,
  mathTest,
  variablesTest,
  blockTest,
  ifTest,
  whileTest,
  builtInFunctionTest,
];

const eva = new Eva();

tests.forEach((test) => test(eva));

eva.eval(["print", '"Hello"', '"World!"']);

console.log("All assertions passed");
