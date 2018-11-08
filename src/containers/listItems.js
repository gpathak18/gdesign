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
export const mainListItems = (
  <div>
    <ListSubheader component="div">Contents</ListSubheader>
    <DraggableItem name="Text" type="Text" iconName="text_fields" />
    <DraggableItem name="Image" type="Image" iconName="insert_photos" />
    <DraggableItem
      name="Image Group"
      type="imagegroup"
      iconName="collections"
    />
    <DraggableItem name="Divider" type="divider" iconName="horizontal_split" />
    <DraggableItem name="Button" type="button" iconName="crop_landscape" />
    <DraggableItem name="Icons" type="icons" iconName="insert_emoticon" />
    <DraggableItem name="Video" type="video" iconName="videocam" />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader component="div">Alignement</ListSubheader>
    <ListItem style={{ cursor: "pointer" }}>
      <ToggleButtonGroup id="toolbar">
        <ToggleButton>
          <Icon>format_align_left</Icon>
        </ToggleButton>
        <ToggleButton>
          <Icon>format_align_center</Icon>
        </ToggleButton>
        <ToggleButton>
          <Icon>format_align_right</Icon>
        </ToggleButton>
        <ToggleButton>
          <Icon>format_align_justify</Icon>
        </ToggleButton>
      </ToggleButtonGroup>
    </ListItem>
    <ListSubheader component="div">Color</ListSubheader>
    <ListItem style={{ cursor: "pointer" }}>
      <ColorPicker colorType="format_color_text" />
    </ListItem>
  </div>
);
