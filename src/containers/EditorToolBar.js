import Icon from "@material-ui/core/Icon";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactQuill, { Quill } from "react-quill";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {editor} from './ToolMap'

let Inline = Quill.import("blots/inline");

class BoldBlot extends Inline {}
BoldBlot.blotName = "bold";
BoldBlot.tagName = "strong";

class ItalicBlot extends Inline {}
ItalicBlot.blotName = "italic";
ItalicBlot.tagName = "em";

Quill.register(BoldBlot);
Quill.register(ItalicBlot);

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default
  }
});

class EditorToolBar extends Component {

  constructor(props) {
    super(props)
    this.formatBold = this.formatBold.bind(this)
  }

  formatBold() {
    console.log('ref',window.quillRef)
    window.quillRef.format('bold', true);
  }

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.toggleContainer}>
        <ToggleButtonGroup exclusive id="toolbar">
          <ToggleButton value="left">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right">
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify" disabled>
            <FormatAlignJustifyIcon />
          </ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup exclusive id="toolbar">

          <ToggleButton value="left" onClick={this.formatBold}>
            <Icon>format_bold</Icon>
          </ToggleButton>
          <ToggleButton value="center">
            <Icon>format_italic</Icon>
          </ToggleButton>
          <ToggleButton value="right">
            <Icon>format_color_text</Icon>
          </ToggleButton>
        </ToggleButtonGroup>
        </div>
        
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EditorToolBar)