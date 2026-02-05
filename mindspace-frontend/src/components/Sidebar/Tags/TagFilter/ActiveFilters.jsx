import { HStack, Text, Wrap } from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { TagBadge } from "../TagBadge";

export const ActiveFilters = ({ selectedTags, onRemoveTag, onClearAll }) => {
  if (selectedTags.length === 0) return null;

  return (
    <HStack align="flex-start" spacing={2}>
      <FiFilter size="14px" color="#718096" style={{ marginTop: "4px" }} />
      
      <Wrap spacing={1} flex="1">
        {selectedTags.map(tagName => (
          <TagBadge
            key={tagName}
            tag={tagName}
            onRemove={() => onRemoveTag(tagName)}
            showRemove={true}
            size="sm"
            colorScheme="blue"
            maxWidth="100px"
          />
        ))}
      </Wrap>
    </HStack>
  );
};