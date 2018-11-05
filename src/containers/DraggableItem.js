import React, { Component } from "react";
import ItemTypes from "./ItemTypes";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextFieldIcon from "@material-ui/icons/TextFields";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import { getEmptyImage } from "react-dnd-html5-backend";
import Icon from '@material-ui/core/Icon';

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
    return { name: props.name };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      // alert(`You dropped ${item.name} into ${dropResult.name}!`);
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
  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      });
    }
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      name,
      iconName,
      showCopyIcon
    } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const dropEffect = showCopyIcon ? "copy" : "move";

    return connectDragSource(
      <div>
        <ListItem style={{ opacity, cursor: "move" }}>
          <ListItemIcon>
            <Icon>{iconName}</Icon>
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
      </div>,
      { dropEffect }
    );
  }
}
export const MatStyle = withStyles(styles);
export default DragSource(ItemTypes.Text, itemSource, collect)(DraggableItem);
