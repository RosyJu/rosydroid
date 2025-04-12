var context;
var arr = new Array();
var starCount = 800;
var rains = new Array();
var rainCount = 20;

function init() {
  var stars = document.getElementById("stars");
  windowWidth = window.innerWidth;
  stars.width = windowWidth;
  stars.height = window.innerHeight;
  context = stars.getContext("2d");
}

// 创建一个星星对象
var Star = function () {
  this.x = windowWidth * Math.random();
  this.y = 5000 * Math.random();
  this.text = ".";
  this.color = "#fff";
  this.getColor = function () {
    var _r = Math.random();
    if (_r < 0.5) {
      this.color = "#333";
    } else {
      this.color = "#fff";
    }
  };
  // 初始化
  this.init = function () {
    this.getColor();
  };
  // 绘制
  this.draw = function () {
    context.fillStyle = this.color;
    context.fillText(this.text, this.x, this.y);
  };
};

// 页面加载的时候
window.onload = function () {
  init();
  // 画星星
  for (var i = 0; i < starCount; i++) {
    var star = new Star();
    star.init();
    star.draw();
    arr.push(star);
  }
  // 画流星
  for (var i = 0; i < rainCount; i++) {
    var rain = new MeteorRain();
    rain.init();
    rain.draw();
    rains.push(rain);
  }
  playStars();
  playRains();
};

// 星星闪起来
function playStars() {
  for (var n = 0; n < starCount; n++) {
    arr[n].getColor();
    arr[n].draw();
  }

  setTimeout("playStars()", 100);
}

/* 流星雨开始 */
var MeteorRain = function () {
  this.x = -1;
  this.y = -1;
  this.length = -1; // 长度
  this.angle = 30; // 倾斜角度
  this.width = -1; // 宽度
  this.height = -1; // 高度
  this.speed = 1; // 速度
  this.offset_x = -1; // 横轴移动偏移量
  this.offset_y = -1; // 纵轴移动偏移量
  this.alpha = 1; // 透明度
  this.color1 = ""; // 流星的色彩
  this.color2 = ""; // 流星的色彩

  /****************初始化函数********************/
  this.init = function () // 初始化
  {
    this.getPos();
    this.alpha = 1; // 透明度
    this.getRandomColor();
    // 最小长度，最大长度
    var x = Math.random() * 80 + 150;
    this.length = Math.ceil(x);
    // x = Math.random()*10+30;
    this.angle = 30; // 流星倾斜角
    x = Math.random() + 0.5;
    this.speed = Math.ceil(x); // 流星的速度
    var cos = Math.cos((this.angle * 3.14) / 180);
    var sin = Math.sin((this.angle * 3.14) / 180);
    this.width = this.length * cos; // 流星所占宽度
    this.height = this.length * sin; // 流星所占高度
    this.offset_x = this.speed * cos;
    this.offset_y = this.speed * sin;
  };

  /**************获取随机颜色函数*****************/
  this.getRandomColor = function () {
    var a = Math.ceil(255 - 240 * Math.random());
    // 中段颜色
    this.color1 = "rgba(" + a + "," + a + "," + a + ",1)";
    // 结束颜色
    this.color2 = "black";
  };

  /***************重新计算流星坐标的函数******************/
  this.countPos = function () //
  {
    // 往左下移动,x减少，y增加
    this.x = this.x - this.offset_x;
    this.y = this.y + this.offset_y;
  };

  /*****************获取随机坐标的函数*****************/
  this.getPos = function () //
  {
    // 横坐标200--1200
    this.x = Math.random() * window.innerWidth; // 窗口高度
    // 纵坐标小于600
    this.y = Math.random() * window.innerHeight; // 窗口宽度
  };

  /****绘制流星***************************/
  this.draw = function () // 绘制一个流星的函数
  {
    context.save();
    context.beginPath();
    context.lineWidth = 1; // 宽度
    context.globalAlpha = this.alpha; // 设置透明度
    // 创建横向渐变颜色,起点坐标至终点坐标
    var line = context.createLinearGradient(
      this.x,
      this.y,
      this.x + this.width,
      this.y - this.height
    );
    // 分段设置颜色
    line.addColorStop(0, "white");
    line.addColorStop(0.3, this.color1);
    line.addColorStop(0.6, this.color2);
    context.strokeStyle = line;
    // 起点
    context.moveTo(this.x, this.y);
    // 终点
    context.lineTo(this.x + this.width, this.y - this.height);
    context.closePath();
    context.stroke();
    context.restore();
  };

  this.move = function () {
    var x = this.x + this.width - this.offset_x;
    var y = this.y - this.height;
    context.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5);
    this.countPos();
    this.alpha -= 0.002;
    this.draw();
  };
};

// 绘制流星
function playRains() {
  for (var n = 0; n < rainCount; n++) {
    var rain = rains[n];
    rain.move();
    if (rain.y > window.innerHeight) {
      context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
      rains[n] = new MeteorRain();
      rains[n].init();
    }
  }
  setTimeout("playRains()", 2);
}

const dateday = document.querySelectorAll("div.day > span")[0];

let seed;

function Fdate() {
  // 计算时间戳起点终点时间段的时间戳差距
  const start = 1729785600; // 2024.12.25T23:10+0800
  let end = Math.floor(Date.now() / 1000);
  let TimePeriod = end - start; // 差距
  // 计算单位时间差
  let day = Math.floor(TimePeriod / 86400) - 1; // 天
  // 页面插入已完成的时间
  seed = day;
  dateday.textContent = day;
  return Fdate;
}

const identity = [
  ["大哥", "小弟"],
  ["小弟", "大哥"],
  ["小宝", "大宝"],
  ["爱妃", "皇上"],
  ["皇上", "???"],
  ["姐姐", "???"],
  ["主人", "小狗"],
  ["妈妈", "???"],
  ["???", "爸爸"],
  ["妹妹", "哥哥"],
];

let rnd = (seed) => {
  // 线性同余生成器常数
  const m = 0x80000000; // 模 m (2^31)
  const a = 1103515245; // 常数 a
  const c = 12345; // 常数 c

  let state = seed || Math.floor(Math.random() * m); // 初始化状态，使用传入的种子

  // 生成下一个伪随机数 [0, 1)
  function next() {
    state = (a * state + c) % m;
    return state / m; // 返回 [0, 1) 之间的浮动数
  }

  // 生成 [min, max] 范围内的随机整数
  function nextInt(min, max) {
    return Math.floor(next() * (max - min + 1)) + min;
  }

  // 返回生成的随机数和整数函数
  return {
    next,
    nextInt,
  };
};

// 传递函数引用而不是立即调用
let date = setInterval(Fdate(), 1000);

document.querySelectorAll("div.body > div.up")[0].addEventListener(
  "click",
  () => {
    document
      .querySelectorAll("div.body > div.up")[0]
      .setAttribute("flop", "true");
  },
  { once: true }
);

document.querySelectorAll("div.top > span")[0].textContent =
  identity[rnd(seed).nextInt(0, identity.length - 1)][0];
document.querySelectorAll("div.bottom > span")[0].textContent =
  identity[rnd(seed).nextInt(0, identity.length - 1)][1];
