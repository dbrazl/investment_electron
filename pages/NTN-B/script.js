let buy = "";
let due = "";
let tir = 0;
let ipca = 0;
let ipcaLastDate = "";
let ipcaMonth = 0;

$(document).ready(() => {
  $(".buy").on("input", (event) => {
    if (event.originalEvent.inputType === "deleteContentBackward") {
      $(".buy").val(event.target.value);
      buy = `${event.target.value}`;
    } else {
      const value = $(".buy").val().replace(/[//]/g, "");
      $(".buy").val(dateMask(`${value}`));
      const [day, month, year] = event.target.value.split("/");
      buy = `${month}/${day}/${year}`;
    }

    if (isFiled()) calcInvestimment();
  });

  $(".due").on("input", (event) => {
    if (event.originalEvent.inputType === "deleteContentBackward") {
      $(".due").val(event.target.value);
      due = `${event.target.value}`;
    } else {
      const value = $(".due").val().replace(/[//]/g, "");
      $(".due").val(dateMask(`${value}`));
      const [day, month, year] = event.target.value.split("/");
      due = `${month}/${day}/${year}`;
    }

    if (isFiled()) calcInvestimment();
  });

  $(".tir").on("input", (event) => {
    const value = event.target.value.replace(/[.%]/g, "");
    const valueFloat = parseFloat(value / 100);

    if (event.originalEvent.inputType === "deleteContentBackward") {
      $(".tir").val(event.target.value);
      tir = valueFloat;
    } else {
      $(".tir").val(percentMask(`${valueFloat}`.replace(/[.]/g, "")));
      tir = valueFloat;
    }

    if (isFiled()) calcInvestimment();
  });

  $(".ipca").on("input", (event) => {
    const value = event.target.value;

    $(".ipca").val(value);
    ipca = value;

    if (isFiled()) calcInvestimment();
  });

  $(".ipcaLastDate").on("input", (event) => {
    if (event.originalEvent.inputType === "deleteContentBackward") {
      $(".ipcaLastDate").val(event.target.value);
      ipcaLastDate = event.target.value;
    } else {
      const value = $(".ipcaLastDate").val().replace(/[//]/g, "");
      $(".ipcaLastDate").val(dateMask(`${value}`));
      const [day, month, year] = event.target.value.split("/");
      ipcaLastDate = `${month}/${day}/${year}`;
    }

    if (isFiled()) calcInvestimment();
  });

  $(".ipcaMonth").on("input", (event) => {
    const value = event.target.value.replace(/[.%]/g, "");
    const valueFloat = parseFloat(value / 100);

    if (event.originalEvent.inputType === "deleteContentBackward") {
      $(".ipcaMonth").val(event.target.value);
      ipcaMonth = valueFloat;
    } else {
      $(".ipcaMonth").val(percentMask(`${valueFloat}`.replace(/[.]/g, "")));
      ipcaMonth = valueFloat;
    }

    if (isFiled()) calcInvestimment();
  });
});

function isFiled() {
  if (
    buy.length > 0 &&
    due.length > 0 &&
    tir !== 0 &&
    ipca !== 0 &&
    ipcaLastDate.length > 0 &&
    ipcaMonth !== 0
  )
    return true;
  else return false;
}

function calcInvestimment() {
  const body = {
    buy: new Date(buy),
    due: new Date(due),
    tir: tir / 100,
    ipca,
    ipcaLastDate: new Date(ipcaLastDate),
    ipcaMonth: ipcaMonth / 100,
  };

  fetch("http://localhost:3000/ntnb", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      const price = data.rescue.toFixed(2);
      $(".price").html(`R$ ${price}`);
    });
}
