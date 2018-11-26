import Quill from "quill";
const Parchment = Quill.import("parchment");

class FontStyleAttributor extends Parchment.Attributor.Style {

  add(node, value) {
    // if (!this.canAdd(node, value)) return false;
    // @ts-ignore
    node.style[this.keyName] = value;
    return true;
  }


}

let FontAttributor = new FontStyleAttributor("font", "font-family", {
  scope: Parchment.Scope.INLINE,
  whitelist: [
    "sans-serif",
    "monospace",
    "serif",
    "Georgia",
    "palatino-linotype",
    "times-new-roman",
    "Arial",
    "Helvetica",
    "arial-black",
    "comic-sans-ms",
    "Charcoal",
    "Impact",
    "lucida-sans-unicode",
    "lucida-grande",
    "Tahoma",
    "Geneva",
    "trebuchet-ms",
    "Verdana",
    "courier-new",
    "lucida-console",
    "Mirza",
    "Roboto "
  ]
});

export { FontAttributor };
