const Investimments = require("./Investimments");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ntnb", (request, response) => {
  const { buy, due, tir, ipca, ipcaLastDate, ipcaMonth } = request.body;
  const investimments = new Investimments();

  const rescue = investimments.NTN_B(
    new Date(buy),
    new Date(due),
    parseFloat(tir),
    parseFloat(ipca),
    new Date(ipcaLastDate),
    parseFloat(ipcaMonth)
  );

  console.log({
    buy: new Date(buy),
    due: new Date(due),
    tir: parseFloat(tir),
    ipca: parseFloat(ipca),
    ipcaLast: new Date(ipcaLastDate),
    ipcaMonth: parseFloat(ipcaMonth),
    rescue,
  });

  return response.status(200).json({ rescue });
});

app.listen(3000, () => {
  console.log("Listen on 3000.");
});
