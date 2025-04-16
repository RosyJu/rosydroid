let ipapi = {};

let key = "8651d36537bb41508d195715144bb976";

fetch("https://ipapi.co/json")
  .then((response) => response.json())
  .then((data) => {
    Object.assign(ipapi, data);
    Object.freeze(ipapi);
    console.log(ipapi)
    fetch(`${window.location.origin}/.netlify/functions/test?location=${ipapi.longitude},${ipapi.latitude}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("请求失败:", error);
      });
  })
  .catch((error) => {
    console.error("请求失败:", error);
  });
