import { Box, Heading, Text } from "@chakra-ui/react";

export const EmptyState = () => (
  <Box 
    display="flex" 
    alignItems="center" 
    justifyContent="center" 
    height="100%" 
    bgGradient="linear(to-br, gray.50, blue.50)"
  >
    <Box 
      textAlign="center" 
      p={10} 
      borderRadius="2xl" 
      bg="white" 
      boxShadow="xl"
      maxW="500px"
      mx={4}
    >
      <Heading size="xl" color="gray.700" mb={3} fontWeight="800">
        Welcome to MindSpace
      </Heading>
      <Text color="gray.500" fontSize="lg" mb={6}>
        Select a note from the sidebar or create a new one to begin
      </Text>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        gap={3} 
        color="gray.400"
      >
        <Text>✨</Text>
        <Text fontSize="sm">Tip: Your notes are auto-saved every 30 seconds</Text>
        <Text>✨</Text>
      </Box>
    </Box>
  </Box>
);