import { VStack, Text } from "@chakra-ui/react";
import { TagBadge } from "../TagBadge";

export const TagList = ({ 
  tags, 
  onTagClick, 
  onTagDelete, 
  showCount = true,
  maxHeight = "none" 
}) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return (
      <Text fontSize="sm" color="gray.500" textAlign="center" py={2}>
        No tags yet
      </Text>
    );
  }

  return (
    <VStack
      align="stretch"
      spacing={2}
      maxHeight={maxHeight}
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          bg: "gray.300",
          borderRadius: "2px",
        },
      }}
    >
      {tags.map((tag, index) => (
        <TagBadge
          key={tag.id || (typeof tag === 'string' ? tag : index)}
          tag={tag}
          onClick={onTagClick}
          onRemove={onTagDelete ? () => onTagDelete(tag) : null}
          showRemove={!!onTagDelete}
          showCount={showCount}
          maxWidth="100%"
          justifyContent="space-between"
        />
      ))}
    </VStack>
  );
};