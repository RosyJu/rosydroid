const pagesfirst = document.querySelectorAll(
  "div.applist div.page:first-child"
)[0];
const pageslist = [];
document.querySelectorAll("div.applist div.page").forEach((dom) => {
  pageslist.push(dom.id);
});
const pagechange = async (dom) => {
  const origin = dom
    .querySelectorAll("div.origin span")[0]
    .textContent.replace(/\s*/g, "");
  popups.prompt.log(`切换页面到 : ${origin}`);
  const top = `calc((100vh - 160px) * -${pageslist.indexOf(origin)} - 40px * ${
    pageslist.indexOf(origin) - 1
  }`;
  pagesfirst.style.marginTop = top;
};
