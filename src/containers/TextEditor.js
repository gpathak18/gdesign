import React, { Component } from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import CustomDragLayer from "./CustomDragLayer";
import Row from "./Row";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "./store";
import HeaderEditor from "./HeaderEditor";
import { adjustHeight } from "./actions";
import ReactQuill, { Quill } from "react-quill";
import { Columns, Cell, Splitter } from "react-resizable-grid";
import IndentAttributor from "./IndentAttributor";
import DraggableItem from "./DraggableItem";
import FooterEditor from "./FooterEditor";
import BodyEditor from "./BodyEditor";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import EditorToolBar from './EditorToolBar'
var Parchment = Quill.import("parchment");
const levels = [1, 2, 3, 4, 5];
const multiplier = 2;

const IndentStyle = new IndentAttributor("indent", "margin-left", {
  scope: Parchment.Scope.BLOCK,
  whitelist: levels.map(value => `${value * multiplier}em`)
});

const BackgroundStyle = Quill.import("attributors/style/background");
const ColorStyle = Quill.import("attributors/style/color");
const SizeStyle = Quill.import("attributors/style/size");
const FontStyle = Quill.import("attributors/style/font");
// const BoldStyle = Quill.import('attributors/style/bold');
// const ItalicStyle = Quill.import('attributors/style/italic');
// const StrikethroughStyle = Quill.import('attributors/style/strike');
// const ScriptStyle = Quill.import('attributors/style/script');
// const UnderlineStyle = Quill.import('attributors/style/underline');
// const LinkStyle = Quill.import('attributors/style/link');
// const CodeStyle = Quill.import('attributors/style/code');

Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(SizeStyle, true);
Quill.register(FontStyle, true);
Quill.register(IndentStyle);

// Quill.register(BoldStyle, true);
// Quill.register(ItalicStyle, true);
// Quill.register(StrikethroughStyle, true);
// Quill.register(ScriptStyle, true);
// Quill.register(ItalicStyle, true);
// Quill.register(UnderlineStyle, true);
// Quill.register(LinkStyle, true);
// Quill.register(CodeStyle, true);



class TextEditor extends Component {
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "font"
  ];

  constructor(props) {
    super(props);
    this.state = { text: "", isEdit: false }; // You can also pass a Quill Delta here
    this.showEditor = this.showEditor.bind(this);
    this.hideEditor = this.hideEditor.bind(this);
  }

  handleEdit() {
    let isedit = !this.state.isEdit;
    this.setState({ text: this.state.text, isEdit: isedit });
    console.log(isedit);
  }

  showEditor() {
    let isedit = true;
    this.setState({ text: this.state.text, isEdit: isedit });
    console.log(isedit);
  }

  hideEditor() {
    let isedit = false;
    this.setState({ text: this.state.text, isEdit: isedit });
    console.log(isedit);
  }


  render() {
    return (
      <div className="text-editor">

          <ReactQuill
            value={this.state.text}
            onChange={this.handleChange}
            style={{ width: "100%", height: "75%" }}
            onBlur={() => console.log("focus lost")}
            // modules={this.modules}
            // formats={this.formats}
            // theme="snow"
            modules={TextEditor.modules}
          />
        </div>
      // <div
      //   style={{ width: "100%", height: "100%" }}
      //   onMouseOver={this.showEditor}
      //   onMouseLeave={this.hideEditor}
      // >
      //   {this.check()}
      // </div>
    );
  }
}

TextEditor.modules = {
  toolbar: {
    container: "#toolbar",
    
    // handlers: {
    //   "insertStar": insertStar,
    // }
  }
}

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'color',
]


export default TextEditor;
