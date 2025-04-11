fetch("https://v1.jinrishici.com/shuqing/aiqing")
  .then((response) => response.json())
  .then((data) => {
    document.querySelectorAll("div.poetry > div.origin")[0].textContent = data.origin
    document.querySelectorAll("div.poetry > div.content")[0].textContent = data.content
    document.querySelectorAll("div.poetry > div.author")[0].textContent = data.author
  })
  .catch((error) => {
    document.querySelectorAll("div.poetry > div.origin")[0].textContent = ""
    document.querySelectorAll("div.poetry > div.content")[0].textContent = "诗词加载失败详细查看控制台报错"
    document.querySelectorAll("div.poetry > div.author")[0].textContent = ""
    console.error(`今日诗词加载失败,原因 : ${error}`);
  });
