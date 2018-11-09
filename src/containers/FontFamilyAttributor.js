import Quill from "quill";
const Parchment = Quill.import("parchment");

class FontStyleAttributor extends Parchment.Attributor.Style {
  value(node) {
    return super.value(node).replace(/["']/g, "");
  }
}

let FontAttr = new FontStyleAttributor("font", "font-family", {
  scope: Parchment.Scope.INLINE,
  whitelist: [
    "Segoe UI",
    "Cantarell",
    "Droid Sans",
    "Fira Sans",
    "Roboto",
    "Oxygen",
    "Helvetica",
    "Ubuntu"
  ]
});

export { FontAttr };
