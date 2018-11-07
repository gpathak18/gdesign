import React, { Component } from "react";
import TextEditor from './TextEditor'

class TextItem extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Double click to edit', isEdit: false }; // You can also pass a Quill Delta here
    this.showEditor = this.showEditor.bind(this);
    this.hideEditor = this.hideEditor.bind(this);
      
  }

  showEditor() {
    let isedit = true;
    this.setState({ text: this.state.text, isEdit: isedit });
    this.editor();
    console.log(isedit);
  }

  hideEditor() {
    let isedit = false;
    this.setState({ text: this.state.text, isEdit: isedit });
    console.log(isedit);
  }

  
  editor() {
    if (this.state.isEdit) {
      return <TextEditor onChange={this.handleChange} value={this.state.text}></TextEditor>;
    } else {
      return <div dangerouslySetInnerHTML={{ __html: this.state.text }} />;
    }
  }

  render() {
    return (
      <div onDoubleClick={this.showEditor} >
       {this.editor()}
      </div>
    );
  }
}

export default TextItem;
