import React, { Component } from "react";
import ItemTypes from "./ItemTypes";
import { DragSource } from "react-dnd";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { getEmptyImage } from "react-dnd-html5-backend";
import Icon from '@material-ui/core/Icon';
import store from "./store";
import { setDroppedItem, setSelectedNode } from "./actions";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const itemSource = {
  beginDrag(props) {
    return { parent: 'menu' };
  },
  endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();	
    console.log('dropped',item,dropResult,monitor.getItemType())
		if (dropResult) {

      switch (monitor.getItemType()) {
        case ItemTypes.Text:
          let textItem = {
            parent: dropResult.parent,
            item: {
              type: "Text",
              text: "Double click to edit.",
              style: {  border: "2px solid transparent" },
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
