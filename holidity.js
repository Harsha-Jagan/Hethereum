const STOP = "STOP";
const ADD = "ADD";
const SUB = "SUB";
const MUL = "MUL";
const DIV = "DIV";
const PUSH = "PUSH";

// comparisons
const LT = "LT";
const GT = "GT";
const EQ = "EQ";
const AND = "AND";
const OR = "OR";

//jumps
const JUMP = "JUMP";
const JUMPI = "JUMPI";

//
const EXECUTION_COMPLETE = "Execution complete";
const EXECUTION_LIMIT = 10000;

class Interpreter {
  constructor() {
    this.state = {
      programCounter: 0,
      stack: [],
      code: [],
      executionCount: 0,
    };
  }

  jump() {
    const destination = this.state.stack.pop();

    if (destination < 0 || destination >= this.state.code.length) {
      throw new Error(`Invalid destination: ${destination}`);
    }

    this.state.programCounter = destination;
    this.state.programCounter--;
  }

  runCode(code) {
    this.state.programCounter = 0;
    this.state.executionCount = 0;
    this.state.code = code;
    this.state.stack = [];

    while (this.state.programCounter < this.state.code.length) {
      this.state.executionCount++;
      if (this.state.executionCount > EXECUTION_LIMIT) {
        throw new Error(
          `Check for an infinite loop. Execution limit of ${EXECUTION_LIMIT} exceeded`
        );
      }

      const opCode = this.state.code[this.state.programCounter];

      try {
        switch (opCode) {
          case STOP:
            throw new Error(EXECUTION_COMPLETE);
          case PUSH:
            this.state.programCounter++;
            if (this.state.programCounter === this.state.code.length) {
              throw new Error(`The 'PUSH' instruction cannot be last`);
            }

            const value = this.state.code[this.state.programCounter];
            this.state.stack.push(value);
            break;
          case LT:
          case GT:
          case EQ:
          case ADD:
          case SUB:
          case MUL:
          case DIV:
          case AND:
          case OR:
            if (this.state.stack.length < 2) {
              throw new Error(`Not enough values pushed to the stack`);
            }
            const a = this.state.stack.pop();
            const b = this.state.stack.pop();
            if (typeof a != "number" || typeof b !== "number") {
              throw new Error(
                `operands are not numbers. Found a:${a} and b:${b}`
              );
            }

            let result;
            console.log(opCode);
            if (opCode === ADD) result = a + b;
            else if (opCode === SUB) result = a - b;
            else if (opCode === MUL) result = a * b;
            else if (opCode === DIV) result = a / b;
            else if (opCode === LT) result = a < b ? 1 : 0;
            else if (opCode === GT) result = a > b ? 1 : 0;
            else if (opCode === EQ) result = a === b ? 1 : 0;
            else if (opCode === AND) result = a && b;
            else if (opCode === OR) result = a || b;
            this.state.stack.push(result);
            break;
          case JUMP:
            this.jump();
            break;
          case JUMPI:
            const condition = this.state.stack.pop();

            if (condition === 1) {
              this.jump();
            }
            break;
          default:
            throw new Error(`Invalid opCode ${opCode}`);
            break;
        }
      } catch (error) {
        if (error.message === EXECUTION_COMPLETE) {
          return this.state.stack[this.state.stack.length - 1];
        }

        throw error;
      }

      this.state.programCounter++;
    }
  }
}

function main() {
  const interpreter = new Interpreter();
  const code1 = [PUSH, 2, PUSH, 3, ADD, STOP];
  const code2 = [PUSH, 2, PUSH, 3, SUB, STOP];
  const code3 = [PUSH, 2, PUSH, 3, MUL, STOP];
  const code4 = [PUSH, 2, PUSH, 3, DIV, STOP];
  //   comparisons
  const code5 = [PUSH, 2, PUSH, 3, LT, STOP];
  const code6 = [PUSH, 2, PUSH, 3, GT, STOP];
  const code7 = [PUSH, 2, PUSH, 3, EQ, STOP];
  const code8 = [PUSH, 1, PUSH, 1, AND, STOP];
  const code9 = [PUSH, 0, PUSH, 0, OR, STOP];

  //jump
  const code10 = [PUSH, 6, JUMP, PUSH, 0, JUMP, PUSH, "jump successful", STOP];
  const code11 = [
    PUSH,
    8,
    PUSH,
    1,
    JUMPI,
    PUSH,
    0,
    JUMP,
    PUSH,
    "jumpi successful",
    STOP,
  ];

  const code12 = [PUSH, -1, JUMP];
  const code13 = [PUSH];

  const code14 = [PUSH, 0, JUMP, STOP];
  const code15 = ["test"];
  const code16 = [ADD];
  const code17 = [PUSH, 10, PUSH, "test", ADD];

  result = interpreter.runCode(code1);
  console.log(result);

  result = interpreter.runCode(code2);
  console.log(result);

  result = interpreter.runCode(code3);
  console.log(result);

  result = interpreter.runCode(code4);
  console.log(result);

  //   comparisons
  result = interpreter.runCode(code5);
  console.log(result);

  result = interpreter.runCode(code6);
  console.log(result);

  result = interpreter.runCode(code7);
  console.log(result);

  result = interpreter.runCode(code8);
  console.log(result);

  result = interpreter.runCode(code9);
  console.log(result);

  //   jumps
  result = interpreter.runCode(code10);
  console.log(result);

  result = interpreter.runCode(code11);
  console.log(result);

  //errors
  try {
    result = interpreter.runCode(code12);
  } catch (error) {
    console.log(error.message);
  }

  try {
    result = interpreter.runCode(code13);
  } catch (error) {
    console.log(error.message);
  }

  try {
    result = interpreter.runCode(code14);
  } catch (error) {
    console.log(error.message);
  }

  try {
    result = interpreter.runCode(code15);
  } catch (error) {
    console.log(error.message);
  }

  try {
    result = interpreter.runCode(code16);
  } catch (error) {
    console.log(error.message);
  }

  try {
    result = interpreter.runCode(code17);
  } catch (error) {
    console.log(error.message);
  }
}

main();
