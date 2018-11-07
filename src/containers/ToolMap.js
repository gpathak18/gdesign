import React, { Component } from "react";
import EditorToolBar from "./EditorToolBar";
import TextEditor from "./TextEditor";

const toolMap = new Map();

toolMap.set("editor", <TextEditor />);
toolMap.set("editortools", <EditorToolBar />);

function editor() {
    return toolMap.get("editor")
}

export {toolMap, editor};
