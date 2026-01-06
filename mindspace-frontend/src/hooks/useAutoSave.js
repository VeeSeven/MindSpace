import { useEffect } from "react";

export const useAutoSave = ({ note, editor, onSave, interval = 30000 }) => {
  useEffect(() => {
    if (!note || !editor) return;
    
    const autoSave = () => {
      if (editor.getHTML() !== (note.content || "<p></p>")) {
        onSave();
      }
    };
    
    const id = setInterval(autoSave, interval);
    return () => clearInterval(id);
  }, [note, editor, onSave, interval]);
};