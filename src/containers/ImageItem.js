import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import img from '../images/001050.jpg'
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
class ImageItem extends Component {
  constructor(props) {
    super(props);
    this.state = { url: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(url) {
    console.log(url);
    this.setState({ url: url});
  }

  showImage() {

  }
  
  showComponent() {
    const { classes } = this.props;
  
    if (this.state.url.length > 0) {
      return (
        <div >
          <img src={img}/>
        </div>
      );
    } else {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <input
            accept="image/*"
            className={classes.input}
            id="image-file"
            multiple
            type="file"
            onChange={ (e) => this.handleChange(e.target.value) }
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

  render() {
    return <div>{this.showComponent()}</div>;
  }
}

ImageItem.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(ImageItem);
