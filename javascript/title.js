let title = [
  1,
  "你记得花,花就不会枯萎.",
  "双手合十的愿望是......",
  "你是特别的存在.",
  "小狗日记",
  "我与春风皆过客,你携秋水揽星河.",
  "匆匆一年又是秋.",
  "你是一树一树花开,是燕在粱间呢喃,--你是爱,是暖,是希望,你是人间的四月天.",
  "就借着月光,再与你对望.",
  "什么是心安,你就是答案.",
];
title[0] = Math.floor(Math.random() * (title.length - 1) + 1);
document.querySelectorAll(
  "body > div.body > div.head > div.title"
)[0].textContent = title[title[0]];
