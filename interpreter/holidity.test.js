const Interpreter = require("./holidity");
const {
  STOP,
  ADD,
  SUB,
  MUL,
  DIV,
  PUSH,

  // comparisons
  LT,
  GT,
  EQ,
  AND,
  OR,

  //jumps
  JUMP,
  JUMPI,
} = Interpreter.OPCODE_MAP;

function addTests() {
  describe("and the code includes ADD", () => {
    it("adds two values 1", () => {
      expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, ADD, STOP])).toEqual(
        5
      );
    });

    it("adds two values 2", () => {
      expect(
        new Interpreter().runCode([PUSH, -1, PUSH, -10000000.2332, ADD, STOP])
      ).toEqual(-10000001.2332);
    });

    it("adds two values invalid 3", () => {
      expect(() =>
        new Interpreter().runCode([PUSH, -10000000.2332, ADD, STOP])
      ).toThrow("Not enough values pushed to the stack");
    });

    it("adds two values invalid 4", () => {
      expect(() => new Interpreter().runCode([ADD])).toThrow(
        "Not enough values pushed to the stack"
      );
    });
  });
}

function subTests() {
  describe("and the code includes SUB", () => {
    it("subtracts two values 1", () => {
      expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, SUB, STOP])).toEqual(
        1
      );
    });

    it("subtracts two values 2 without stop", () => {
      expect(new Interpreter().runCode([PUSH, -1, PUSH, -2, SUB])).toEqual(
        undefined
      );
    });

    it("subtracts two values 2 with stop", () => {
      expect(
        new Interpreter().runCode([PUSH, -1, PUSH, -2, SUB, STOP])
      ).toEqual(-1);
    });

    it("subtracts two values 3 with invalid", () => {
      expect(() =>
        new Interpreter().runCode([PUSH, "test", PUSH, -2, SUB, STOP])
      ).toThrow("operands are not numbers. Found a:-2 and b:test");
    });
  });
}

function mulTests() {
  describe("and the code includes MULT", () => {
    it("multiplies two values 1", () => {
      expect(new Interpreter().runCode([PUSH, 3, PUSH, 4, MUL, STOP])).toEqual(
        12
      );
    });
  });
}

function divTests() {
  describe("and the code includes DIV", () => {
    it("divides two values 1", () => {
      expect(new Interpreter().runCode([PUSH, 2, PUSH, 4, DIV, STOP])).toEqual(
        2
      );
    });
  });
}

function pushTests() {
  describe("and the code includes PUSH", () => {
    it("pushes value 1", () => {
      expect(new Interpreter().runCode([PUSH, 2, STOP])).toEqual(2);
    });

    it("pushes value 2", () => {
      expect(new Interpreter().runCode([PUSH, "temp", STOP])).toEqual("temp");
    });
  });
}

function ltTests() {
  describe("and the code includes LT", () => {
    it("less than 1", () => {
      expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, LT, STOP])).toEqual(
        0
      );
    });

    it("less than 2", () => {
      expect(new Interpreter().runCode([PUSH, 3, PUSH, 2, LT, STOP])).toEqual(
        1
      );
    });
  });
}

function gtTests() {
  describe("and the code includes GT", () => {
    it("greater than 1", () => {
      expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, GT, STOP])).toEqual(
        1
      );
    });
  });
}

function eqTests() {
  describe("and the code includes EQ", () => {
    it("equal to 1", () => {
      expect(new Interpreter().runCode([PUSH, 2, PUSH, 2, EQ, STOP])).toEqual(
        1
      );
    });
  });
}

function andTests() {
  describe("and the code includes AND", () => {
    it("and 1", () => {
      expect(new Interpreter().runCode([PUSH, 1, PUSH, 1, EQ, STOP])).toEqual(
        1
      );
    });
  });
}

function orTests() {
  describe("and the code includes OR", () => {
    it("or 1", () => {
      expect(new Interpreter().runCode([PUSH, 1, PUSH, 0, OR, STOP])).toEqual(
        1
      );
    });
  });
}

function jumpTests() {
  describe("and the code includes JUMP", () => {
    it("jump 1", () => {
      expect(
        new Interpreter().runCode([PUSH, 6, JUMP, PUSH, 3, LT, STOP])
      ).toEqual(undefined);
    });
  });
}

function jumpiTests() {
  describe("and the code includes JUMPI", () => {
    it("jumpi 1", () => {
      expect(
        new Interpreter().runCode([
          PUSH,
          9,
          PUSH,
          1,
          JUMPI,
          1,
          PUSH,
          3,
          LT,
          STOP,
        ])
      ).toEqual(undefined);
    });
  });
}

function errorTests() {
  describe("and the code is invalid", () => {
    it("invalid opcode 1", () => {
      expect(() => new Interpreter().runCode([3, 4, MUL, STOP])).toThrow(
        "Invalid opCode 3"
      );
    });
  });
}

describe("Interpreter", () => {
  describe("runCode()", () => {
    addTests();
    subTests();
    mulTests();
    divTests();
    pushTests();
    ltTests();
    gtTests();
    eqTests();
    andTests();
    orTests();
    jumpTests();
    jumpiTests();
    errorTests();
  });
});
