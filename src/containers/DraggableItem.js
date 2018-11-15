import React, { Component } from "react";
import ItemTypes from "./ItemTypes";
import { DragSource } from "react-dnd";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
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
      type,
      showCopyIcon
    } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const dropEffect = showCopyIcon ? "copy" : "move";
    
    return connectDragSource(
      <div>
        <ListItem type={type} style={{ opacity, cursor: "move" }}>
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
export default DragSource((props) => props.type, itemSource, collect)(DraggableItem);
