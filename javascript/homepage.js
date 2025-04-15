
let calendar = () => {
    fetch(`https://api.shwgij.com/api/lunars/lunarpro?key=KzdzjTBJCvdJawXN3hOLJVwxV4&date=`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(async (data) => {
    data = data.data
    let dom = document.querySelectorAll("div.item.calendar")[0]
    dom.querySelectorAll("div.lunar span")[0].textContent = data.Lunar
    dom.querySelectorAll("div.ganzhi span")[0].textContent = `${data.GanZhiYear} ${data.ThisYear} ${data.GanZhiMonth} ${data.GanZhiDay} ${data.Week}`
    dom.querySelectorAll("div.yi div.content")[0].textContent = data.YiDay
    dom.querySelectorAll("div.ji div.content")[0].textContent = data.JiDay
})
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
}
calendar()