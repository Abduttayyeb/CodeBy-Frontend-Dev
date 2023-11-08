import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { syntaxHighlighting } from "@codemirror/language";
import { Transaction } from "@codemirror/state";

import socketEvents from "../socketEvents";
import { EditorViewTheme, EditorHighlightStyle } from "../styles/styles";

const drawerWidth = 240;
const BACKEND_URL = `https://codeby-prod-backend.onrender.com`;

const Editor = ({ socketRef, roomId }) => {
    const editorRef = useRef(null);
    const [codeContents, setCodeContents] = useState("");

    const UpdateListenerExtension = EditorView.updateListener.of(function (e) {
        const code = e.state.doc.toString();
        if (e.docChanged) {
            for (const transaction of e.transactions) {
                // Below we are dealing with only those updates which are done by the user. As
                // we are also updating the editor using setState(), so if we don't put this
                // condition then it will go on into infinite loop of event emitting and receiving.

                if (transaction.annotation(Transaction.userEvent)) {
                    socketRef.current.emit(socketEvents.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            }
        }
    });

    const EditorExtensions = [
        basicSetup,
        keymap.of([indentWithTab]),
        syntaxHighlighting(EditorHighlightStyle),
        javascript(),
        UpdateListenerExtension,
        EditorViewTheme,
    ];

    let data;
    const fetchCodeContents = async () => {
        try {
            console.log("Fetching Code Contents...");

            const response = await axios.get(`${BACKEND_URL}/code/${roomId}`);
            data = response.data.contents;
            console.log("Restored Code - ", data);
            setCodeContents(data);

            return data;
        } catch (err) {
            console.log("Content Fetch Error:", err);
        }
    };

    useEffect(() => {
        const fetchAndInitializeEditor = async () => {
            const fetchedData = await fetchCodeContents();
            console.log("Fetched Code Contents -", fetchedData);

            let editorState = EditorState.create({
                doc: fetchedData,
                extensions: EditorExtensions,
            });

            editorRef.current = new EditorView({
                state: editorState,
                parent: document.getElementById("EditorBox"),
            });
        };

        fetchAndInitializeEditor();

        // as this component renders way before the socket connection.
        // Hence now once the socketRef var is initialized and defined only then we will run the
        // below code.

        if (socketRef.current) {
            socketRef.current.on(socketEvents.CODE_CHANGE, ({ code }) => {
                // Below we are entirely changing the state i.e resetting the state again and again on code changes
                // beacuse if we used the state.update and state.dispatch method it would not work well.
                // setCodeContent(code);

                editorRef.current.setState(
                    EditorState.create({
                        doc: code,
                        extensions: EditorExtensions,
                    })
                );
            });
        }
    }, [socketRef.current, roomId]);

    return (
        <Box
            id="EditorBox"
            sx={{
                flexGrow: 1,
                p: 0,
                width: { sm: `calc(100% - ${drawerWidth - 100}px)` },
            }}>
            <Toolbar />
        </Box>
    );
};

export default Editor;
