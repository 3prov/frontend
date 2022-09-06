export const resize: resizeFn = (ref) => {
  const scrollLeft = window.pageXOffset || (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  const scrollTop  = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

  ref.current!.style.height = "auto";
  ref.current!.style.height = ref.current!.scrollHeight + 'px';

  window.scrollTo(scrollLeft, scrollTop);
}