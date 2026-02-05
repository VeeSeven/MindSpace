import { Box, Button, Spinner, VStack, Icon } from "@chakra-ui/react";
import { Text } from "../../common/TextWrapper";
import { FiFileText, FiFilter, FiInbox } from "react-icons/fi";

export const EmptyState = ({ 
  loading, 
  notes, 
  filteredTree, 
  clearFilters,
  searchQuery = "",
  selectedTags = []
}) => {
  const hasActiveFilters = searchQuery || (selectedTags && selectedTags.length > 0);
  
  if (loading) {
    return (
      <VStack 
        py={10} 
        spacing={4} 
        justify="center" 
        align="center"
        color="gray.500"
      >
        <Spinner 
          thickness="3px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
        />
        <Text fontSize="sm" fontWeight="medium">
          Loading your notes...
        </Text>
      </VStack>
    );
  }

  if (!loading && notes.length === 0) {
    return (
      <VStack 
        py={12} 
        spacing={4} 
        justify="center" 
        align="center"
        color="gray.500"
      >
        <Icon as={FiInbox} boxSize={12} opacity={0.5} />
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="semibold" mb={1}>
            No notes yet
          </Text>
          <Text fontSize="sm" maxWidth="200px" mx="auto">
            Create your first note to get started!
          </Text>
        </Box>
      </VStack>
    );
  }

  if (!loading && filteredTree.length === 0 && notes.length > 0) {
    return (
      <VStack 
        py={10} 
        spacing={4} 
        justify="center" 
        align="center"
        color="gray.500"
      >
        {hasActiveFilters ? (
          <>
            <Icon as={FiFilter} boxSize={10} opacity={0.5} />
            <Box textAlign="center">
              <Text fontSize="md" fontWeight="semibold" mb={1}>
                No matching notes
              </Text>
              <Text fontSize="sm" maxWidth="220px" mx="auto">
                {searchQuery 
                  ? `No notes found for "${searchQuery}"`
                  : `No notes with the selected tags`
                }
              </Text>
            </Box>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={clearFilters}
              colorScheme="blue"
              mt={2}
            >
              Clear all filters
            </Button>
          </>
        ) : (
          <>
            <Icon as={FiFileText} boxSize={10} opacity={0.5} />
            <Box textAlign="center">
              <Text fontSize="md" fontWeight="semibold" mb={1}>
                All notes filtered
              </Text>
              <Text fontSize="sm" maxWidth="200px" mx="auto">
                Your current view doesn't show any notes
              </Text>
            </Box>
          </>
        )}
      </VStack>
    );
  }
  
  return null;
};

export const SimpleEmptyState = ({ 
  loading, 
  notes, 
  filteredTree, 
  clearFilters 
}) => {
  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner />
        <Text mt={2} color="gray.500">Loading notes...</Text>
      </Box>
    );
  }

  if (!loading && notes.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No notes yet</Text>
        <Text fontSize="sm" color="gray.400" mt={1}>
          Create your first note!
        </Text>
      </Box>
    );
  }

  if (!loading && filteredTree.length === 0 && notes.length > 0) {
    return (
      <Box textAlign="center" py={4}>
        <Text color="gray.500">No notes match your filters</Text>
        <Button 
          size="xs" 
          variant="link" 
          color="blue.500"
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      </Box>
    );
  }
  
  return null;
};

export default EmptyState;