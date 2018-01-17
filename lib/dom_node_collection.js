class DOMNodeCollection {

// class expects nodes to *always* be an array
  constructor(nodes) {
    this.nodes = nodes;
  }

// helper methods for iteration and type checking
  each(callback) {
    this.nodes.forEach(callback);
  }

  isString(el) {
    return typeof el === 'string' || el instanceof String;
  }

// replaces all children of collection with an empty string
  empty() {
    this.each(node => {
      node.innerHTML = "";
    });
  }

  html(el) {
    // sets HTML contents for each child of matched elements to argument value
    if ( this.isString(el) ) {
      this.each(node => {
        node.innerHTML = el;
      });
    }
    // gets HTML contents of first element in set of matched elements
    else if (this.el.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

// adds content to all members of collection
  append(content) {
    if (this.nodes.length === 0) {
      return;
    } else if (this.isString(content)) {
      this.each(node => {
        node.innerHTML += content;
      });
    } else if (content instanceof DOMNodeCollection) {
      this.each(node => {
        content.each((el) => {
          node.appendChild(el.cloneNode(true));
        });
      });
    }
  }

  attr(key, value) {
    // sets attribute at selected key for the set of matched elements to selected value
    if (this.isString(value)) {
      this.each(node => node.setAttribute(key, value));
      // gets attribute for selected key from first element in collection
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

// add and remove classes from all nodes in collection
  addClass(newClass) {
    this.each(node => (
      node.classList.add(newClass)
    ));
  }

  removeClass(oldClass) {
    this.each(node => (
      node.classList.remove(oldClass)
    ));
  }

  children() {
    const childNodes = [];
    this.each(node => (
      childNodes.concat([...node.children])
    ));
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];
    this.each(node => {
      // this nonsense will be refactored with $$$.uniqueID method and checking for membership in parentNodes array
      if (!node.visited) {
        parentNodes.push(node);
        node.visited = true;
      }
    });
    parentNodes.each( node => {
      node.visited = false;
    });
    return new DOMNodeCollection(parentNodes);
  }

  on(eventType, callback) {
    this.each(node => {
      node.addEventListener(eventType, callback);
      const eventID = `jw-events-${eventType}`;
      if (typeof node[eventID] === 'undefined') {
        node[eventID] = [];
      }
      node[eventID].push(callback);
    });
  }

  off(eventType) {
    this.each(node => {
      const eventID = `jw-events-${eventType}`;
      if (node[eventID]) {
        node[eventID].forEach( callback => {
          node.removeEventListener(eventType, callback);
        });
      }
      node[eventID] = [];
    });
  }

}

module.exports = DOMNodeCollection;
