import { Box, Text, HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { useMemo } from "react";

export const TagFilter = ({ notes, selectedTags, setSelectedTags }) => {
  const allTags = useMemo(() => {
    const tags = new Set();
    notes.forEach(note => {
      if (note.tags) {
        note.tags.forEach(tag => {
          tags.add(typeof tag === 'object' ? tag.name : tag);
        });
      }
    });
    return Array.from(tags);
  }, [notes]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (allTags.length === 0) return null;

  return (
    <Box>
      <Text fontSize="xs" color="gray.500" mb={2}>Filter by tags:</Text>
      <HStack wrap="wrap" spacing={1}>
        {allTags.slice(0, 5).map(tag => (
          <Tag
            key={tag}
            size="sm"
            cursor="pointer"
            colorScheme={selectedTags.includes(tag) ? "blue" : "gray"}
            onClick={() => toggleTag(tag)}
          >
            <TagLabel>{tag}</TagLabel>
            {selectedTags.includes(tag) && (
              <TagCloseButton 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTag(tag);
                }}
              />
            )}
          </Tag>
        ))}
        {allTags.length > 5 && (
          <Tag size="sm" colorScheme="gray">
            +{allTags.length - 5} more
          </Tag>
        )}
      </HStack>
    </Box>
  );
};