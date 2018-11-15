import React, { Component } from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import CustomDragLayer from "./CustomDragLayer";
import Row from "./Row";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "./store";
import HeaderEditor from './HeaderEditor'
import { adjustHeight } from "./actions";
import ReactQuill, { Quill } from 'react-quill';
import { Columns, Cell, Splitter } from "react-resizable-grid";
import IndentAttributor from './IndentAttributor';
import DraggableItem from './DraggableItem'
import FooterEditor from './FooterEditor'
import BodyEditor from './BodyEditor'
import Container from './Container'

class Editor extends Component {


  renderTree(root) {
    return root.child.map(node => {
      return (
        <Row
          key={node}
          id={node}
          node={this.props.state[node]}
          state={this.props.state}
        />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div style={{display: "flex", justifyContent: "center", width: "100%",height: "100%" }}>
          <div  id="editor"  style={{ width: "800px",  height: "100%"}} >
                {/* <HeaderEditor id="header" state={this.props.state}></HeaderEditor>
                <BodyEditor id="body" state={this.props.state}></BodyEditor>
                <FooterEditor id="footer" state={this.props.state}></FooterEditor> */}
                <Container id="header" state={this.props.state}></Container>
                <Container id="body" state={this.props.state}></Container>
                <Container id="footer" state={this.props.state}></Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Editor;
