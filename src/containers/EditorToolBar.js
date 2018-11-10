import Icon from "@material-ui/core/Icon";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Quill } from "react-quill";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import HeaderBlot from "./HeaderBlot";
import LinkBlot from "./LinkBlot";
import ImageBlot from "./ImageBlot";
import ColorPicker from "./ColorPicker";
import { IndentStyle } from "./IndentAttributor";
import { FontAttr } from "./FontFamilyAttributor";
import img from "../images/sfm.png";
import FontFamilyPicker from "./FontFamilyPicker";
import FontSizePicker from "./FontSizePicker";


// let FontStyle = Quill.import('attributors/style/font');
// FontStyle.whitelist =[false, 'Arial, Helvetica, sans-serif', 'Georgia, serif', 'Impact, Charcoal, sans-serif', 'Tahoma, Geneva, sans-serif', 'Times New Roman, Times, serif, -webkit-standard', 'Verdana, Geneva, sans-serif'];
// Quill.register(FontStyle, true);

let Inline = Quill.import("blots/inline");
let Block = Quill.import("blots/block");
let BlockEmbed = Quill.import("blots/block/embed");

class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

class BlockquoteBlot extends Block {}
BlockquoteBlot.blotName = "blockquote";
BlockquoteBlot.tagName = "blockquote";

class BoldBlot extends Inline {}
BoldBlot.blotName = "bold";
BoldBlot.tagName = "strong";

class ItalicBlot extends Inline {}
ItalicBlot.blotName = "italic";
ItalicBlot.tagName = "em";

LinkBlot.blotName = "link";
LinkBlot.tagName = "a";

HeaderBlot.blotName = "header";
HeaderBlot.tagName = ["H1", "H2"];

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";

// var Font = Quill.import("attributors/class/font");
// We do not add Aref Ruqaa since it is the default
// Font.whitelist = ["Oxygen", "Roboto"];

Quill.register(BoldBlot);
Quill.register(ItalicBlot);
Quill.register(LinkBlot);
Quill.register(BlockquoteBlot);
Quill.register(HeaderBlot);
Quill.register(DividerBlot);
Quill.register(ImageBlot);

// const BackgroundStyle = Quill.import("attributors/style/background");
const ColorStyle = Quill.import("attributors/style/color");
const AlignStyle = Quill.import("attributors/style/align");
const SizeStyle = Quill.import("attributors/style/size");
// const FontStyle = Quill.import("attributors/style/font");
// const BoldStyle = Quill.import('attributors/style/bold');
// const ItalicStyle = Quill.import('attributors/style/italic');
// const StrikethroughStyle = Quill.import('attributors/style/strike');
// const ScriptStyle = Quill.import('attributors/style/script');
// const UnderlineStyle = Quill.import('attributors/style/underline');
// const LinkStyle = Quill.import('attributors/style/link');
// const CodeStyle = Quill.import('attributors/style/code');

// Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(SizeStyle, true);
Quill.register(FontAttr, true);
Quill.register(IndentStyle, true);
Quill.register(AlignStyle, true);
// Quill.register(FontAttributor);
// Quill.register(BoldStyle);
// Quill.register(ItalicStyle, true);
// Quill.register(StrikethroughStyle, true);
// Quill.register(ScriptStyle, true);
// Quill.register(ItalicStyle, true);
// Quill.register(UnderlineStyle, true);
// Quill.register(LinkStyle);
// Quill.register(CodeStyle, true);

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
  indentCounter = 0;

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.formatText = this.formatText.bind(this);
    this.formatLink = this.formatLink.bind(this);
    this.insertDivider = this.insertDivider.bind(this);
    this.insertImage = this.insertImage.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true, url: "" });
  };

  handleClose = value => {
    console.log("value", value);
    if (value) {
      this.setState({ open: false, url: value });
      this.formatLink();
    }
  };

  formatLink() {
    if (window.quillRef) {
      let value = this.state.url;
      console.log("value", value);
      window.quillRef.format("link", value);
    }
  }

  formatText(value, option = true) {
    console.log(value, option);
    if (window.quillRef) {
      console.log(value, option);
      window.quillRef.format(value, option);
    }
  }

  insertDivider() {
    if (window.quillRef) {
      let range = window.quillRef.getSelection(true);
      console.log(range);
      window.quillRef.insertText(range.index, "\n", Quill.sources.USER);
      window.quillRef.insertEmbed(
        range.index + 1,
        "divider",
        true,
        Quill.sources.USER
      );
      window.quillRef.setSelection(range.index + 2, Quill.sources.SILENT);
    }
  }

  insertImage() {
    let range = window.quillRef.getSelection(true);
    window.quillRef.insertText(range.index, "\n", Quill.sources.USER);
    window.quillRef.insertEmbed(
      range.index + 1,
      "image",
      {
        alt: "Image",
        url: img
      },
      Quill.sources.USER
    );
    window.quillRef.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  render() {
    
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup id="toolbar">
            <ToggleButton onClick={() => this.formatText("bold")} disabled={true}>
              <Icon>format_bold</Icon>
            </ToggleButton>
            <ToggleButton onClick={() => this.formatText("italic")}  disabled={false}> 
              <Icon>format_italic</Icon>
            </ToggleButton>
            <ToggleButton onClick={() => this.formatText("underline")}>
              <Icon>format_underlined</Icon>
            </ToggleButton>
            <ToggleButton
              onClick={() => this.formatText("indent", --this.indentCounter)}
            >
              <Icon>format_indent_decrease</Icon>
            </ToggleButton>
            <ToggleButton
              onClick={() => this.formatText("indent", ++this.indentCounter)}
            >
              <Icon>format_indent_increase</Icon>
            </ToggleButton>
            <ToggleButton onClick={() => this.formatText("header", 1)}>
              <Icon>looks_one</Icon>
            </ToggleButton>
            <ToggleButton onClick={() => this.formatText("header", 2)}>
              <Icon>looks_two</Icon>
            </ToggleButton>
            <ToggleButton onClick={() => this.formatText("blockquote")}>
              <Icon>format_quote</Icon>
            </ToggleButton>
            <ToggleButton onClick={this.handleClickOpen}>
              <Icon>link</Icon>
            </ToggleButton>

            <ToggleButton onClick={this.insertImage}>
              <Icon>photo_camera</Icon>
            </ToggleButton>
            <ToggleButton onClick={this.insertDivider}>
              <Icon>minimize</Icon>
            </ToggleButton>
            <div>
              <ColorPicker
                colorType="format_color_text"
                formatTextCallback={this.formatText}
                type="color"
              />
              <ColorPicker
                colorType="format_color_fill"
                formatTextCallback={this.formatText}
                type="background"
              />
              <ToggleButton onClick={() => this.formatText("align", "")}>
                <Icon>format_align_left</Icon>
              </ToggleButton>
              <ToggleButton onClick={() => this.formatText("align", "center")}>
                <Icon>format_align_center</Icon>
              </ToggleButton>
              <ToggleButton onClick={() => this.formatText("align", "right")}>
                <Icon>format_align_right</Icon>
              </ToggleButton>
              <ToggleButton onClick={() => this.formatText("align", "justify")}>
                <Icon>format_align_justify</Icon>
              </ToggleButton>
              <FontFamilyPicker formatTextCallback={this.formatText} />
              <FontSizePicker formatTextCallback={this.formatText} />
            </div>
          </ToggleButtonGroup>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter link URL</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="Link URL"
              fullWidth
              onKeyUp={this.handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EditorToolBar);
