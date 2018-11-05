import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DraggableItem from './DraggableItem'

export const mainListItems = (
  <div>
    <ListSubheader inset>Color Options</ListSubheader>
    <DraggableItem name="Add Text" iconName="text_fields"></DraggableItem>
    <DraggableItem name="Add Image" iconName="insert_photos"></DraggableItem>
    <DraggableItem name="Add Image" iconName="insert_photos"></DraggableItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Color Options</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Red" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Green" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Blue" />
    </ListItem>
  </div>
);