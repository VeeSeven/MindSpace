import { Box, Flex, useToast } from "@chakra-ui/react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import NoteEditor from "../components/NoteEditor";
import useAxios from "../api/axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const api = useAxios();
  const toast = useToast();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  // Load all notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const res = await api.get("notes/");
      const list = res.data.results || res.data;
      // Sort by updated_at descending (most recent first)
      const sortedNotes = list.sort((a, b) => 
        new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
      );
      setNotes(sortedNotes);

      // If there's no selected note, auto-select first and fetch its detail
      if (sortedNotes.length > 0 && !selectedNote) {
        fetchNoteDetail(sortedNotes[0].id);
      } else {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
      toast({
        title: "Failed to load notes",
        description: "Please check your connection and try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    }
    setLoading(false);
  };

  // Fetch detail for a single note (ensures we have `content`)
  const fetchNoteDetail = async (id) => {
    if (!id) return;
    try {
      const res = await api.get(`notes/${id}/`);
      setSelectedNote(res.data);
    } catch (error) {
      console.error("Error fetching note detail:", error);
      toast({
        title: "Failed to load note",
        description: "Please try again",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  // Create new note
  const createNote = async () => {
    try {
      const res = await api.post("notes/", {
        title: "Untitled Note",
        content: "<p></p>",
      });
      const newNotes = [res.data, ...notes];
      // Sort again
      const sortedNotes = newNotes.sort((a, b) => 
        new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
      );
      setNotes(sortedNotes);
      // fetch detail
      fetchNoteDetail(res.data.id);
      
      toast({
        title: "✨ New note created",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      console.error("Error creating note:", error);
      toast({
        title: "Failed to create note",
        description: error.message || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  // Update note in list after saving
  const handleSaved = (updated) => {
    setNotes((prev) => {
      const updatedNotes = prev.map((n) => (n.id === updated.id ? updated : n));
      // Re-sort
      return updatedNotes.sort((a, b) => 
        new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
      );
    });
    setSelectedNote(updated);
  };

  // Rename
  const renameNote = async (id, newTitle) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    try {
      const res = await api.put(`notes/${id}/`, {
        title: newTitle,
        content: note.content || "<p></p>",
      });
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, title: newTitle } : n)));
      if (selectedNote?.id === id) {
        setSelectedNote({ ...selectedNote, title: newTitle });
      }
      
      toast({
        title: "Note renamed",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      console.error("Error renaming note:", error);
      toast({
        title: "Failed to rename",
        description: "Please try again",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await api.delete(`notes/${id}/`);
      const newNotes = notes.filter((n) => n.id !== id);
      setNotes(newNotes);
      if (selectedNote?.id === id) {
        if (newNotes.length > 0) {
          fetchNoteDetail(newNotes[0].id);
        } else {
          setSelectedNote(null);
        }
      }
      
      toast({
        title: "Note deleted",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Failed to delete",
        description: "Please try again",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  return (
    <Box 
      minHeight="100vh" 
      bgGradient="linear(to-br, gray.50, blue.50)"
      overflow="hidden"
    >
      <Topbar />

      <Flex pt="60px" height="calc(100vh - 60px)">
        <Sidebar
          notes={notes}
          loading={loading}
          onCreateNote={createNote}
          onSelectNote={(note) => fetchNoteDetail(note.id)}
          selectedNoteId={selectedNote?.id}
          onRenameNote={renameNote}
          onDeleteNote={deleteNote}
        />

        <Box
          flex="1"
          height="100%"
          bg="transparent"
          ml="280px"
          overflow="hidden"
          position="relative"
        >
          <NoteEditor 
            key={selectedNote?.id || 'empty'} 
            note={selectedNote} 
            onSaved={handleSaved} 
          />
          
          {/* Watermark/Background Pattern */}
          <Box
            position="absolute"
            bottom="20px"
            right="20px"
            color="gray.300"
            fontSize="xs"
            opacity="0.5"
            zIndex="1"
            userSelect="none"
          >
            MindSpace Editor
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}