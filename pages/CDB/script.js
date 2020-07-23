let tax = 0;
let months = 0;
let ir = 0;

$(document).ready(() => {
  $(".tax").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".tax").val(value);
    else $(".tax").val(percentMask(`${parseFloat(treat)}`));

    tax = parseFloat(treat) / 10000;

    if (isFilled()) calcInvestmments();
  });

  $(".months").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    debounce(() => {
      $(".months").val(treat);
      months = treat;
      if (isFilled()) calcInvestmments();
    });
  });

  $(".ir").on("input", (event) => {
    const { value } = event.target;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".ir").val(value);
    else $(".ir").val(percentMask(`${parseInt(treat)}`));

    ir = parseInt(treat) / 10000;

    if (isFilled()) calcInvestmments();
  });
});

function isFilled() {
  if (tax > 0 && months > 0 && ir > 0) return true;
  else {
    document.querySelector(".percent").innerHTML = `0.00%`;
    return false;
  }
}

function calcInvestmments() {
  const invest = new Investimments();
  const data = invest.cdb(tax, months, ir);

  let treat = (data * 100).toFixed(2);
  if (treat === "NaN") treat = "0.00";
  document.querySelector(".percent").innerHTML = `${treat}%`;
}
