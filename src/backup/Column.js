import React from "react";
import Row from "./Row";
import ReactDOM from 'react-dom';
import store from "../containers/store";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  addRow,
  addColumn,
  setSelectedNode
} from "../containers/actions";
class Column extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      left: 10,
      top: 10,
      width: 200,
      height: 200,
      column: {
        background: "#" + Math.floor(Math.random() * 1000),
        height: "100%",
        width: "50%",
        position: 'relative'
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  moveBox(id, left, top) {
    console.log(left, top);
    this.setState({
      left: left,
      top: top
    });
  }

  handleClick(e) {
    store.dispatch(setSelectedNode(e.target.id));
  };


  callMe(node) {
    if (node) {
      return this.checkChildNode(node);
    } else {
      return <td id = {
        this.props.id
      } > </td>;
    }
  }


  checkChildNode(node) {
    console.log(this.props);
    return node.child.map(node => {
      return this.renderChilds(this.props.state[node], node);
    });
  }

  renderChilds(node, key) {
    if (node && node.type === "row") {
      return <Row key={key} id={key} node={node} state={this.props.state} />;
    } else if (node && node.type === "column") {
      return <Column key={key} id={key} node={node} state={this.props.state} />;
    } else {
      console.log('inside else row')
      return;
    }
  }
  render() {
    const {
      column,
      div
    } = this.state;
    return (
    // <td style = {column} id = {this.props.id} onClick = {this.handleClick} >
    //  <Rnd style={style} disableDragging='true' default={{
    //   x: 0,
    //   y: 0,
    //   width: '100%',
    //   height: '100%'
    // }}>
    // {
    //     this.callMe(this.props.node)
    //   } 
    // </Rnd> </td>
    // <Rnd style={column} default={{x:0,y:0,width:'50%', height:'100%'}}>
      <Grid item id = {this.props.id} onClick = {this.handleClick}>
          {this.callMe(this.props.node)}
      </Grid>
    // </Rnd>
 
    );
  }
}

export default Column;