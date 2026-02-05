import { useState, useEffect } from "react";
import { VStack, Button, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { TagList } from "./TagList";
import { notesAPI } from "../../../../api/axios";

export const TagManager = ({ notes, onTagCreated, onTagDeleted }) => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await notesAPI.getTags();
        console.log("TagManager tags response:", response.data);
        
        let tagsArray = [];
        if (response.data && Array.isArray(response.data)) {
          tagsArray = response.data;
        } else if (response.data && response.data.results && Array.isArray(response.data.results)) {
          tagsArray = response.data.results;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          tagsArray = response.data.data;
        }
        
        console.log("Setting tags:", tagsArray);
        setTags(tagsArray);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setTags([]);
      }
    };
    fetchTags();
  }, []);

  const handleCreateTag = async () => {
    const trimmedName = newTagName.trim();
    if (!trimmedName) return;

    try {
      setIsCreating(true);
      const response = await notesAPI.createTag({ 
        name: trimmedName
      });
      
      console.log("Created tag response:", response.data);
      
      setTags(prev => {
        const currentTags = Array.isArray(prev) ? prev : [];
        
        if (currentTags.some(t => t.id === response.data.id)) {
          return currentTags;
        }
        return [...currentTags, response.data];
      });

      toast({
        title: "Success",
        description: `Tag "${trimmedName}" created`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setNewTagName("");
      if (onTagCreated) onTagCreated(response.data);
    } catch (error) {
      console.error("Error creating tag:", error.response || error);
      toast({
        title: "Error creating tag",
        description: error.response?.data?.detail || error.response?.data?.name?.[0] || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteTag = async (tag) => {
    try {
      await notesAPI.deleteTag(tag.id);
      
      setTags(prev => {
        const currentTags = Array.isArray(prev) ? prev : [];
        return currentTags.filter((t) => t.id !== tag.id);
      });

      toast({
        title: "Tag deleted",
        description: `"${tag.name}" has been removed`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });

      if (onTagDeleted) onTagDeleted(tag);
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast({
        title: "Error deleting tag",
        description: error.response?.data?.detail || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={3} align="stretch">
      <InputGroup size="sm">
        <Input
          placeholder="Create new tag..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreateTag();
          }}
          pr="4.5rem"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="xs"
            onClick={handleCreateTag}
            isLoading={isCreating}
            colorScheme="blue"
            leftIcon={<FiPlus size="12px" />}
          >
            Add
          </Button>
        </InputRightElement>
      </InputGroup>

      <TagList
        tags={Array.isArray(tags) ? tags : []}
        onTagDelete={handleDeleteTag}
        showCount={true}
        maxHeight="200px"
      />
    </VStack>
  );
};