function Fdate() {
  document.querySelectorAll("div.card div.date span.time")[0].textContent = (
    (Math.floor(Date.now() / 1000) - 1729869000) /
    86400
  ).toFixed(5);
  return Fdate;
}
let date = setInterval(Fdate(), 1000);