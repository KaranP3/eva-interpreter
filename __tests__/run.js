import Eva from "../Eva.js";
import Environment from "../Environment.js";
import selfEvalTest from "./self-eval-test.js";
import mathTest from "./math-test.js";
import variablesTest from "./variables-test.js";
import blockTest from "./block-test.js";
import ifTest from "./if-test.js";

const tests = [selfEvalTest, mathTest, variablesTest, blockTest, ifTest];

const eva = new Eva(
  new Environment({
    null: null,

    true: true,
    false: false,

    VERSION: 0.1,
  })
);

tests.forEach((test) => test(eva));

console.log("All assertions passed");
