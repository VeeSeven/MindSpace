import { useState } from "react";
import { 
  Box, 
  Text, 
  HStack, 
  IconButton, 
  Input,
  VStack,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { 
  DeleteIcon, 
  EditIcon, 
  TimeIcon, 
  ChevronRightIcon,
  ChevronDownIcon,
  AddIcon,
  HamburgerIcon,
  AttachmentIcon,  // Use as folder icon
  CalendarIcon    // Use as note icon
} from "@chakra-ui/icons";
import { formatDate } from "../../utils/dateFormatter";

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
  isFolder = false
}) => {
  const [editing, setEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(note.title);
  
  const hasChildren = children && children.length > 0;
  const shouldShowAsFolder = isFolder || hasChildren || note.parent === null;

  const handleRename = () => {
    if (titleInput.trim()) {
      onRename(note.id, titleInput.trim());
    }
    setEditing(false);
  };

  return (
    <>
      <Box
        p={3}
        borderRadius="md"
        bg={isSelected ? "blue.50" : "white"}
        border={isSelected ? "2px solid #3182ce" : "1px solid #E2E8F0"}
        ml={`${depth * 24}px`}
        _hover={{ 
          bg: isSelected ? "blue.50" : "gray.100",
          borderColor: isSelected ? "#3182ce" : "#CBD5E0",
          cursor: "pointer" 
        }}
        transition="all 0.2s"
        onClick={() => onSelect(note)}
      >
        <HStack justify="space-between" mb={1}>
          <HStack spacing={2}>
            {/* Expand/Collapse Button */}
            {hasChildren && (
              <IconButton
                size="xs"
                variant="ghost"
                icon={isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand && onToggleExpand(note.id);
                }}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              />
            )}
            
            {/* Folder/Note Icon - using Chakra icons */}
            {shouldShowAsFolder ? (
              <AttachmentIcon boxSize={3} color="blue.400" />
            ) : (
              <CalendarIcon boxSize={3} color="gray.400" />
            )}
            
            {/* Title */}
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
                width="150px"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <Text fontWeight="medium" fontSize="sm" isTruncated maxW="180px">
                {note.title || "Untitled"}
              </Text>
            )}
            
            {/* Tag Badges */}
            {note.tags && note.tags.length > 0 && (
              <HStack spacing={1}>
                {note.tags.slice(0, 2).map(tag => (
                  <Badge key={tag.id || tag} fontSize="xxs" colorScheme="gray">
                    {typeof tag === 'object' ? tag.name : tag}
                  </Badge>
                ))}
                {note.tags.length > 2 && (
                  <Badge fontSize="xxs" colorScheme="gray">
                    +{note.tags.length - 2}
                  </Badge>
                )}
              </HStack>
            )}
          </HStack>

          <HStack spacing={1}>
            {/* Context Menu */}
            <Menu>
              <MenuButton
                as={IconButton}
                size="xs"
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={(e) => e.stopPropagation()}
                aria-label="More actions"
              />
              <MenuList>
                <MenuItem 
                  icon={<EditIcon />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(true);
                    setTitleInput(note.title);
                  }}
                >
                  Rename
                </MenuItem>
                <MenuItem 
                  icon={<AddIcon />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChildNote && onAddChildNote(note.id);
                  }}
                  isDisabled={!onAddChildNote}
                >
                  Add note inside
                </MenuItem>
                <MenuItem 
                  icon={<DeleteIcon />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.id);
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
        
        {/* Date Info */}
        <HStack spacing={1} align="center">
          <TimeIcon boxSize={2} color="gray.400" />
          <Text fontSize="xs" color="gray.500">
            {formatDate(note.updated_at || note.created_at)}
          </Text>
        </HStack>
      </Box>
      
      {/* Recursive Children */}
      {isExpanded && hasChildren && (
        <VStack align="stretch" spacing={1}>
          {children.map(child => (
            <NoteListItem
              key={child.id}
              note={child}
              isSelected={isSelected}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
              depth={depth + 1}
              isExpanded={isExpanded}
              onToggleExpand={onToggleExpand}
              children={child.children || []}
              onAddChildNote={onAddChildNote}
              isFolder={child.children && child.children.length > 0}
            />
          ))}
        </VStack>
      )}
    </>
  );
};