import React, { Component } from "react";
import ItemTypes from "./ItemTypes";
import { DragSource } from "react-dnd";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { getEmptyImage } from "react-dnd-html5-backend";
import Icon from "@material-ui/core/Icon";
import store from "./store";
import {
  setDroppedItem,
  setImageGroupItem,
  updateStyle,
  setStyle
} from "./actions";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import classNames from "classnames";
import flow from "lodash/flow";
import ColorPicker from "./ColorPicker";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 80
  },
  dense: {
    marginTop: 0
  },
  nested: {
    // paddingLeft: theme.spacing.unit * 9
  },
  nestedButton: {
    // paddingLeft: theme.spacing.unit * 9,
    flexWrap: "wrap"
  }
});

const itemSource = {
  beginDrag(props, monitor, component) {
    console.log("drag started", props, component);
    if (props.state && props.state.rows && props.state.cols) {
      return {
        parent: "menu",
        rows: props.state.rows || "",
        cols: props.state.cols || "",
        butWidth: props.state.butWidth || "",
        butHeight: props.state.butHeight || "",
        butRadius: props.state.butRadius || "",
        butBorder: props.state.butBorder || ""
      };
    } else if (
      props.state &&
      props.state.butWidth &&
      props.state.butHeight &&
      props.state.butRadius &&
      props.state.butBorder
    ) {
      return {
        parent: "menu",
        butWidth: props.state.butWidth || "",
        butHeight: props.state.butHeight || "",
        butRadius: props.state.butRadius || "",
        butBorder: props.state.butBorder || ""
      };
    } else {
      return {
        parent: "menu"
      };
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log("dropped", item, dropResult, monitor.getItemType());
    if (dropResult) {
      switch (monitor.getItemType()) {
        case ItemTypes.Text:
          let textItem = {
            parent: dropResult.parent,
            item: {
              type: "Text",
              text: "Double click to edit.",
              style: { border: "2px solid transparent" },
              child: []
            }
          };
          store.dispatch(setDroppedItem(textItem));
          break;
        case ItemTypes.Image:
          let imageItem = {
            parent: dropResult.parent,
            item: {
              type: "Image",
              url: "",
              style: {},
              child: []
            }
          };
          store.dispatch(setDroppedItem(imageItem));
          break;
        case ItemTypes.Button:
          console.log(item);
          let buttonItem = {
            parent: dropResult.parent,
            item: {
              type: "Button",
              url: "",
              style: {
                width: item.butWidth + "px",
                height: item.butHeight + "px",
                borderRadius: item.butRadius + "px",
                border: item.butBorder + "px",
                borderStyle: "solid"
              },
              child: []
            }
          };
          store.dispatch(setDroppedItem(buttonItem));
          break;

        case ItemTypes.Video:
          console.log(item);
          let videoItem = {
            parent: dropResult.parent,
            item: {
              type: "Video",
              url: "",
              style: {},
              child: []
            }
          };
          store.dispatch(setDroppedItem(videoItem));
          break;
        case ItemTypes.ImageGroup:
          let imageGroupItem = {
            parent: dropResult.parent,
            item: {
              type: "ImageGroup",
              rows: item.rows,
              columns: item.cols,
              style: {},
              child: []
            }
          };
          store.dispatch(setImageGroupItem(imageGroupItem));
          break;
        default:
          this.items = this.items;
      }
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class DraggableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openImgGrpImgGrp: false,
      rows: 1,
      cols: 2,
      openButton: false,
      butWidth: 100,
      butHeight: 30,
      butRadius: 2,
      butBorder: 2
    };
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      });
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ openImgGrp: !state.openImgGrp }));
  };

  handleChange = rowcol => event => {
    this.setState({
      [rowcol]: parseInt(event.target.value)
    });
    this.props.state[rowcol] = parseInt(event.target.value);
  };

  handleExpandButtonClick = () => {
    this.setState(state => ({ openButton: !state.openButton }));
  };

  handleChangeButStyle = butstyle => event => {
    this.setState({
      [butstyle]: parseInt(event.target.value)
    });
    this.props.state[butstyle] = parseInt(event.target.value);
    let buttonItem = {};

    buttonItem[butstyle] = parseInt(event.target.value) + "px";
    console.log("butstyle", buttonItem);
    store.dispatch(setStyle(buttonItem));
  };

  render() {
    const {
      classes,
      isDragging,
      connectDragSource,
      name,
      iconName,
      type,
      showCopyIcon
    } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const dropEffect = showCopyIcon ? "copy" : "move";

    let element = "";
    if (type === ItemTypes.ImageGroup) {
      element = (
        <React.Fragment>
          <ListItem
            button
            type={type}
            style={{ opacity }}
            onClick={this.handleExpandClick}
          >
            <ListItemIcon>
              <Icon>{iconName}</Icon>
            </ListItemIcon>
            <ListItemText primary={name} />
            {this.state.openImgGrp ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openImgGrp} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <TextField
                  id="standard-dense"
                  label="Rows"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  type="number"
                  value={this.state.rows}
                  onChange={this.handleChange("rows")}
                />
                <TextField
                  id="standard-dense"
                  label="Columns"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  type="number"
                  // defaultValue="2"
                  value={this.state.cols}
                  onChange={this.handleChange("cols")}
                />
              </ListItem>
            </List>
          </Collapse>
        </React.Fragment>
      );
    } else if (type === ItemTypes.Button) {
      element = (
        <React.Fragment>
          <ListItem
            button
            type={type}
            style={{ opacity }}
            onClick={this.handleExpandButtonClick}
          >
            <ListItemIcon>
              <Icon>{iconName}</Icon>
            </ListItemIcon>
            <ListItemText primary={name} />
            {this.state.openButton ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openButton} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nestedButton}>
                <TextField
                  id="standard-dense"
                  label="Width"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  type="number"
                  value={this.state.butWidth}
                  onChange={this.handleChangeButStyle("butWidth")}
                />
                <TextField
                  id="standard-dense"
                  label="Height"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  type="number"
                  // defaultValue="2"
                  value={this.state.butHeight}
                  onChange={this.handleChangeButStyle("butHeight")}
                />
                <TextField
                  id="standard-dense"
                  label="Radius"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  type="number"
                  // defaultValue="2"
                  value={this.state.butRadius}
                  onChange={this.handleChangeButStyle("butHeight")}
                />
                <TextField
                  id="standard-dense"
                  label="Border"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  type="number"
                  // defaultValue="2"
                  value={this.state.butBorder}
                  onChange={this.handleChangeButStyle("butHeight")}
                />
              </ListItem>
            </List>
          </Collapse>
        </React.Fragment>
      );
    } else {
      element = (
        <ListItem type={type} style={{ opacity }}>
          <ListItemIcon>
            <Icon>{iconName}</Icon>
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      );
    }

    return connectDragSource(<div>{element}</div>, { dropEffect });
  }
}

DraggableItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default flow(
  withStyles(styles),
  DragSource(props => props.type, itemSource, collect)
)(DraggableItem);
