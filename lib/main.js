const DOMNodeCollection = require('./dom_node_collection');

const fetchDOMNodes = (selector) => {
  const nodesArray = [...document.querySelectorAll(selector)];
  return new DOMNodeCollection(nodesArray);
};

const $$$ = (selector) => {
  switch (typeof selector) {
    case 'string':
      fetchDOMNodes(selector);
    case 'object':
      if (selector instanceof HTMLElement) {
        return new DOMNodeCollection(selector);
      }
  }
};


window.$$$ = $$$;
