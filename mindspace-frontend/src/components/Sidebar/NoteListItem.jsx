import { useState } from "react";
import { 
  Box, 
  Text, 
  HStack, 
  IconButton, 
  Input 
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, TimeIcon } from "@chakra-ui/icons";
import { formatDate } from "../../utils/dateFormatter";

export const NoteListItem = ({ 
  note, 
  isSelected, 
  onSelect, 
  onRename, 
  onDelete 
}) => {
  const [editing, setEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(note.title);

  const handleRename = () => {
    if (titleInput.trim()) {
      onRename(note.id, titleInput.trim());
    }
    setEditing(false);
  };

  return (
    <Box
      p={3}
      borderRadius="md"
      bg={isSelected ? "blue.50" : "white"}
      border={isSelected ? "2px solid #3182ce" : "1px solid #E2E8F0"}
      _hover={{ 
        bg: isSelected ? "blue.50" : "gray.100",
        borderColor: isSelected ? "#3182ce" : "#CBD5E0",
        cursor: "pointer" 
      }}
      transition="all 0.2s"
      onClick={() => onSelect(note)}
    >
      <HStack justify="space-between" mb={1}>
        {editing ? (
          <Input
            autoFocus
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
              if (e.key === "Escape") setEditing(false);
            }}
            size="sm"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Text fontWeight="medium" isTruncated fontSize="sm">
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
              setEditing(true);
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
              onDelete(note.id);
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
  );
};