import * as React from "react";
import { DragLayer, XYCoord } from "react-dnd";
import ItemTypes from "./ItemTypes";
import DragPreview from "./DragPreview";
const layerStyles = {
  position: "absolute",
  pointerEvents: "none",
  zIndex: 4000,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none"
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform
  };
}

const CustomDragLayer = props => {
  const { item, itemType, isDragging } = props;

  function renderItem() {
    switch (itemType) {
      case ItemTypes.Text:
        return <DragPreview type={ItemTypes.Text} />;
      case ItemTypes.Image:
        return <DragPreview type={ItemTypes.Image} />;
      case ItemTypes.Button:
        return <DragPreview type={ItemTypes.Button} />;
      case ItemTypes.Video:
        return <DragPreview type={ItemTypes.Video} />;
      case ItemTypes.ImageGroup:
        return <DragPreview type={ItemTypes.ImageGroup} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  );
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);
