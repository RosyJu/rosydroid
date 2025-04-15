let ipapi = {};

let key = '8651d36537bb41508d195715144bb976'

fetch("https://ipapi.co/json")
  .then((response) => response.json())
  .then((data) => {
    Object.assign(ipapi, data);
    Object.freeze(ipapi);
    fetch(
      `https://mc3jpbhw42.re.qweatherapi.com/v7/weather/3d?location=101010100&key=8651d36537bb41508d195715144bb976`
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
