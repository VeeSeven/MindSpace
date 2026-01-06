import { Box, VStack, Heading, Text } from "@chakra-ui/react";

export const InfoPanel = ({ 
  title, 
  description, 
  features = [],
  color = "blue",
  showCard = true 
}) => {
  const colorMap = {
    blue: { bg: "blue.50", border: "blue.200", text: "blue.700" },
    teal: { bg: "teal.50", border: "teal.200", text: "teal.700" }
  }[color] || colorMap.blue;

  const content = (
    <VStack align="start" spacing={5}>
      {title && <Heading size="lg" color="gray.800">{title}</Heading>}
      {features.map((feature, index) => (
        <Text key={index} fontSize="lg" color="gray.600">
          • {feature}
        </Text>
      ))}
    </VStack>
  );

  if (showCard) {
    return (
      <Box 
        bg="white" 
        p={8} 
        borderRadius="2xl" 
        boxShadow="lg"
        border="1px solid"
        borderColor="gray.200"
        display={{ base: "none", lg: "block" }}
      >
        {content}
      </Box>
    );
  }

  return content;
};