let timeout = null;

function debounce(func, timer = 500) {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    func();
  }, timer);
}

const li = [
  "<li class='item'><p name='ltn'>LTN - Letra do Tesouro Nacional</p></li>",
  "<li class='item'><p name='lft'>LFT - Letra Financeira Nacional</p></li>",
  // "<li class='item'><p>NTN-B - Nota do Tesouro Nacional tipo B</p></li>",
  // "<li class='item'><p>NTN-F - Nota do Tesouro Nacional tipo F</p></li>",
  "<li class='item'><p name='export-note'>Export note</p></li>",
  "<li class='item'><p name='desconto-de-duplicatas'>Desconto de duplicata</p></li>",
  "<li class='item'><p name='commercial-paper'>Commercial paper</p></li>",
  "<li class='item'><p name='cdb'>CDB - Certificado de Depósitos Bancários</p></li>",
  `<li class='item'>
      <p name='cdb-over'>
        CDB over - Certificado de Depósitos Bancários com taxa over
      </p>
    </li>`,
];

$(document).ready(() => {
  $(".search").on("input", (event) => {
    debounce(() => {
      const { value } = event.target;
      $(".search").val(value);

      let html = "";
      li.forEach((item) => {
        if (item.toLowerCase().includes(value.toLowerCase()))
          html = html.concat(item);
      });

      $(".list").html(html);
      addEventListener("click", goTo);
    });
  });

  $(".item").on("click", goTo);
});

function goTo(event) {
  switch (event.target.getAttribute("name")) {
    case "ltn":
      window.open("../LTN/index.html", "_self");
      break;

    case "lft":
      window.open("../LFT/index.html", "_self");
      break;

    case "ntn-b":
      window.open("../NTN-B/index.html", "_self");
      break;

    case "ntn-f":
      window.open("../NTN-F/index.html", "_self");
      break;

    case "export-note":
      window.open("../ExportNote/index.html", "_self");
      break;

    case "desconto-de-duplicatas":
      window.open("../DescontoDuplicatas/index.html", "_self");
      break;

    case "commercial-paper":
      window.open("../CommercialPaper/index.html", "_self");
      break;

    case "cdb":
      window.open("../CDB/index.html", "_self");
      break;

    case "cdb-over":
      window.open("../CDBOver/index.html", "_self");
      break;

    default:
  }
}
