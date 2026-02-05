import { useState, useEffect } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { NoteContent } from "./NoteContent";
import { NoteActions } from "./NoteActions";
import { NoteMetadata } from "./NoteMetadata";
import { TagAssigner } from "../../Tags/TagAssigner";

export const NoteListItem = ({ 
  note, 
  isSelected, 
  onSelect, 
  onRename, 
  onDelete,
  depth = 0,
  isExpanded = false,
  onToggleExpand,
  children = [],
  onAddChildNote,
  onTagClick,
}) => {
  const [editing, setEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(note.title);
  const [noteTags, setNoteTags] = useState(note.tags || []);

  useEffect(() => {
    setNoteTags(note.tags || []);
  }, [note]);

  const handleTagUpdate = (updatedTags) => {
    setNoteTags(updatedTags);
  };

  const handleRename = () => {
    if (titleInput.trim()) {
      onRename(note.id, titleInput.trim());
    }
    setEditing(false);
  };

  const hasChildren = children && children.length > 0;

  return (
    <Box
      p={3}
      borderRadius="md"
      bg={isSelected ? "blue.50" : "white"}
      border={isSelected ? "2px solid" : "1px solid"}
      borderColor={isSelected ? "blue.400" : "gray.200"}
      ml={`${depth * 20}px`}
      _hover={{ 
        bg: isSelected ? "blue.50" : "gray.50",
        borderColor: isSelected ? "blue.400" : "gray.300",
        cursor: "pointer" 
      }}
      transition="all 0.2s"
      onClick={() => onSelect(note)}
    >
      <VStack align="stretch" spacing={2}>
        
        <HStack justify="space-between" align="flex-start">
          <NoteContent
            note={note}
            hasChildren={hasChildren}
            isExpanded={isExpanded}
            onToggleExpand={onToggleExpand}
            editing={editing}
            titleInput={titleInput}
            setTitleInput={setTitleInput}
            handleRename={handleRename}
            setEditing={setEditing}
          />
          
          <HStack spacing={1}>

            <TagAssigner
              noteId={note.id}
              currentTags={noteTags}
              onUpdate={handleTagUpdate}
            />
            
            <NoteActions
              note={note}
              onEdit={() => {
                setEditing(true);
                setTitleInput(note.title);
              }}
              onDelete={() => onDelete(note.id)}
              onAddChild={onAddChildNote ? () => onAddChildNote(note.id) : null}
            />
          </HStack>
        </HStack>

        <NoteMetadata
          note={{ ...note, tags: noteTags }}
          onTagClick={onTagClick}
          showTags={true}
          hasChildren={hasChildren}
        />
      </VStack>
    </Box>
  );
};