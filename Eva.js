import Environment from "./Environment.js";

/**
 * Eva interpreter
 */
export default class Eva {
  /**
   * Creates an Eva instance with the global environment
   */
  constructor(global = GlobalEnvironment) {
    this.global = global;
  }

  /**
   * Executes an expression in the given environment
   */
  eval(exp, env = this.global) {
    // --------------------------------------
    // Self-evaluating expressions:

    if (this._isNumber(exp)) {
      return exp;
    }

    if (this._isString(exp)) {
      return exp.slice(1, -1);
    }

    // --------------------------------------
    // Block: sequence of expressions

    if (exp[0] === "begin") {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    // --------------------------------------
    // Variable declaration: (var foo 10)

    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }

    // --------------------------------------
    // Variable update: (set foo 10)

    if (exp[0] === "set") {
      const [_, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    // --------------------------------------
    // Variable access: foo

    if (this._isVariableName(exp)) {
      return env.lookup(exp);
    }

    // --------------------------------------
    // if-expression:

    if (exp[0] === "if") {
      const [_tag, condition, consequent, alternate] = exp;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }
      return this.eval(alternate, env);
    }

    // --------------------------------------
    // while-expression:

    if (exp[0] === "while") {
      const [_tag, condition, body] = exp;

      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }

      return result;
    }

    // --------------------------------------
    // Function calls:

    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env);
      const args = exp.slice(1).map((arg) => this.eval(arg, env));

      // Native function:
      if (typeof fn === "function") {
        return fn(...args);
      }

      // User-defined function:
      // TODO
    }

    throw `Unimplemented: ${JSON.stringify(exp)}`;
  }

  _evalBlock(block, env) {
    let result;

    const [_tag, ...expressions] = block;

    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });

    return result;
  }

  _isNumber(exp) {
    return typeof exp === "number";
  }

  _isString(exp) {
    return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
  }

  _isVariableName(exp) {
    return typeof exp === "string" && /^[+\-*/<>=a-zA-Z0-9_]*$/.test(exp);
  }
}

/**
 * Default global environment
 */

const GlobalEnvironment = new Environment({
  null: null,

  true: true,
  false: false,

  VERSION: 0.1,

  // Operators:

  "+"(op1, op2) {
    return op1 + op2;
  },

  "*"(op1, op2) {
    return op1 * op2;
  },

  "-"(op1, op2 = null) {
    if (op2 === null) {
      return -op1;
    }
    return op1 - op2;
  },

  "/"(op1, op2) {
    return op1 / op2;
  },

  // Comparison:

  ">"(op1, op2) {
    return op1 > op2;
  },

  "<"(op1, op2) {
    return op1 < op2;
  },

  ">="(op1, op2) {
    return op1 >= op2;
  },

  "<="(op1, op2) {
    return op1 <= op2;
  },

  "="(op1, op2) {
    return op1 === op2;
  },

  // Console output:

  print(...args) {
    console.log(...args);
  },
});
