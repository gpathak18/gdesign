import Quill from "quill";
const Parchment = Quill.import("parchment");

class FontSizeStyleAttributor extends Parchment.Attributor.Style {

  add(node, value) {
    console.log('sizing',value)
    // if (!this.canAdd(node, value)) return false;
    // @ts-ignore
    node.style[this.keyName] = value;
    return true;
  }


}

let SizeAttributor = new FontSizeStyleAttributor("size", "font-size", {
  scope: Parchment.Scope.INLINE,
  whitelist: [
    4, 6, 8, 10, 12, 14, 16, 20, 24, 30, 36, 48, 60, 72
  ]
});

export { SizeAttributor };
