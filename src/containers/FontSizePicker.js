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

class FontSizePicker extends React.Component {
  state = {
    open: false
  };

  size = '16'
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });

    this.size = event.target.innerText
    this.props.formatTextCallback('size', this.size);

  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      //   <div className={classes.root}>
      <React.Fragment>
        <Button
          buttonRef={node => {
            this.anchorEl = node;
          }}
          style={{ color: "gray" }}
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          {"size"}
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
                    <MenuItem onClick={this.handleClose}>12px</MenuItem>
                    <MenuItem onClick={this.handleClose}>14px</MenuItem>
                    <MenuItem onClick={this.handleClose}>16px</MenuItem>
                    <MenuItem onClick={this.handleClose}>18px</MenuItem>
                    <MenuItem onClick={this.handleClose}>20px</MenuItem>
                    <MenuItem onClick={this.handleClose}>24px</MenuItem>
                    <MenuItem onClick={this.handleClose}>30px</MenuItem>
                    <MenuItem onClick={this.handleClose}>36px</MenuItem>
                    <MenuItem onClick={this.handleClose}>48px</MenuItem> 
                    <MenuItem onClick={this.handleClose}>60px</MenuItem>
                    <MenuItem onClick={this.handleClose}>72px</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
      //   </div>
    );
  }
}

FontSizePicker.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FontSizePicker);
