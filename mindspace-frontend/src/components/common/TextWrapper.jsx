import { Text as ChakraText } from "@chakra-ui/react";

export const Text = ({ children, ...props }) => {
  return <ChakraText {...props}>{children}</ChakraText>;
};

export default Text;