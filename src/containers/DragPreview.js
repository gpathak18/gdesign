import * as React from "react";
import Text from "./TextEditor";
import DraggableItem from "./DraggableItem";
import TextFieldIcon from "@material-ui/icons/TextFields";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ItemTypes from "./ItemTypes";
import Icon from "@material-ui/core/Icon";

const styles = {
  display: "inline-block",
  // transform: "rotate(-7deg)",
  zIndex: "1000",
  borderRadius: "5px",
  border: "1px solid gray"
};

export default class DragPreview extends React.PureComponent {
  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { type } = this.props;
    // const { tickTock } = this.state;

    switch (type) {
      case ItemTypes.Text:
        return (
          <div style={styles}>
            <ListItem>
              <Icon>text_fields</Icon>
              <ListItemText primary="Text" />
            </ListItem>
          </div>
        );
      case ItemTypes.Image:
        return (
          <div style={styles}>
            <ListItem>
              <Icon>insert_photos</Icon>
              <ListItemText primary="Text" />
            </ListItem>
          </div>
        );
      case ItemTypes.Button:
        return (
          <div style={styles}>
            <ListItem>
              <Icon>crop_landscape</Icon>
              <ListItemText primary="Button" />
            </ListItem>
          </div>
        );
      case ItemTypes.Video:
        return (
          <div style={styles}>
            <ListItem>
              <Icon>videocam</Icon>
              <ListItemText primary="Video" />
            </ListItem>
          </div>
        );
      case ItemTypes.ImageGroup:
        return (
          <div style={styles}>
            <ListItem>
              <Icon>collections</Icon>
              <ListItemText primary="Image Group" />
            </ListItem>
          </div>
        );
      default:
        return (
          <div style={styles}>
            <ListItem>
              <ListItemIcon>
                <TextFieldIcon />
              </ListItemIcon>
              <ListItemText primary="Item" />
            </ListItem>
          </div>
        );
    }
  }

  tick() {
    // this.setState({
    //   tickTock: !this.state.tickTock
    // });
  }
}
