import { Box, Spinner } from "@chakra-ui/react";
import { EditorContent } from "@tiptap/react";

const editorStyles = {
  "& .tiptap": {
    minHeight: "500px",
    outline: "none",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "& > * + *": {
      marginTop: "1.25em",
    },
    "& h1": {
      fontSize: "2.75em",
      fontWeight: "800",
      lineHeight: 1.2,
      marginTop: "1.5em",
      marginBottom: "0.5em",
      color: "gray.800",
      letterSpacing: "-0.02em",
      borderBottom: "2px solid",
      borderColor: "blue.100",
      paddingBottom: "0.3em",
    },
    "& h2": {
      fontSize: "2.25em",
      fontWeight: "700",
      lineHeight: 1.3,
      marginTop: "1.5em",
      marginBottom: "0.5em",
      color: "gray.800",
      letterSpacing: "-0.01em",
    },
    "& h3": {
      fontSize: "1.75em",
      fontWeight: "600",
      lineHeight: 1.4,
      marginTop: "1.5em",
      marginBottom: "0.5em",
      color: "gray.700",
    },
    "& p": {
      fontSize: "1.125em",
      lineHeight: 1.8,
      marginBottom: "1.25em",
      color: "gray.700",
    },
    "& ul, & ol": {
      paddingLeft: "1.75em",
      marginBottom: "1.25em",
      "& li": {
        marginBottom: "0.5em",
        lineHeight: 1.7,
        "& p": {
          margin: 0,
        },
        "&::marker": {
          color: "#4299E1",
        },
      },
    },
    "& blockquote": {
      borderLeft: "4px solid",
      borderColor: "blue.300",
      paddingLeft: "1.5em",
      fontStyle: "italic",
      margin: "2em 0",
      color: "gray.600",
      backgroundColor: "blue.50",
      padding: "1.5em",
      borderRadius: "8px",
      "& p": {
        fontSize: "1.2em",
        lineHeight: 1.6,
        margin: 0,
      },
    },
    "& code": {
      backgroundColor: "gray.100",
      padding: "0.2em 0.4em",
      borderRadius: "6px",
      fontFamily: "'SF Mono', Monaco, 'Courier New', monospace",
      fontSize: "0.9em",
      color: "gray.800",
      border: "1px solid",
      borderColor: "gray.200",
    },
    "& pre": {
      backgroundColor: "gray.900",
      color: "gray.100",
      padding: "1.5em",
      borderRadius: "12px",
      overflow: "auto",
      margin: "2em 0",
      fontSize: "0.95em",
      lineHeight: 1.6,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      "& code": {
        backgroundColor: "transparent",
        padding: 0,
        color: "inherit",
        fontSize: "inherit",
        border: "none",
      },
    },
    "& hr": {
      border: "none",
      borderTop: "2px dashed",
      borderColor: "gray.300",
      margin: "3em 0",
    },
    "& .ProseMirror": {
      padding: "1em 0",
      "& > *:first-of-type": {
        marginTop: 0,
      },
    },
    "& .ProseMirror-focused": {
      outline: "none",
    },
  },
};

export const EditorContentComponent = ({ editor }) => {
  return (
    <Box sx={editorStyles}>
      {editor ? (
        <EditorContent editor={editor} />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="500px">
          <Spinner size="xl" color="blue.500" thickness="3px" />
        </Box>
      )}
    </Box>
  );
};