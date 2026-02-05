import { Button, VStack, Divider } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export const SidebarHeader = ({ onCreateNote }) => {
  return (
    <VStack spacing={2} align="stretch">
      <Button 
        colorScheme="blue" 
        onClick={() => onCreateNote(null)}
        size="md"
        leftIcon={<FiPlus />}
        fontWeight="semibold"
        width="100%"
      >
        New Note
      </Button>
      <Divider />
    </VStack>
  );
};