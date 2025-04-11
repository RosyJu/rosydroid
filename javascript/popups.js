const popups = {
  prompt: {
    animation: (dom) => {
      dom.classList.remove("animation");
      dom.offsetHeight;
      dom.classList.add("animation");
      dom.addEventListener(
        "animationend",
        (event) => {
          dom.classList.remove("animation");
        },
        { once: true }
      );
    },
    log: (text) => {
      let dom = document.querySelectorAll("div.popups.prompt.log")[0];
      dom.querySelectorAll("div.content")[0].textContent = text
      if (dom) {
        popups.prompt.animation(dom)
      }
    },
    warn: (text) => {
      let dom = document.querySelectorAll("div.popups.prompt.warn")[0];
      dom.querySelectorAll("div.content")[0].textContent = text
      if (dom) {
        popups.prompt.animation(dom)
      }
    },
    error: (text) => {
      let dom = document.querySelectorAll("div.popups.prompt.error")[0];
      dom.querySelectorAll("div.content")[0].textContent = text
      if (dom) {
        popups.prompt.animation(dom)
      }
    },
  },
};
