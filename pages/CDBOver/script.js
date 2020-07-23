let tax = 0;
let days = 0;
let ir = 0;

$(document).ready(() => {
  $(".tax").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".tax").val(value);
    else $(".tax").val(percentMask(`${parseInt(treat)}`));

    tax = parseInt(treat) / 10000;

    if (isFilled()) calcInvestimments();
  });

  $(".days").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    debounce(() => {
      $(".days").val(treat);
      days = parseInt(treat);
    });

    if (isFilled()) calcInvestimments();
  });

  $(".ir").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".ir").val(value);
    else $(".ir").val(percentMask(`${parseInt(treat)}`));

    ir = parseInt(treat) / 10000;

    if (isFilled()) calcInvestimments();
  });
});

function isFilled() {
  if (tax > 0 && days > 0) return true;
  else {
    document.querySelector(".percent").innerHTML = `0.00%`;
    return false;
  }
}

function calcInvestimments() {
  const invest = new Investimments();
  const cdbOver = invest.cdbOver(tax, days, ir);

  let treat = (cdbOver * 100).toFixed(2);
  if (treat === "NaN") treat = "0.00";
  document.querySelector(".percent").innerHTML = `${treat}%`;
}
