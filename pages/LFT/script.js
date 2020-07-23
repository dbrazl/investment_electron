let capital = 0;
let selic = 0;
let days = 0;

$(document).ready(() => {
  $(".capital").on("input", (event) => {
    debounce(() => {
      const { value } = event.target;
      const treat = value.replace(/[^\d.,]/g, "").replace(/[,]/, ".");

      $(".capital").val(treat);
      capital = parseFloat(treat);

      if (isFilled()) calcInvestimment();
    });
  });

  $(".selic").on("input", (event) => {
    debounce(() => {
      const { value } = event.target;
      const treat = value.replace(/[^\d.,]/g, "").replace(/[,]/, ".");

      $(".selic").val(treat);
      selic = parseFloat(treat);

      if (isFilled()) calcInvestimment();
    });
  });

  $(".days").on("input", (event) => {
    debounce(() => {
      const { value } = event.target;
      const treat = value.replace(/[\D]/, "");

      $(".days").val(treat);
      days = parseInt(treat);

      if (isFilled()) calcInvestimment();
    });
  });
});

function isFilled() {
  if (capital > 0 && selic > 0 && days > 0) return true;
  else {
    document.querySelector(".percent").innerHTML = `0.00%`;
    return false;
  }
}

function calcInvestimment() {
  const investimment = new Investimments();
  const rescue = investimment.lft(capital, selic, days);

  let percent = (rescue * 100).toFixed(2);
  console.log(percent);
  if (percent === "NaN") percent = "0.00";
  $(".percent").html(`${percent}%`);
}
