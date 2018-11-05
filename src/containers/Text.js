import React, { Component } from "react";
import ItemTypes from "./ItemTypes";
import { DragSource } from "react-dnd";
const style = {
	// position: 'relative',
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
  cursor: 'move',
}


// const itemSource = {
//     beginDrag(props) {
//       console.log("drag started",props);
      
//       const { id, left, top } = props
//       return { id, left, top }
//     },
//     endDrag(props) {
//       console.log("drag ended");
//     }
//   };
  
//   function collect(connect, monitor) {
//     return {
//       connectDragSource: connect.dragSource(),
//       isDragging: monitor.isDragging()
//     };
//   }

  
class Text extends Component {

    render() {

      return <div style={{ ...style }}> Hello </div>
   
    }
  }
  
export default Text
