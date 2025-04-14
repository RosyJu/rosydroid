const copy = async (text) => {
  if (navigator.clipboard) {
    await navigator.clipboard
      .readText()
      .then((clipText) => {
        if (text == clipText) {
          popups.prompt.warn("取消此次复制动作 : 剪贴板已经存在相同内容");
          return;
        } else {
          navigator.clipboard
            .writeText(text)
            .then(() => {
              popups.prompt.log(`文本已成功写入剪贴板 : ${text}`);
              return;
            })
            .catch((err) => {
              popups.prompt.error(`无法写入剪贴板 : ${err}`);
              return;
            });
        }
      })
      .catch((err) => {
        popups.prompt.error(`无法写入剪贴板 : 读取剪贴板失败`);
        return;
      });
  } else {
    popups.prompt.error("无法写入剪贴板 : clipboard API可能无法使用");
    return
  }
};
