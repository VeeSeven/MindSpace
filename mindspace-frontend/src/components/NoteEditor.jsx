import { useEffect, useState } from "react";
import { useEditorSetup } from "../hooks/useEditorSetup";
import { useAutoSave } from "../hooks/useAutoSave";
import { 
  Box, 
  useToast,
  Heading,
  Spinner,
  Badge,
  Text,
  HStack,
  Divider,
  Button
} from "@chakra-ui/react";
import { Save } from "lucide-react";
import useAxios from "../api/axios";
import { EmptyState } from "./NoteEditor/EmptyState";
import { Toolbar } from "./NoteEditor/Toolbar";
import { EditorContentComponent } from "./NoteEditor/EditorContent";
import { EditorFooter } from "./NoteEditor/EditorFooter";

export default function NoteEditor({ note, onSaved }) {
  const api = useAxios();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  
  const initialContent = note?.content || "<p></p>";
  const { editor, wordCount, characterCount } = useEditorSetup(initialContent);


  useEffect(() => {
    if (!editor || !note) return;
    const html = note?.content || "<p></p>";
    editor.commands.setContent(html, false);
  }, [note, editor]);

  const handleSave = async () => {
    if (!note || !editor) return;
    
    setSaving(true);
    try {
      const content = editor.getHTML();
      const res = await api.put(`notes/${note.id}/`, {
        title: note.title,
        content,
      });
      
      onSaved?.(res.data);
      
      toast({ 
        title: "✓ Note saved", 
        status: "success", 
        duration: 1500, 
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({ 
        title: "Save failed", 
        description: error.message || "Please try again",
        status: "error", 
        duration: 2500, 
        isClosable: true,
        position: "top-right"
      });
    } finally {
      setSaving(false);
    }
  };

  useAutoSave({ note, editor, onSave: handleSave });

  if (!note) {
    return <EmptyState />;
  }

  return (
    <Box 
      width="100%" 
      height="100%" 
      display="flex" 
      flexDirection="column" 
      bg="white"
      overflow="hidden"
    >
      <Toolbar 
        editor={editor}
        wordCount={wordCount}
        characterCount={characterCount}
        saving={saving}
        onSave={handleSave}
        note={note}
      />

      <Box
        flex="1"
        overflowY="auto"
        width="100%"
        bg="gray.50"
        position="relative"
      >
        <Box
          maxW="900px"
          mx="auto"
          px={{ base: 4, md: 8, lg: 12 }}
          py={10}
          minHeight="calc(100vh - 160px)"
          bg="white"
          boxShadow="0 0 40px rgba(0, 0, 0, 0.02)"
          borderRadius="lg"
          marginTop="4"
          marginBottom="10"
        >
          <EditorContentComponent editor={editor} note={note} />
          <EditorFooter note={note} />
        </Box>
      </Box>
    </Box>
  );
}