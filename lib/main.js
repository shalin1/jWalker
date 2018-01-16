const $w = (selector) => {
  return ([...document.querySelectorAll(selector)]);
};

window.$w = $w;
