// 背景粒子效果
const particlesContainer = document.getElementById("particles");
const colors = ["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb", "#ff758c"];

for (let i = 0; i < 50; i++) {
  createParticle();
}

function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";
  particle.style.width = Math.random() * 8 + 4 + "px";
  particle.style.height = particle.style.width;
  particle.style.background = `linear-gradient(45deg, ${
    colors[Math.floor(Math.random() * colors.length)]
  }, ${colors[Math.floor(Math.random() * colors.length)]})`;
  particle.style.animationDuration = Math.random() * 15 + 10 + "s";
  particle.style.animationDelay = Math.random() * 5 + "s";
  particlesContainer.appendChild(particle);
}

// 鼠标跟随粒子效果
const mouseParticlesContainer = document.getElementById("mouseParticles");
let mouseX = 0;
let mouseY = 0;
let particles = [];

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // 创建跟随鼠标的粒子
  if (Math.random() > 0.7) {
    createMouseParticle(mouseX, mouseY);
  }
});

function createMouseParticle(x, y) {
  const particle = document.createElement("div");
  particle.className = "mouse-particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.width = Math.random() * 8 + 4 + "px";
  particle.style.height = particle.style.width;
  particle.style.background = `linear-gradient(45deg, ${
    colors[Math.floor(Math.random() * colors.length)]
  }, ${colors[Math.floor(Math.random() * colors.length)]})`;
  mouseParticlesContainer.appendChild(particle);

  // 粒子动画
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 3 + 2;
  const lifetime = Math.random() * 1000 + 500;

  const particleObj = {
    element: particle,
    x: x,
    y: y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    birth: Date.now(),
    lifetime: lifetime,
  };

  particles.push(particleObj);

  // 移除粒子
  setTimeout(() => {
    particle.remove();
    particles = particles.filter((p) => p !== particleObj);
  }, lifetime);
}

// 更新粒子位置
function updateParticles() {
  const now = Date.now();
  particles.forEach((particle) => {
    const age = now - particle.birth;
    const progress = age / particle.lifetime;

    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.1; // 重力效果

    particle.element.style.left = particle.x + "px";
    particle.element.style.top = particle.y + "px";
    particle.element.style.opacity = 1 - progress;
  });

  requestAnimationFrame(updateParticles);
}

updateParticles();

// 爱心效果
const heartsContainer = document.getElementById("hearts");

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = Math.random() * 2 + 2 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 3000);
}

// 主逻辑
const mainContent = document.getElementById("mainContent");
const acceptedMessage = document.getElementById("acceptedMessage");
const rejectedMessage = document.getElementById("rejectedMessage");
const btnAccept = document.getElementById("btnAccept");
const btnReject = document.getElementById("btnReject");
const btnBackFromAccept = document.getElementById("btnBackFromAccept");
const btnBackFromReject = document.getElementById("btnBackFromReject");
const boi = document.querySelector(".boi");

const current = {
  happiness: 0.9,
  derp: 1,
  px: 0.5,
  py: 0.5,
};
const target = { ...current };
let rejectCount = 0;

// 鼠标移动效果
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const btnAcceptRect = btnAccept.getBoundingClientRect();
  const btnRejectRect = btnReject.getBoundingClientRect();

  const dx1 = x - btnRejectRect.left - btnRejectRect.width / 2;
  const dy1 = y - btnRejectRect.top - btnRejectRect.height / 2;
  const dx2 = x - btnAcceptRect.left - btnAcceptRect.width / 2;
  const dy2 = y - btnAcceptRect.top - btnAcceptRect.height / 2;

  const px = x / window.innerWidth;
  const py = y / window.innerHeight;

  const distReject = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  const distAccept = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  const happiness = Math.pow(distReject / (distAccept + distReject), 0.75);

  target.happiness = happiness;
  target.derp = 0;
  target.px = px;
  target.py = py;
});

// 按钮事件
btnAccept.addEventListener("click", () => {
  mainContent.style.display = "none";
  acceptedMessage.style.display = "block";
  target.happiness = 1;

  // 创建爱心效果
  const rect = boi.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createHeart(
        centerX + (Math.random() - 0.5) * 50,
        centerY + (Math.random() - 0.5) * 50
      );
    }, i * 100);
  }
});

btnReject.addEventListener("click", () => {
  rejectCount++;

  if (rejectCount >= 5) {
    btnReject.style.position = "fixed";
    btnReject.style.left = `${Math.random() * 80}%`;
    btnReject.style.top = `${Math.random() * 80}%`;
  }

  target.happiness = Math.max(0.1, target.happiness - 0.1);
  btnAccept.style.transform = `scale(${1 + rejectCount * 0.1})`;

  if (rejectCount > 10) {
    mainContent.style.display = "none";
    rejectedMessage.style.display = "block";
  }
});

btnBackFromAccept.addEventListener("click", () => {
  acceptedMessage.style.display = "none";
  mainContent.style.display = "flex";
  resetBoi();
});

btnBackFromReject.addEventListener("click", () => {
  rejectedMessage.style.display = "none";
  mainContent.style.display = "flex";
  resetBoi();
});

function resetBoi() {
  target.happiness = 0.9;
  target.derp = 1;
  target.px = 0.5;
  target.py = 0.5;
  rejectCount = 0;
  btnAccept.style.transform = "scale(1)";
  btnReject.style.position = "static";
}

// 更新表情
function updateBoi() {
  for (let prop in target) {
    if (target[prop] === current[prop]) {
      continue;
    } else if (Math.abs(target[prop] - current[prop]) < 0.01) {
      current[prop] = target[prop];
    } else {
      current[prop] += (target[prop] - current[prop]) * 0.1;
    }
    boi.style.setProperty(`--${prop}`, current[prop]);
  }
  requestAnimationFrame(updateBoi);
}

updateBoi();
// 音乐控制
const audio = document.getElementById("bg-music");
audio.volume = 0.5;
let isMuted = false;

// 尝试自动播放，处理浏览器限制
function initAudio() {
  audio
    .play()
    .then(() => {
      console.log("音乐播放成功");
    })
    .catch((e) => {
      console.log("自动播放失败:", e);
      document.addEventListener(
        "click",
        function startAudio() {
          audio.play();
          document.removeEventListener("click", startAudio);
        },
        { once: true }
      );
    });
}
initAudio();
