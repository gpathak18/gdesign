import * as React from "react";
import Text from "./TextEditor";
import DraggableItem from "./DraggableItem";
import TextFieldIcon from "@material-ui/icons/TextFields";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
  display: "inline-block",
  // transform: "rotate(-7deg)",
  zIndex: "1000",
  borderRadius: '5px',
  border: '1px solid gray'
};

export default class DragPreview extends React.PureComponent {

  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // const { left, top } = this.props;
    // const { tickTock } = this.state;
    return (
      <div style={styles}>
        <ListItem>
          <ListItemIcon>
            <TextFieldIcon />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </ListItem>
      </div>
    );
  }

  tick() {
    // this.setState({
    //   tickTock: !this.state.tickTock
    // });
  }
}
