'use strict';

var define = require('define-property');
var isObject = require('isobject');

class Node {
  constructor(val, type) {
    this.define('isNode', true);
    if (isObject(val)) {
      for (var key in val) {
        this[key] = val[key];
      }
    } else {
      this.type = type;
      this.val = val;
    }
  }

  define(name, val) {
    define(this, name, val);
    return this;
  }

  addNode(node) {
    this.nodes = this.nodes || [];
    node.define('index', this.nodes.length);
    node.define('parent', this);
    node.define('siblings', this.nodes);
    this.nodes.push(node);
  }

  prev(n) {
    return this.siblings[this.index - (n || 1)] || this.parent.prev(n);
  }

  next(n) {
    return this.siblings[this.index + (n || 1)] || this.parent.next(n);
  }
};

/**
 * Expose `Node`
 */

module.exports = Node;
