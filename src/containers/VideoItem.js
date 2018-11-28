import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import store from "./store";
import { setSelectedNode } from "./actions";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 400
  },
  dense: {
    marginTop: 0
  }
});
class VideoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "", showVideo: false };
  }

  showComponent() {
    const { classes } = this.props;

    if (this.state.showVideo) {
      return (
        <div>
          <iframe
            width="480"
            height="320"
            src={this.state.url}
          />
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="standard-dense"
            label="Video URL"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
          
            // defaultValue="2"
            value={'https://www.youtube.com/embed/tgbNymZ7vqY'}
            onChange={e => this.handleChange(e.target.value)}
          />
          <label htmlFor="image-file">
            <Button
              variant="outlined"
              component="span"
              className={classes.button}
              onClick={e => this.handeSave()}
            >
              Save
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

  handleChange = url => {
    console.log(url);
    this.setState({ url: url });
  };

  handeSave = () => {
      console.log('saving')
    this.setState(state => ({ url: state.url, showVideo: !state.showVideo }));
  }
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

VideoItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VideoItem);
