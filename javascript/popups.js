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
    log: async (text) => {
      let IDpopups = document.querySelectorAll("div#popups")[0];
      let dom = document.querySelectorAll("div.popups.prompt.log")[0];
      IDpopups.appendChild(dom);
      dom.querySelectorAll("div.content")[0].textContent = text
      if (dom) {
        popups.prompt.animation(dom)
      }
    },
    warn: async (text) => {
      let IDpopups = document.querySelectorAll("div#popups")[0];
      let dom = document.querySelectorAll("div.popups.prompt.warn")[0];
      IDpopups.appendChild(dom);
      dom.querySelectorAll("div.content")[0].textContent = text
      if (dom) {
        popups.prompt.animation(dom)
      }
    },
    error: async (text) => {
      let IDpopups = document.querySelectorAll("div#popups")[0];
      let dom = document.querySelectorAll("div.popups.prompt.error")[0];
      IDpopups.appendChild(dom);
      dom.querySelectorAll("div.content")[0].textContent = text
      if (dom) {
        popups.prompt.animation(dom)
      }
    },
  },
};
