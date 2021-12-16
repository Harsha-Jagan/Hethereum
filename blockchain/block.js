const { GENESIS_DATA } = require("../config");
class Block {
  constructor({ blockHeaders }) {
    this.blockHeaders = blockHeaders;
  }

  static calculateBlockTargetHash({ lastBlock }) {}

  static mineBlock({ lastBlock, beneficiary }) {}

  static genesis() {
    return new Block(GENESIS_DATA);
  }
}

module.exports = Block;
