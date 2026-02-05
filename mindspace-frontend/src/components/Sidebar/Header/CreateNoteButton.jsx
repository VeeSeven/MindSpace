import { Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export const CreateNoteButton = ({ onCreateNote }) => {
  return (
    <Button
      colorScheme="blue"
      onClick={() => onCreateNote(null)}
      leftIcon={<FiPlus />}
      size="md"
      fontWeight="semibold"
      width="100%"
    >
      New Note
    </Button>
  );
};