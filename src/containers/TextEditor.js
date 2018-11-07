import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import IndentAttributor from "./IndentAttributor";

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
  constructor(props) {
    super(props);
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.state = { text: 'Double click to edit' }; 
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.getEditor();
    window.quillRef = this.quillRef;
  };

  handleChange(value) {
    this.setState({ text: value });
    console.log(this.state.text);
  }

  handleOnBlur() {
    this.setState({ text: this.state.text });
    this.props.editorOnBlur(this.state.text);
  }

  render() {

    
    return (
      <ReactQuill
        ref={el => {
          this.reactQuillRef = el;
        }}
        theme=''
        style={{background: 'white', padding: 0}}
        onChange={this.handleChange}
        onBlur={this.handleOnBlur}
        defaultValue = {this.props.defaultText}
      />
    );
  }
}

export default TextEditor;
