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
  constructor(props) {
    super(props);
    this.state = { url: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(url) {
    console.log(url);
    this.setState({ url: url });
  }

  showComponent() {
    const { classes } = this.props;

    if (this.state.url.length > 0) {
      return (
        <div>
          <img src={img} />
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            accept="image/*"
            className={classes.input}
            id="image-file"
            multiple
            type="file"
            onChange={e => this.handleChange(e.target.value)}
          />
          <label htmlFor="image-file">
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
            >
              Browse
            </Button>
          </label>
        </div>
      );
    }
  }

  handleClick = event => {
    event.stopPropagation();
    store.dispatch(
      setSelectedNode({ selectedNode: parseInt(event.currentTarget.id) })
    );
  };

  render() {
    return (
      <div
        id={this.props.id}
        onClick={this.handleClick}
        style={this.props.state[this.props.id].style}
      >
        {this.showComponent()}
      </div>
    );
  }
}

ImageItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageItem);
