import assert from "assert";

export default (eva) => {
  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "result", 0],
      ["var", "counter", 0],
      [
        "while",
        ["<", "counter", 10],
        // TODO: implement ['++', <Exp>]
        [
          "begin",
          ["set", "result", ["+", "result", 1]],
          ["set", "counter", ["+", "counter", 1]],
        ],
      ],
      "result",
    ]),
    10
  );
};
