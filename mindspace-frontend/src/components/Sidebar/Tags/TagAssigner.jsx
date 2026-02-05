import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Checkbox,
  useToast
} from "@chakra-ui/react";
import { Text } from "../../common/TextWrapper";
import { FiTag, FiRefreshCw } from "react-icons/fi";
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const tokens = sessionStorage.getItem("tokens");
  if (tokens) {
    const access = JSON.parse(tokens).access;
    config.headers["Authorization"] = `Bearer ${access}`;
  }
  return config;
});

export const TagAssigner = ({ noteId, currentTags = [], onUpdate }) => {
  const [allTags, setAllTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [localTags, setLocalTags] = useState(currentTags || []);
  const toast = useToast();

  useEffect(() => {
    setLocalTags(currentTags || []);
  }, [currentTags]);

  const fetchAllTags = async () => {
    try {
      setIsLoading(true);
      const response = await API.get('tags/');
      console.log("Tags API response:", response);
      
      let tagsArray = [];
      if (response.data && Array.isArray(response.data)) {
        tagsArray = response.data;
      }
      
      setAllTags(tagsArray);
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast({
        title: "Error loading tags",
        description: "Could not fetch tags",
        status: "error",
        duration: 2000,
      });
      setAllTags([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagToggle = async (tag) => {
    if (!noteId) return;
    
    setIsLoading(true);
    try {
      const isCurrentlyAssigned = localTags.some(t => t.id === tag.id);
      
      if (isCurrentlyAssigned) {

        await API.delete(`notes/${noteId}/remove_tag/`, { data: { tag_id: tag.id } });
        
        setLocalTags(prev => prev.filter(t => t.id !== tag.id));
        
        toast({
          title: "Tag removed",
          description: `Removed "${tag.name}" from note`,
          status: "info",
          duration: 2000,
        });
      } else {

        await API.post(`notes/${noteId}/add_tag/`, { tag_id: tag.id });
        
        setLocalTags(prev => [...prev, tag]);
        
        toast({
          title: "Tag added",
          description: `Added "${tag.name}" to note`,
          status: "success",
          duration: 2000,
        });
      }
      
      if (onUpdate) {
        const updatedTags = isCurrentlyAssigned 
          ? localTags.filter(t => t.id !== tag.id)
          : [...localTags, tag];
        onUpdate(updatedTags);
      }
    } catch (error) {
      console.error("Error updating tag:", error);
      toast({
        title: "Error",
        description: "Failed to update tags",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const safeTags = Array.isArray(allTags) ? allTags : [];

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => {
        fetchAllTags();
        setIsOpen(true);
      }}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <Button
          size="xs"
          variant="ghost"
          leftIcon={<FiTag />}
          isLoading={isLoading}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Tags
        </Button>
      </PopoverTrigger>
      <PopoverContent width="250px" zIndex={9999}>
        <PopoverBody maxHeight="300px" overflowY="auto">
          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" fontWeight="semibold">
                Assign tags
              </Text>
              <Button
                size="xs"
                variant="ghost"
                onClick={fetchAllTags}
                leftIcon={<FiRefreshCw size="10px" />}
              >
                Refresh
              </Button>
            </HStack>
            
            {safeTags.length === 0 ? (
              <Text fontSize="sm" color="gray.500">
                No tags yet. Create some first.
              </Text>
            ) : (
              safeTags.map(tag => {
                const isAssigned = localTags.some(t => t && t.id === tag.id);
                return (
                  <HStack key={tag.id} justify="space-between">
                    <Tag
                      size="sm"
                      colorScheme="gray"
                      variant={isAssigned ? "solid" : "outline"}
                      bg={isAssigned ? "blue.100" : "transparent"}
                    >
                      <TagLabel>{tag.name}</TagLabel>
                    </Tag>
                    <Checkbox
                      isChecked={isAssigned}
                      onChange={() => handleTagToggle(tag)}
                      isDisabled={isLoading}
                    />
                  </HStack>
                );
              })
            )}
            
            <Text fontSize="xs" color="gray.500" pt={2} borderTop="1px solid" borderColor="gray.100">
              {localTags.length} tag(s) assigned
            </Text>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};