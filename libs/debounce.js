let timeout = null;

function debounce(func, timer = 500) {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    func();
  }, timer);
}
