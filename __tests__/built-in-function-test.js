import assert from "assert";
import testUtil from "./test-util.js";

export default (eva) => {
  // Math functions:

  testUtil.test(eva, `(+ 5 1)`, 6);
  testUtil.test(eva, `(+ (+ 2 3) 5)`, 10);
  testUtil.test(eva, `(+ (* 2 3) 5)`, 11);
  testUtil.test(eva, `(* (* 2 3) 5)`, 30);
  testUtil.test(eva, `(/ (* 3 2) 3)`, 2);

  // Comparison
  testUtil.test(eva, "(> 1 5)", false);
  testUtil.test(eva, "(< 1 5)", true);

  testUtil.test(eva, "(>= 5 5)", true);
  testUtil.test(eva, "(<= 5 5)", true);
  testUtil.test(eva, "(= 5 5)", true);
};
