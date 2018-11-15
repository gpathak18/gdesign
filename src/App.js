import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./containers/Dashboard";
import store from "./containers/store";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import CustomDragLayer from './containers/CustomDragLayer'
class App extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Dashboard state={store} />
        <CustomDragLayer />
      </DragDropContextProvider>
    );
  }
}

export default App;
