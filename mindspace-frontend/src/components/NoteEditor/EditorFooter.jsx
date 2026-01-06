import { Box, Text } from "@chakra-ui/react";
import { formatDate } from "../../utils/dateFormatter";

export const EditorFooter = ({ note }) => (
  <Box 
    mt={10} 
    pt={6} 
    borderTop="1px solid" 
    borderColor="gray.200" 
    fontSize="sm" 
    color="gray.500"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Text>
      Last edited: {formatDate(note.updated_at)}
    </Text>
    <Text>
      Auto-saves every 30 seconds
    </Text>
  </Box>
);