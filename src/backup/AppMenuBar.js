import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class AppMenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleRow = this.handleRow.bind(this);
    this.handleColumn = this.handleColumn.bind(this);
  }

  handleRow() {
    this.props.addRowToEditor();
  }

  handleColumn() {
    this.props.addColumnToEditor();
  }

  render() {
    const style = {
      tools: {
        listStyle: "none"
      }
    };
    const { classes } = this.props;
    return (
      <div style={style.tools}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            
            <IconButton  className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer" 
              onClick={this.handleRow}>
              <HorizontalSplitIcon />
            </IconButton>

            <IconButton  className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer" 
              onClick={this.handleColumn}>
              <VerticalSplitIcon />
            </IconButton>

            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap>
              A
            </Typography>

            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(AppMenuBar);
