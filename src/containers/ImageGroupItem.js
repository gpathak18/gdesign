import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import img from "../images/sfm.png";
import store from "./store";
import { setDroppedItem, setSelectedNode } from "./actions";
import ImageItem from "./ImageItem";

class ImageGroupItem extends Component {
  handleClick = event => {
    event.stopPropagation();
    store.dispatch(
      setSelectedNode({ selectedNode: parseInt(event.currentTarget.id) })
    );
  };

  getRows(root) {
    let item = "";
    let rows = root.rows;
    let cols = root.columns;

    let imgCols = root.child.map((node, i) => {
      item = (
        // <td>
          <ImageItem
            key={node}
            id={node}
            index={i}
            parent={this.props.id}
            node={this.props.state[node]}
            state={this.props.state}
            //   moveCard={this.moveCard.bind(this)}
            //   removeCard={this.removeCard.bind(this)}
            type="Image"
          />
        // </td>
      );
      return item;
    });

    let imgGrpRows = [];
    for (let i = 0; i < rows; i++) {
        let colums = [];
        for(let j=0;j < cols; j++) {
            colums.push(<td key={j}>{imgCols[i*cols+j]}</td>)
        }
        imgGrpRows.push(<tr key={i}>{colums}</tr>);
    }
    return imgGrpRows;
  }

  render() {
    const { node } = this.props;

    let element = (
      <table style={{width: '100%'}}>
        <tbody>{this.getRows(node)}</tbody>
      </table>
    );

    return <div>{element}</div>;
  }
}

// ImageItem.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default ImageGroupItem;
