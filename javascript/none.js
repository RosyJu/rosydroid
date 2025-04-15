let ipapi = {};

let key = '8651d36537bb41508d195715144bb976'

fetch("https://ipapi.co/json")
  .then((response) => response.json())
  .then((data) => {
    Object.assign(ipapi, data);
    Object.freeze(ipapi);
    fetch(
      `https://rosy.love/.netlify/functions/test`
    ).then((response) => {response.json()})
    .then((data) => {
        console.log(data)
    }).catch((error) => {
        console.error("请求失败:", error);
    });
  })
  .catch((error) => {
    console.error("请求失败:", error);
  });
