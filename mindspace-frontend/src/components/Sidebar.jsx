// src/components/Sidebar.jsx
import { 
  VStack, 
  Button, 
  Box, 
  Text, 
  Spinner, 
  HStack, 
  IconButton,
  Input,
  useToast,
  Divider
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { format } from "date-fns";

export default function Sidebar({
  notes,
  loading,
  onCreateNote,
  onSelectNote,
  selectedNoteId,
  onRenameNote,
  onDeleteNote,
}) {
  const [editingId, setEditingId] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const toast = useToast();

  const handleDeleteNote = (id) => {
    onDeleteNote(id);
    toast({
      title: "Note deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy");
    } catch {
      return "Recently";
    }
  };

  return (
    <Box
      width="280px"
      height="calc(100vh - 60px)"
      borderRight="1px solid"
      borderColor="gray.200"
      bg="gray.50"
      position="fixed"
      top="60px"
      left="0"
      overflowY="auto"
      zIndex="10"
    >
      <VStack spacing={2} align="stretch" p={4}>
        <Button 
          colorScheme="blue" 
          onClick={onCreateNote}
          size="lg"
          mb={2}
        >
          + New Note
        </Button>

        <Divider />

        {loading && (
          <Box textAlign="center" py={8}>
            <Spinner />
            <Text mt={2} color="gray.500">Loading notes...</Text>
          </Box>
        )}

        {!loading && notes.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">No notes yet</Text>
            <Text fontSize="sm" color="gray.400" mt={1}>
              Create your first note!
            </Text>
          </Box>
        )}

        {!loading &&
          notes.map((note) => (
            <Box
              key={note.id}
              p={3}
              borderRadius="md"
              bg={note.id === selectedNoteId ? "blue.50" : "white"}
              border={note.id === selectedNoteId ? "2px solid #3182ce" : "1px solid #E2E8F0"}
              _hover={{ 
                bg: note.id === selectedNoteId ? "blue.50" : "gray.100",
                borderColor: note.id === selectedNoteId ? "#3182ce" : "#CBD5E0",
                cursor: "pointer" 
              }}
              transition="all 0.2s"
              onClick={() => onSelectNote(note)}
            >
              <HStack justify="space-between" mb={1}>
                {editingId === note.id ? (
                  <Input
                    autoFocus
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onBlur={() => {
                      if (titleInput.trim()) {
                        onRenameNote(note.id, titleInput.trim());
                      }
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (titleInput.trim()) {
                          onRenameNote(note.id, titleInput.trim());
                        }
                        setEditingId(null);
                      }
                      if (e.key === "Escape") {
                        setEditingId(null);
                      }
                    }}
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <Text
                    fontWeight="medium"
                    isTruncated
                    fontSize="sm"
                  >
                    {note.title || "Untitled"}
                  </Text>
                )}

                <HStack spacing={1}>
                  <IconButton
                    size="xs"
                    variant="ghost"
                    icon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(note.id);
                      setTitleInput(note.title);
                    }}
                    aria-label="Rename note"
                  />

                  <IconButton
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                    aria-label="Delete note"
                  />
                </HStack>
              </HStack>
              
              <HStack spacing={1} align="center">
                <TimeIcon boxSize={2} color="gray.400" />
                <Text fontSize="xs" color="gray.500">
                  {formatDate(note.updated_at || note.created_at)}
                </Text>
              </HStack>
            </Box>
          ))}
      </VStack>
    </Box>
  );
}
