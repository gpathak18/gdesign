import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Editor from "./Editor";
import DraggableItem from "./DraggableItem";
import CenteredTabs from "./CenteredTabs";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import CustomDragLayer from "./CustomDragLayer";
import EditorToolBar from "./EditorToolBar";
import store from "./store";
import {setTitle} from './actions'
import { connect } from "react-redux";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: '#F0F1F4',
    color: 'black',
    boxShadow: '0 0 white'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#F0F1F4',
    color: 'DARKGRAY'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar
});

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.updateTitle = this.updateTitle.bind(this)
  }

  updateTitle() {
    store.dispatch(setTitle({name: 'Another'}));
  }
  
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <DragDropContextProvider backend={HTML5Backend}>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" noWrap onDoubleClick={this.updateTitle}>
                  {this.props.state.name}
                </Typography>
              </Toolbar>
              <Divider />
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              {/* <CenteredTabs /> */}
              <EditorToolBar/>
              {/* <Divider /> */}
              {/* <div className={classes.appBarSpacer} /> */}
              {/* <div> */}
              <Editor state={this.props.state}/>
                {/* <AppAction /> */}
              {/* </div> */}
            </main>
          </div>
          <CustomDragLayer />
        </DragDropContextProvider>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
