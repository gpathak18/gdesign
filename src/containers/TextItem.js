import React, { Component } from "react";
import TextEditor from './TextEditor'
import store from "./store";
import { setDroppedItem,setSelectedNode } from "./actions";
class TextItem extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Double click to edit', isEdit: false }; // You can also pass a Quill Delta here
    // this.showEditor = this.showEditor.bind(this);      
  }

  showEditor = () => {
    let isedit = true;
    this.setState({ text: this.state.text, isEdit: isedit });
    this.editor();
    console.log(isedit);
  }

  handleClick = (event) => {
    store.dispatch(setSelectedNode({ selectedNode: event.target.id }));
  }

  editorCallback = (text) => {
    console.log(text)
    let isedit = false;
    this.setState({ text: text, isEdit: isedit });
    this.editor();
    console.log(isedit);
  };
  
  editor() {
    if (this.state.isEdit) {
      return <TextEditor onChange={this.handleChange} value={this.state.text}  editorOnBlur={this.editorCallback} defaultText={this.state.text}></TextEditor>;
    } else {
      return <div  id={this.props.id} onClick={this.handleClick} style={{ padding: '12px 15px' }} dangerouslySetInnerHTML={{ __html: this.state.text }} />;
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
