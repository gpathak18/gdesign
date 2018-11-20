import React from "react";
import {
  ChromePicker,
  TwitterPicker,
  BlockPicker,
  SketchPicker
} from "react-color";
import Icon from "@material-ui/core/Icon";
import ToggleButton from "@material-ui/lab/ToggleButton";

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color, event) => {
    this.props.formatTextCallback(this.props.type, color.hex);
  };

  render() {
    const popover = {
      position: "absolute",
      zIndex: "2000"
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };
    return (
      <React.Fragment>
        {/* <div style={{overflow: 'hidden'}}> */}
          <ToggleButton onClick={this.handleClick}>
            <Icon>{this.props.colorType}</Icon>
          </ToggleButton>
          {this.state.displayColorPicker ? (
            <div style={popover}>
              <div style={cover} onClick={this.handleClose} />
              <TwitterPicker onChange={this.handleChange} />
            </div>
          ) : null}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default ColorPicker;
