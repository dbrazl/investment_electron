let discountRate = 0;
let lauchExpenses = 0;
let rescue = 0;

$(document).ready(() => {
  $(".rescue").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[^\d,.]/, "").replace(/[,]/, ".");

    debounce(() => {
      $(".rescue").val(treat);
      rescue = parseFloat(treat);
    });

    if (isFilled()) calcInvestimments();
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

  $(".lauchExpenses").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".lauchExpenses").val(value);
    else $(".lauchExpenses").val(percentMask(`${parseInt(treat)}`));

    lauchExpenses = parseInt(treat) / 10000;

    if (isFilled()) calcInvestimments();
  });
});

function isFilled() {
  if (discountRate > 0 && lauchExpenses > 0 && rescue > 0) return true;
  else {
    document.querySelector(".percent").innerHTML = `0.00%`;
    return false;
  }
}

function calcInvestimments() {
  const invest = new Investimments();
  const commercial = invest.commercialPaper(
    rescue,
    discountRate,
    lauchExpenses
  );

  let treat = (commercial * 100).toFixed(2);
  if (treat === "NaN") treat = "0.00";
  document.querySelector(".percent").innerHTML = `${treat}%`;
}
