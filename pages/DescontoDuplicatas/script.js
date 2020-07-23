let rescue = 0;
let discountRate = 0;
let days = 0;
let addRate = 0;
let iof = 0;

$(document).ready(() => {
  $(".rescue").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[^\d.,]/g, "").replace(/[,]/, ".");

    debounce(() => {
      $(".rescue").val(treat);
      rescue = parseFloat(treat);
      if (isFilled()) calcInvestimments();
    });
  });

  $(".discountRate").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".discountRate").val(value);
    else $(".discountRate").val(percentMask(`${parseInt(treat)}`));

    discountRate = parseInt(treat) / 10000;

    if (isFilled()) calcInvestimments();
  });

  $(".days").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    debounce(() => {
      $(".days").val(treat);
      days = parseFloat(treat);
    });
  });

  $(".addRate").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".addRate").val(value);
    else $(".addRate").val(percentMask(`${parseInt(treat)}`));

    addRate = parseInt(treat) / 10000;

    if (isFilled()) calcInvestimments();
  });

  $(".iof").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".iof").val(value);
    else $(".iof").val(percent4Mask(`${parseInt(treat)}`));

    iof = parseInt(treat) / 1000000;

    if (isFilled()) calcInvestimments();
  });
});

function isFilled() {
  if (rescue > 0 && discountRate > 0 && days > 0 && addRate > 0 && iof > 0)
    return true;
  else {
    document.querySelector(".percent").innerHTML = `0.00%`;
    return false;
  }
}

function calcInvestimments() {
  const invest = new Investimments();
  const tax = invest.duplicateDiscount(
    rescue,
    discountRate,
    days,
    addRate,
    iof
  );

  let treat = (tax * 100).toFixed(2);
  if (treat === "NaN") treat = "0.00";
  document.querySelector(".percent").innerHTML = `${treat}%`;
}
