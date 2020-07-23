let capital = 0;
let ir = 0;
let days = 0;

$(document).ready(() => {
  $(".capital").on("input", (event) => {
    debounce(() => {
      const { value } = event.target;
      const treat = value.replace(/[^\d.,]/g, "").replace(/[,]/, ".");

      $(".capital").val(parseFloat(treat));
      capital = parseFloat(treat);

      if (isFiled()) calcInvestimment();
    });
  });

  $(".ir").on("input", (event) => {
    const value = event.target.value;
    const treat = value.replace(/[\D]/g, "");

    if (event.originalEvent.inputType === "deleteContentBackward")
      $(".ir").val(value);
    else $(".ir").val(percentMask(`${parseInt(treat)}`));

    ir = parseInt(treat) / 10000;

    if (isFiled()) calcInvestimment();
  });

  $(".days").on("input", (event) => {
    debounce(() => {
      const { value } = event.target;
      const treat = value.replace(/[\D]/g, "");

      $(".days").val(treat);
      days = parseInt(treat);
      if (isFiled()) calcInvestimment();
    });
  });
});

function isFiled() {
  if (capital > 0 && ir > 0 && days > 0) return true;
  else {
    document.querySelector(".percent").innerHTML = `0.00%`;
    return false;
  }
}

function calcInvestimment() {
  const investimment = new Investimments();
  const rescue = investimment.ltn(capital, ir, days);

  let percent = (rescue * 100).toFixed(2);
  if (percent === "NaN") percent = "0.00";
  $(".percent").html(`${percent}%`);
}
