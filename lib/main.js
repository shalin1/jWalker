const DOMNodeCollection = require('./dom_node_collection');

const $$$ = (selector) => {

  let $selector;
  if (selector instanceof HTMLElement) {
    $selector = selector;
  } else if (typeof(selector) === 'string' || selector instanceof String) {
    $selector = [...document.querySelectorAll(selector)];
  }

  return new DOMNodeCollection($selector);
};

window.$$$ = $$$;
