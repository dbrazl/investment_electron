const Investimments = require("./Investimments");

// rescue, discontRate, ir, months, exchangeOnBuy, exchangeOnRescue

// tax, months, ir
const tax = 0.005;
const months = 18;
const ir = 0.175;

const invest = new Investimments();
const cdb = invest.cdb(tax, months, ir);

console.log(cdb);
