import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DraggableItem from "./DraggableItem";
import EditorToolBar from "./EditorToolBar";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Icon from "@material-ui/core/Icon";
import { SketchPicker } from "react-color";
import ColorPicker from "./ColorPicker";
import store from "./store";
import { setBgColor, setStyle } from "./actions";
import _ from "lodash";

let state = {
  rows: 1,
  cols: 2
}

export const mainListItems = (
  <div>
    <ListSubheader component="div">Contents</ListSubheader>
    <DraggableItem name="Text" type="Text" iconName="text_fields" />
    <DraggableItem name="Image" type="Image" iconName="insert_photos" />
    <DraggableItem
      name="Image Group"
      type="ImageGroup"
      iconName="collections"
      state = {state}
    >
    </DraggableItem>
    <DraggableItem name="Splitter" type="divider" iconName="horizontal_split" />
    <DraggableItem name="Button" type="button" iconName="crop_landscape" />
    <DraggableItem name="Icons" type="icons" iconName="insert_emoticon" />
    <DraggableItem name="Video" type="video" iconName="videocam" />
  </div>
);

let updateBackground = (option, color) => {
  console.log("here", color, option);
  store.dispatch(setBgColor({ bgColor: color }));
};

let handleClick = style => {
  store.dispatch(setStyle(style));
};


export const secondaryListItems = (
  <div>
    <ListSubheader component="div">Alignement</ListSubheader>
    <ListItem style={{ cursor: "pointer" }}>
      <ToggleButtonGroup>
        <ToggleButton onClick={() => handleClick({ textAlign: "left" })}>
          <Icon>format_align_left</Icon>
        </ToggleButton>
        <ToggleButton onClick={() => handleClick({ textAlign: "center" })}>
          <Icon>format_align_center</Icon>
        </ToggleButton>
        <ToggleButton onClick={() => handleClick({ textAlign: "right" })}>
          <Icon>format_align_right</Icon>
        </ToggleButton>
        <ToggleButton onClick={() => handleClick({ textAlign: "justify" })}>
          <Icon>format_align_justify</Icon>
        </ToggleButton>
      </ToggleButtonGroup>
    </ListItem>
    <ListSubheader component="div">Color</ListSubheader>
    <ListItem style={{ cursor: "pointer" }}>
      <ColorPicker
        // style={{ position: "absolute" }}
        colorType="format_color_fill"
        formatTextCallback={updateBackground}
        type="background"
      />
    </ListItem>
  </div>
);
