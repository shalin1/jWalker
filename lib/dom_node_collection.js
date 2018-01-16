class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(string) {
    if (string === undefined) {
      return this.nodes[0].innerHTML;
    } else {
      this.nodes.forEach( (node) => {
        node.innerHTML = string;
      });
    }
  }

  empty() {
    this.nodes.forEach( (node) => {
      node.innerHTML = "";
    });
  }

}

module.exports = DOMNodeCollection;
