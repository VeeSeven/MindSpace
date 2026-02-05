import { Box, VStack, Button, HStack, Wrap } from "@chakra-ui/react";
import { Text } from "../../../common/TextWrapper"; 
import { FiX } from "react-icons/fi";
import { TagCloud } from "./TagCloud";
import { ActiveFilters } from "./ActiveFilters";
import { notesAPI } from "../../../../api/axios";
import { useState, useEffect } from "react";

export const TagFilter = ({ notes, selectedTags, setSelectedTags }) => {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await notesAPI.getTags();
        if (response.data && Array.isArray(response.data)) {
          setAllTags(response.data);
        }
      } catch (error) {
        console.error("Error fetching tags for filter:", error);
      }
    };
    fetchAllTags();
  }, []);

  const handleTagClick = (tag) => {
    const tagName = typeof tag === 'object' ? tag.name : tag;
    
    setSelectedTags(prev => {
      const isAlreadySelected = prev.includes(tagName);
      return isAlreadySelected 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName];
    });
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const tagNames = allTags.map(tag => tag.name).sort();

  return (
    <VStack align="stretch" spacing={3}>
      
      {selectedTags.length > 0 && (
        <ActiveFilters 
          selectedTags={selectedTags}
          onRemoveTag={(tagName) => handleTagClick(tagName)}
          onClearAll={clearFilters}
        />
      )}

      {tagNames.length > 0 && (
        <Box>
          <Text fontSize="xs" color="gray.600" mb={2} fontWeight="medium">
            Quick filter by tags:
          </Text>
          <TagCloud
            tags={tagNames}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            maxTags={15}
          />
        </Box>
      )}

      {selectedTags.length > 0 && (
        <Button
          size="xs"
          variant="ghost"
          onClick={clearFilters}
          leftIcon={<FiX />}
          alignSelf="flex-end"
          color="gray.600"
        >
          Clear all filters
        </Button>
      )}
    </VStack>
  );
};