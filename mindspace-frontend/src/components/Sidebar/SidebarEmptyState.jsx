import { Box, Text, Button, Spinner } from "@chakra-ui/react";

export const SidebarEmptyState = ({ 
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