import { 
  VStack, 
  Button, 
  Box, 
  Text, 
  Spinner, 
  Divider,
  useToast
} from "@chakra-ui/react";
import { NoteListItem } from "./Sidebar/NoteListItem";

export default function Sidebar({
  notes,
  loading,
  onCreateNote,
  onSelectNote,
  selectedNoteId,
  onRenameNote,
  onDeleteNote,
}) {
  const toast = useToast();

  const handleDelete = (id) => {
    onDeleteNote(id);
    toast({
      title: "Note deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
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

        {!loading && notes.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            isSelected={note.id === selectedNoteId}
            onSelect={onSelectNote}
            onRename={onRenameNote}
            onDelete={handleDelete}
          />
        ))}
      </VStack>
    </Box>
  );
}