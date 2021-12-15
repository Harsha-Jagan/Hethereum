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

class Interpreter {
  constructor() {
    this.state = {
      programCounter: 0,
      stack: [],
      code: [],
    };
  }

  runCode(code) {
    this.state.programCounter = 0;
    this.state.code = code;

    while (this.state.programCounter < this.state.code.length) {
      const opCode = this.state.code[this.state.programCounter];

      try {
        switch (opCode) {
          case STOP:
            throw new Error("Execution complete");
          case PUSH:
            this.state.programCounter++;
            const value = this.state.code[this.state.programCounter];
            this.state.stack.push(value);
            break;
          case ADD:
          case SUB:
          case MUL:
          case DIV:
            const a = this.state.stack.pop();
            const b = this.state.stack.pop();

            let result;
            console.log(opCode);
            if (opCode === ADD) result = a + b;
            else if (opCode === SUB) result = a - b;
            else if (opCode === MUL) result = a * b;
            else if (opCode === DIV) result = a / b;

            this.state.stack.push(result);
            break;
          default:
            break;
        }
      } catch (error) {
        return this.state.stack[this.state.stack.length - 1];
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

  result = interpreter.runCode(code1);
  console.log(result);

  result = interpreter.runCode(code2);
  console.log(result);

  result = interpreter.runCode(code3);
  console.log(result);

  result = interpreter.runCode(code4);
  console.log(result);
}

main();
