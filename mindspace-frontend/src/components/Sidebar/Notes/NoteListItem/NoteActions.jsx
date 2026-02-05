import { HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { FiMoreVertical, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export const NoteActions = ({ note, onEdit, onDelete, onAddChild }) => {
  const hasChildren = note.children && note.children.length > 0;
  
  return (
    <HStack spacing={1}>
      <Menu>
        <MenuButton
          as={IconButton}
          size="xs"
          variant="ghost"
          icon={<FiMoreVertical />}
          onClick={(e) => e.stopPropagation()}
          aria-label="More actions"
          _hover={{ bg: "gray.200" }}
        />
        <MenuList>
          <MenuItem icon={<FiEdit size="14px" />} onClick={onEdit}>
            Rename
          </MenuItem>
          
          <MenuItem 
            icon={<FiPlus size="14px" />} 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddChild) onAddChild();
            }}
          >
            Add note inside
            {hasChildren && (
              <Text as="span" fontSize="xs" color="gray.500" ml={1}>
                ({note.children?.length || 0} inside)
              </Text>
            )}
          </MenuItem>
          
          <MenuItem 
            icon={<FiTrash2 size="14px" />} 
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Delete "${note.title}"?`)) {
                onDelete();
              }
            }}
            color="red.600"
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};