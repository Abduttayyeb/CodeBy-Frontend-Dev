import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { EditorView } from "@codemirror/view";

import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

export const themeLayout = createTheme({
    typography: {
        fontFamily: ["Poppins", "sans-serif", "Rajdhani"].join(","),
    },

    palette: {
        background: {
            default: "#262626",
        },
        text: {
            primary: "#fff",
        },
    },
});

export const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#fff",
    },
    "& label": {
        color: "#fff",
        fontFamily: "Rajdhani",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#1976d2",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#1976d2",
        },
        "&:hover fieldset": {
            borderColor: "#1976d2",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
        },
    },
});

export const EditorViewTheme = EditorView.theme(
    {
        "&": {
            color: "white",
            backgroundColor: "#111111",
            height: "700px",
        },
        ".cm-scroller": { overflow: "auto" },
        ".cm-content": {
            caretColor: "#111111",
        },
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#111111",
        },
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "#2d3e41",
        },

        ".cm-gutters": {
            backgroundColor: "#111111",
            color: "#ddd",
            border: "none",
        },
    },
    { dark: true }
);

export const EditorHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#c1e81b" },
    { tag: tags.comment, color: "#f5d", fontStyle: "italic" },
    { tag: tags.string, color: "#b29970" },
    { tag: tags.number, color: "#b29970" },
]);