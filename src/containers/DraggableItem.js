import React, { Component } from "react";
import ItemTypes from "./ItemTypes";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const itemSource = {
  beginDrag(props) {
    console.log("drag started", props);
    return {};
  },
  endDrag(props) {
    console.log("drag ended");
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
  isDragging = false;

  render() {
    const style = {
      // border: '1px dashed gray',
      backgroundColor: "white",
      padding: "0.5rem 1rem",
      marginRight: "1.5rem",
      marginBottom: "1.5rem",
      cursor: "move",
      float: "left"
    };

    const { isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const { classes } = this.props;

    return connectDragSource(
      <div>
        <ListItem style={{ cursor: "move" }}>
          <Avatar>
            <TextFormatIcon />
          </Avatar>
          <ListItemText primary="Text" />
        </ListItem>
      </div>
    );
  }
}
export const MatStyle = withStyles(styles);
export default DragSource(ItemTypes.BOX, itemSource, collect)(DraggableItem);
