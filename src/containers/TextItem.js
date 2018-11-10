import React, { Component } from "react";
import TextEditor from "./TextEditor";
import store from "./store";
import { setDroppedItem, setSelectedNode } from "./actions";
class TextItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Double click to edit",
      isEdit: false,
      style: { padding: "12px 15px", border: "1px solid transparent" }
    }; // You can also pass a Quill Delta here
    // this.showEditor = this.showEditor.bind(this);
  }

  showEditor = () => {
    let isedit = true;
    this.setState({ text: this.state.text, isEdit: isedit });
    this.editor();
    console.log(isedit);
  };

  handleMouseEnter = event => {
    // store.dispatch(setSelectedNode({ selectedNode: event.target.id }));
    let newState = {
      ...this.state,
      style: {
        padding: "12px 15px",
        border: "1px solid black"
      }
    };
    this.setState(newState);
  };

  handleMouseLeave = event => {
    let newState = {
      ...this.state,
      style: {
        padding: "12px 15px",
        border: "1px solid transparent"
      }
    };
    this.setState(newState);
    // store.dispatch(setSelectedNode({ selectedNode: event.target.id }));
  };

  handleClick = event => {
    event.stopPropagation();
    store.dispatch(
      setSelectedNode({ selectedNode: parseInt(event.currentTarget.id) })
    );
  };

  editorCallback = text => {
    console.log(text);
    let isedit = false;
    this.setState({ text: text, isEdit: isedit });
    this.editor();
    console.log(isedit);
  };

  editor() {
    if (this.state.isEdit) {
      return (
        <TextEditor
          onChange={this.handleChange}
          value={this.state.text}
          editorOnBlur={this.editorCallback}
          defaultText={this.state.text}
        />
      );
    } else {
      return (
        <div
          id={this.props.id}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          style={this.props.state[this.props.id].style}
          dangerouslySetInnerHTML={{ __html: this.state.text }}
        />
      );
    }
  }

  render() {
    return (
      // style={{ padding: "1rem" }}
      <div onDoubleClick={this.showEditor}>
        {this.editor()}
      </div>
    );
  }
}

export default TextItem;
