document.addEventListener(
  "scroll",
  () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollBottom =
      (document.documentElement.scrollHeight || document.body.scrollHeight) -
      document.documentElement.clientHeight;
    document.getElementById("progressbar").style.width = `${(scrollTop /
      scrollBottom) *
      100}%`;
  },
  { passive: true }
);
