import { Button, VStack, Divider } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export const SidebarHeader = ({ onCreateNote }) => {
  return (
    <VStack spacing={2} align="stretch">
      <Button 
        colorScheme="blue" 
        onClick={() => onCreateNote(null)}
        size="lg"
        mb={2}
        leftIcon={<AddIcon />}
      >
        New Note
      </Button>
      <Divider />
    </VStack>
  );
};