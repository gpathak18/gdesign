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
    open: false,
    font: "Roboto"
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false, font: event.target.innerText });
    this.props.formatTextCallback('font', this.state.font);
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
            {this.state.font}
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
                      <MenuItem onClick={this.handleClose}>sans-serif</MenuItem>
                      <MenuItem onClick={this.handleClose}>Cantarell</MenuItem>
                      <MenuItem onClick={this.handleClose}>Droid Sans</MenuItem>
                      <MenuItem onClick={this.handleClose}>Fira Sans</MenuItem>
                      <MenuItem onClick={this.handleClose}>roboto</MenuItem>
                      <MenuItem onClick={this.handleClose}>Oxygen</MenuItem>
                      <MenuItem onClick={this.handleClose}>helvetica</MenuItem>
                      <MenuItem onClick={this.handleClose}>arial</MenuItem>
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
