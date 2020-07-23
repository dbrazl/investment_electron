// const {
//   addDays,
//   addMonths,
//   differenceInBusinessDays,
//   differenceInMonths,
//   isAfter,
// } = require("date-fns");

class Investimments {
  ltn(capital, ir, days) {
    if (capital > 1000) return 0;

    const irAmount = (1000 - capital) * ir;
    const rescue = 1000 - irAmount;

    return (rescue / capital) ** (252 / days) - 1;
  }

  lft(capital, selic, days) {
    const vna = 1000 * selic;
    return (vna / capital) ** (252 / days) - 1;
  }

  // NTN_B(buy, due, tir, ipca, ipcaLastDate, ipcaMonth) {
  //   const liquidation = addDays(buy, 1);

  //   const denominator = addMonths(ipcaLastDate, 1);
  //   const distance =
  //     differenceInBusinessDays(liquidation, ipcaLastDate) / denominator;

  //   const vnaLine = 1000 * ipca;
  //   const vna = vnaLine * (1 + ipcaMonth / 100) ** distance;

  //   let dates = [];

  //   const day = due.getDate();
  //   const month = due.getMonth() + 1;
  //   const year = liquidation.getFullYear();

  //   const firstPayament = new Date(`${month}/${day}/${year}`);

  //   const first = differenceInBusinessDays(firstPayament, liquidation);
  //   dates.push(first);

  //   const months = differenceInMonths(due, firstPayament);
  //   const interator = months / 6;

  //   for (let i = 1; i <= interator; i++) {
  //     const payament = addMonths(firstPayament, 6 * i);
  //     const dif = differenceInBusinessDays(payament, liquidation);
  //     dates.push(dif);
  //   }

  //   let cotation = 0;

  //   for (const index in dates) {
  //     if (parseInt(index) === dates.length - 1)
  //       cotation += 1.06 ** 0.5 / (1 + tir) ** (dates[index] / 252);
  //     else cotation += (1.06 ** 0.5 - 1) / (1 + tir) ** (dates[index] / 252);
  //   }

  //   const price = vna * cotation;

  //   return price;
  // }

  // ntnf(buy, due, tir) {
  //   const liquidation = addDays(buy, 1);

  //   const date = addMonths(liquidation, 6);
  //   const day = due.getDate();
  //   const month = due.getMonth() + 1;
  //   const year = date.getFullYear();

  //   const firstPayament = new Date(`${month}/${day}/${year}`);

  //   let businessDays = [];

  //   const first = differenceInBusinessDays(firstPayament, liquidation);
  //   businessDays.push(first);

  //   const interator = differenceInMonths(due, firstPayament) / 6;

  //   for (let i = 1; i <= interator; i++) {
  //     const date = addMonths(firstPayament, 6 * i);
  //     const days = differenceInBusinessDays(date, liquidation);
  //     businessDays.push(days);
  //   }
  //   console.log(businessDays);
  // }

  exportNote(
    rescue,
    discountRate,
    ir,
    months,
    exchangeOnBuy,
    exchangeOnRescue
  ) {
    const present = rescue / (1 + (discountRate * months) / 12);
    const buyValue = present * exchangeOnBuy;
    const rescueValue = rescue * exchangeOnRescue;
    const tax = rescueValue / buyValue - 1;
    const liquid = tax * (1 - ir);
    return (1 + liquid) ** (12 / months) - 1;
  }

  duplicateDiscount(rescue, discountRate, days, addRate, iof) {
    const discount = discountRate * (days / 30) * rescue;
    const iofValue = iof * days * rescue;
    const taValue = addRate * rescue;
    const present = rescue - discount - iofValue - taValue;
    const taxPeriod = rescue / present - 1;
    const taxMonth = (1 + taxPeriod) ** (30 / days) - 1;
    return (1 + taxMonth) ** 12 - 1;
  }

  commercialPaper(rescue, discountRate, lauchExpenses) {
    const discount = discountRate * rescue;
    const expensies = lauchExpenses * rescue;
    const present = rescue - discount - expensies;
    const taxPeriod = rescue / present - 1;
    const taxMonth = (1 + taxPeriod) ** (1 / 3) - 1;
    return (1 + taxMonth) ** 12 - 1;
  }

  cdb(tax, months, ir) {
    const taxPeriod = (1 + tax) ** months - 1;
    const liquid = taxPeriod * (1 - ir);
    return (1 + liquid) ** (12 / months) - 1;
  }

  cdbOver(tax, days, ir) {
    const taxPeriod = (1 + tax / 30) ** days - 1;
    const liquid = taxPeriod * (1 - ir);
    return (1 + liquid) ** (252 / days) - 1;
  }
}

// module.exports = Investimments;
