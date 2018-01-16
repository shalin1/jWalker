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
    this.each( (node) => {
      node.innerHTML = "";
    });
  }

// sets inner HTML for each child of collection to argument value
  html(el) {
    if ( this.isString(el) ) {
      this.each( (node) => {
        node.innerHTML = el;
      });
    }
    else if (this.el.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

// adds content to all children of collection
  append(content) {
    if (this.nodes.length === 0) {
      return;

    } else if (this.isString(content)) {
      this.each( (node) => {
        node.innerHTML += content;
      });

    } else if (content instanceof DomNodeCollection) {
      this.each( (node) => {
        content.each((el) => {
          node.appendChild(el.cloneNode(true));
        });
      });
    }
  }

}

module.exports = DOMNodeCollection;
