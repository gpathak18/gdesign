import React from "react";
import { Quill } from "react-quill";

let BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

  static get ATTRIBUTES() {
    return [ 'alt', 'height', 'width', 'class', 'data-original', 'data-width', 'data-height', 'style-data' ]
  }

  static create(value) {
    let node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    node.setAttribute('style', value.style);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src'),
      style: node.getAttribute('style')
    };
  }
}

export default ImageBlot;