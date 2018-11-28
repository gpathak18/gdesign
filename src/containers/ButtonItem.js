import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import img from "../images/sfm.png";
import store from "./store";
import { setDroppedItem, setSelectedNode } from "./actions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
class ButtonItem extends Component {
  handleChange = () => {
    console.log("clicked");
  };

  handleClick = event => {
    event.stopPropagation();
    store.dispatch(
      setSelectedNode({ selectedNode: parseInt(event.currentTarget.id) })
    );
  };

  render() {
    console.log(this.props.state[this.props.id].style)
    return (
      <button
        id={this.props.id}
        onClick={this.handleClick}
        style={this.props.state[this.props.id].style}
      >
        Text
      </button>
    );
  }
}

ButtonItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonItem);
