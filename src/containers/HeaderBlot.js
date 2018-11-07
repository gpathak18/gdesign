import React from "react";
import { Quill } from "react-quill";

let Block = Quill.import('blots/block');

class HeaderBlot extends Block {
  static formats(node) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}

export default HeaderBlot;