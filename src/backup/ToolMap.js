import React, { Component } from "react";
import EditorToolBar from "../containers/EditorToolBar";
import TextEditor from "../containers/TextEditor";

const toolMap = new Map();

toolMap.set("editor", <TextEditor />);
toolMap.set("editortools", <EditorToolBar />);

function editor() {
    return toolMap.get("editor")
}

export {toolMap, editor};
