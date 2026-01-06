import { Box, VStack, Heading, Text, Link, Flex, Container } from "@chakra-ui/react";

export const FormContainer = ({ 
  children, 
  title, 
  subtitle, 
  footerLink, 
  footerText, 
  colorScheme = "blue",
  leftContent,
  rightContent 
}) => {
  const colors = {
    blue: { main: "blue.600", hover: "blue.400", focus: "blue.500", bg: "blue.50", border: "blue.200" },
    teal: { main: "teal.600", hover: "teal.400", focus: "teal.500", bg: "teal.50", border: "teal.200" }
  }[colorScheme] || colors.blue;

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      px={4}
    >
      <Container maxW="1200px" centerContent>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          width="100%"
          gap={{ base: 10, lg: 20 }}
        >
          {/* Left Side - Info */}
          {leftContent || (
            <Box
              flex="1"
              maxW="600px"
              textAlign={{ base: "center", lg: "left" }}
            >
              <Heading 
                size="4xl" 
                color={colors.main} 
                fontWeight="800"
                letterSpacing="tight"
                mb={6}
                lineHeight="1.2"
              >
                {title}
              </Heading>
              
              <Text fontSize="2xl" color="gray.600" mb={8} lineHeight="1.6">
                {subtitle}
              </Text>
              
              {rightContent}
            </Box>
          )}

          {/* Right Side - Form */}
          <Box
            flex={{ base: "1", lg: "0.9" }}
            maxW="550px"
            width="100%"
            mx="auto"
          >
            <Box
              bg="white"
              p={10}
              borderRadius="2xl"
              boxShadow="2xl"
              border="1px solid"
              borderColor="gray.200"
              width="100%"
            >
              <VStack spacing={8} align="stretch">
                {/* Form Header */}
                <Box textAlign="center">
                  <Heading 
                    size="2xl" 
                    color="gray.800" 
                    fontWeight="700"
                    mb={3}
                  >
                    {title}
                  </Heading>
                  <Text color="gray.500" fontSize="lg">
                    {subtitle}
                  </Text>
                </Box>

                {children}

                {/* Footer Link */}
                <Box textAlign="center" pt={6}>
                  <Text color="gray.600" fontSize="lg">
                    {footerText}{" "}
                    <Link
                      color={colors.main}
                      fontWeight="700"
                      fontSize="lg"
                      _hover={{ color: colors.hover, textDecoration: "underline" }}
                      onClick={footerLink.onClick}
                    >
                      {footerLink.text}
                    </Link>
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Page Footer */}
            <Box textAlign="center" mt={8}>
              <Text color="gray.500" fontSize="md">
                © {new Date().getFullYear()} MindSpace. All rights reserved.
              </Text>
              <Text color="gray.400" fontSize="sm" mt={2}>
                Your data is encrypted and secure
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

export const FormCard = ({ children }) => (
  <Box 
    bg="white" 
    p={8} 
    borderRadius="2xl" 
    boxShadow="lg"
    border="1px solid"
    borderColor="gray.200"
    width="100%"
  >
    {children}
  </Box>
);