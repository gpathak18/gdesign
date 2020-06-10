import React, { Component } from "react";
import Row from "../backup/Row";
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
