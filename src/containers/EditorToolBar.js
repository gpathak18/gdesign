import Icon from "@material-ui/core/Icon";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ReactQuill, { Quill } from "react-quill";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

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
    const node = this.myRef.current;
    console.log('ref',node)
    node.format('bold', true);
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