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
  // popups.prompt.log(`切换页面到 : ${origin}`);
  const top = `calc(${40 + 120 * pageslist.indexOf(origin)}px - ${100 * pageslist.indexOf(origin)}vh)`;
  if (pagesfirst.style.marginTop == top) {
    popups.prompt.warn(`取消切换页面 : 所需页面与当前页面无变动`);
  } else {
    popups.prompt.log(`切换页面到 : ${origin}`);
    pagesfirst.style.marginTop = top;
  }
};
