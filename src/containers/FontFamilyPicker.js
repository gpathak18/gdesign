import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
const styles = theme => ({
  root: {
    display: "flex"
  },
  popper: {
    marginRight: theme.spacing.unit * 2,
    zIndex: 1
  }
});

class FontFamilyPicker extends React.Component {
  state = {
    open: false
  };

  selectFont = 'Arial'
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
    this.selectFont = event.target.innerText
    this.props.formatTextCallback('font',  this.selectFont);
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      //   <div className={classes.root}>
      <React.Fragment>
          <Button
            variant="text"
            buttonRef={node => {
              this.anchorEl = node;
            }}
            style={{ color: "gray", widht: '200px'}}
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            {this.selectFont}
            <Icon style={{ paddingLeft: "5px" }}>arrow_drop_down</Icon>
          </Button>
          <Popper
            className={classes.popper}
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}>Arial</MenuItem>
                      <MenuItem onClick={this.handleClose}>Arial Black</MenuItem>
                      <MenuItem onClick={this.handleClose}>Helvetica</MenuItem>
                      <MenuItem onClick={this.handleClose}>Times New Roman</MenuItem>
                      <MenuItem onClick={this.handleClose}>Times</MenuItem>
                      <MenuItem onClick={this.handleClose}>Courier</MenuItem>
                      <MenuItem onClick={this.handleClose}>Courier New</MenuItem>
                      <MenuItem onClick={this.handleClose}>Verdana</MenuItem>
                      <MenuItem onClick={this.handleClose}>Tahoma</MenuItem>
                      <MenuItem onClick={this.handleClose}>Impact</MenuItem>
                      <MenuItem onClick={this.handleClose}>Georgia</MenuItem>
                      <MenuItem onClick={this.handleClose}>Mirza</MenuItem>
                      <MenuItem onClick={this.handleClose}>Andale Mono</MenuItem>
                      <MenuItem onClick={this.handleClose}>Monospace</MenuItem>
                      <MenuItem onClick={this.handleClose}>Roboto</MenuItem>
                      <MenuItem onClick={this.handleClose}>Palatino</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
      </React.Fragment>
    );
  }
}

FontFamilyPicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FontFamilyPicker);
