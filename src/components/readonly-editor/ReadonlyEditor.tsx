import {convertFromRaw} from "draft-js";
import React, { useMemo, useRef } from "react";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import { EditorState, AtomicBlockUtils, convertToRaw } from "draft-js";

import "@draft-js-plugins/image/lib/plugin.css";
import createLinkPlugin from "@draft-js-plugins/anchor";


import "draft-js/dist/Draft.css";

import "./editor-overwrite-styles.css";

import createImagePlugin from "@draft-js-plugins/image";
import "@draft-js-plugins/image/lib/plugin.css";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
import "@draft-js-plugins/alignment/lib/plugin.css";
import createFocusPlugin from "@draft-js-plugins/focus";
import "@draft-js-plugins/focus/lib/plugin.css";
import createResizeablePlugin from "@draft-js-plugins/resizeable";

import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";

//link plugin
const linkPlugin = createLinkPlugin();
//image plugin
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  alignmentPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  linkPlugin
];
const mockState: any = {
  "blocks": [
      {
          "key": "etsc2",
          "text": "sdfsdfsfd",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
      },
      {
          "key": "21jm9",
          "text": "",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
      },
      {
          "key": "3d46s",
          "text": " ",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [
              {
                  "offset": 0,
                  "length": 1,
                  "key": 0
              }
          ],
          "data": {}
      },
      {
          "key": "1k4s",
          "text": "dasdadass",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
      },
      {
          "key": "7abiv",
          "text": "",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
      }
  ],
  "entityMap": {
      "0": {
          "type": "IMAGE",
          "mutability": "IMMUTABLE",
          "data": {
              "src": "https://styles.redditmedia.com/t5_2r5i1/styles/communityIcon_x4lqmqzu1hi81.jpg"
          }
      }
  }
};
type ReadonlyEditorProps = {
  content: string;
}
function ReadonlyEditor({content} : ReadonlyEditorProps) {
  //setup plugins for editor
  

  //make editor controlled
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
    );
  
  const editor = useRef<Editor | null>(null);
  React.useEffect(() => {
    const content = convertFromRaw(mockState);
    const editorStateWithContent = EditorState.createWithContent(content);
    setEditorState(editorStateWithContent);
  }, []);

  return (
    <>
      <div className="editor">
        <Editor
          readOnly={true}
          editorKey="SimpleInlineToolbarEditor"
          editorState={editorState}
          onChange={setEditorState}
          plugins={[...plugins, ]}
          ref={(element) => {
            editor.current = element;
          }}
        />
        <AlignmentTool />
      </div>
    </>
  );
}

export default ReadonlyEditor;