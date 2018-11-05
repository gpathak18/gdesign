import Icon from "@material-ui/core/Icon";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class EditorToolBar extends Component {
  render() {
    const styles = {
      root: {
        flexGrow: 1,
        border: 'none'
      },
      menuButton: {
        marginLeft: -18,
        marginRight: 10
      }
    };
    console.log(styles.root)
    return (
      <React.Fragment>
        <div id="toolbar" className={styles.root}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <select
                className="ql-header"
                defaultValue={""}
                onChange={e => e.persist()}
              >
                <option value="1" />
                <option value="2" />
              </select>
              <IconButton color="primary" className="ql-bold">
                <Icon>alarm</Icon>
              </IconButton>
              {/* <button className="ql-bold" /> */}
              <button className="ql-italic" />
              <select className="ql-color">
                {/* <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected /> */}
              </select>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          {/* <button className="ql-insertStar">
        <CustomButton />
      </button> */}
        </div>
      </React.Fragment>
    );
  }
}

export default EditorToolBar;
