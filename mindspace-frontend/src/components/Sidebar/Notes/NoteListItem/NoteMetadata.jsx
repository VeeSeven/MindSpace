import { HStack, Wrap } from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { TagBadge } from "../../Tags/TagBadge"; 
import { Text } from "../../../common/TextWrapper"; 

export const NoteMetadata = ({ note, onTagClick, showTags = true, hasChildren }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tags = Array.isArray(note.tags) ? note.tags : [];

  return (
    <HStack justify="space-between" align="flex-start" spacing={2}>
      {/* Tags Section */}
      {showTags && tags.length > 0 && (
        <Wrap spacing={1} flex="1">
          {tags.map(tag => (
            <TagBadge
              key={tag.id}
              tag={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              size="xs"
              maxWidth="100px"
            />
          ))}
        </Wrap>
      )}

      {/* Date Section */}
      <HStack spacing={1} color="gray.500" fontSize="xs" whiteSpace="nowrap">
        <FiCalendar size="12px" />
        <Text>{formatDate(note.updated_at)}</Text>
      </HStack>
    </HStack>
  );
};