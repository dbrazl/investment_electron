let months = 0;
let rescue = 0;
let discountRate = 0;
let exchangeOnBuy = 0;
let exchangeOnRescue = 0;
let ir = 0;

$(document).ready(() => {
  $(".months").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    debounce(() => {
      $(".months").val(parseInt(treat));
      months = parseInt(treat);
      if (isFilled()) calcInvestiment();
    });
  });

  $(".rescue").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[^\d.,]/g, "").replace(/[,]/, ".");

    debounce(() => {
      $(".rescue").val(treat);
      rescue = parseFloat(treat);
      if (isFilled()) calcInvestiment();
    });
  });

  $(".discountRate").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".discountRate").val(value);
    else $(".discountRate").val(percentMask(`${parseInt(treat)}`));

    discountRate = parseInt(treat) / 10000;

    if (isFilled()) calcInvestiment();
  });

  $(".exchangeOnBuy").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[^\d.,]/g, "").replace(/[,]/, ".");

    debounce(() => {
      $(".exchangeOnBuy").val(treat);
      exchangeOnBuy = parseFloat(treat);
      if (isFilled()) calcInvestiment();
    });
  });

  $(".exchangeOnRescue").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[^\d.,]/g, "").replace(/[,]/, ".");

    debounce(() => {
      $(".exchangeOnRescue").val(treat);
      exchangeOnRescue = parseFloat(treat);
      if (isFilled()) calcInvestiment();
    });
  });

  $(".ir").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".ir").val(value);
    else $(".ir").val(percentMask(`${parseInt(treat)}`));

    ir = parseInt(treat) / 10000;

    if (isFilled()) calcInvestiment();
  });
});

function isFilled() {
  if (
    months !== 0 &&
    rescue !== 0 &&
    discountRate !== 0 &&
    exchangeOnBuy !== 0 &&
    exchangeOnRescue !== 0 &&
    ir !== 0
  )
    return true;
  else {
    document.querySelector(".percent").innerHTML = `0.00%`;
    return false;
  }
}

function calcInvestiment() {
  const invest = new Investimments();
  const tax = invest.exportNote(
    rescue,
    discountRate,
    ir,
    months,
    exchangeOnBuy,
    exchangeOnRescue
  );

  let treat = (tax * 100).toFixed(2);
  if (treat === "NaN") treat = "0.00";
  document.querySelector(".percent").innerHTML = `${treat}%`;
}
