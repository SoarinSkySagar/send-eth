const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SendModule = buildModule("TokenModule", (m) => {
  const send = m.contract("Send");

  return { send };
});

module.exports = SendModule;