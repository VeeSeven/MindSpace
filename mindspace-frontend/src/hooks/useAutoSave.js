import { useEffect, useRef } from "react";

export const useAutoSave = ({ note, editor, onSave, interval = 30000 }) => {
  const saveTimeoutRef = useRef(null);
  const lastSavedContentRef = useRef("");
  const saveAttemptRef = useRef(0);
  
  useEffect(() => {
    if (!note || !editor) {
      console.log("❌ Auto-save: Missing note or editor");
      return;
    }
    
    // Store initial content
    lastSavedContentRef.current = note.content || "<p></p>";
    saveAttemptRef.current = 0;
    
    console.log(`✅ Auto-save: Enabled for note "${note.title}"`);
    console.log(`⏰ Will save every ${interval / 1000} seconds`);
    console.log(`🕐 First auto-save at: ${new Date(Date.now() + interval).toLocaleTimeString()}`);
    
    const performAutoSave = () => {
      if (!editor || !editor.isEditable || !editor.isFocused) {
        console.log("⏭️ Auto-save: Editor not ready or not focused, skipping");
        return;
      }
      
      saveAttemptRef.current += 1;
      const currentContent = editor.getHTML();
      const lastContent = lastSavedContentRef.current;
      
      console.log(`\n🔄 Auto-save attempt #${saveAttemptRef.current} at ${new Date().toLocaleTimeString()}`);
      console.log("📝 Current content length:", currentContent.length);
      console.log("💾 Last saved length:", lastContent.length);
      
      // Simple content comparison
      if (currentContent !== lastContent) {
        console.log("💡 Changes detected!");
        console.log("🚀 Triggering save...");
        onSave();
        lastSavedContentRef.current = currentContent;
      } else {
        console.log("✅ No changes to save");
      }
    };
    
    // Set up interval - FORCE save regardless of content
    const intervalId = setInterval(() => {
      console.log(`\n⏰ AUTO-SAVE TIMER TRIGGERED at ${new Date().toLocaleTimeString()}`);
      performAutoSave();
    }, interval);
    
    // Also trigger on editor changes (debounced)
    const handleEditorUpdate = ({ editor: updatedEditor }) => {
      console.log("✏️ Editor content changed (debounced save in 30s)");
      
      // Clear any existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Set a new timeout for auto-save
      saveTimeoutRef.current = setTimeout(() => {
        console.log("🕐 Debounced auto-save triggered");
        performAutoSave();
      }, interval);
    };
    
    // Listen for editor changes
    editor.on('update', handleEditorUpdate);
    
    return () => {
      console.log("🧹 Auto-save: Cleaning up intervals/timeouts");
      clearInterval(intervalId);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      editor.off('update', handleEditorUpdate);
    };
  }, [note, editor, onSave, interval]);
};