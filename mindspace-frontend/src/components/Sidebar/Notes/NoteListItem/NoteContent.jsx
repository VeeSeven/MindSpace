import { HStack, Input, Text } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FiFileText, FiFolder } from "react-icons/fi";

export const NoteContent = ({
  note,
  hasChildren,
  isExpanded,
  onToggleExpand,
  editing,
  titleInput,
  setTitleInput,
  handleRename,
  setEditing,
}) => {
  return (
    <HStack spacing={2} flex="1" align="center">
      
      {hasChildren && (
        <ChevronRightIcon
          boxSize={3}
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand && onToggleExpand(note.id);
          }}
          transform={isExpanded ? "rotate(90deg)" : "none"}
          transition="transform 0.2s"
          color="gray.500"
        />
      )}

      {hasChildren ? (
        <FiFolder size="14px" color="#4299E1" />
      ) : (
        <FiFileText size="14px" color="#718096" />
      )}

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
          width="100%"
          maxWidth="200px"
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.target.select()}
        />
      ) : (
        <Text
          fontWeight="medium"
          fontSize="sm"
          isTruncated
          flex="1"
          color={hasChildren ? "blue.700" : "gray.700"}
        >
          {note.title || "Untitled"}
        </Text>
      )}
    </HStack>
  );
};