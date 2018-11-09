import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import editorStyle from "./editor.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  fab: {
    position: "relative",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.state = { text: "Double click to edit" };
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
    const { classes } = this.props;
    return (
      <div>
        <ReactQuill
          ref={el => {
            this.reactQuillRef = el;
          }}
          theme=""
          style={{ background: "white", padding: "0px" }}
          onChange={this.handleChange}
          defaultValue={this.props.defaultText}
        />
        <ToggleButtonGroup style={{marginTop: '5px'}}>
          <ToggleButton onClick={this.handleOnBlur}>
            <Icon>save</Icon>
          </ToggleButton>
          <ToggleButton >
            <Icon>undo</Icon>
          </ToggleButton>
          <ToggleButton>
            <Icon>redo</Icon>
          </ToggleButton>
          <ToggleButton>
            <Icon>clear</Icon>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}

TextEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextEditor);
