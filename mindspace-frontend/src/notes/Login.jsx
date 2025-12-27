import { useContext, useState } from "react";
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  InputGroup, 
  InputRightElement, 
  VStack, 
  Heading, 
  Text, 
  Link, 
  useToast,
  Flex,
  Container,
  Divider
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await loginUser(username, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      navigate("/");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    }
    setIsLoading(false);
  };

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
          {/* Left Side - Brand & Info */}
          <Box
            flex="1"
            maxW="600px"
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading 
              size="4xl" 
              color="blue.600" 
              fontWeight="800"
              letterSpacing="tight"
              mb={6}
              lineHeight="1.2"
            >
              Organize Your Thoughts with MindSpace
            </Heading>
            
            <Text fontSize="2xl" color="gray.600" mb={8} lineHeight="1.6">
              A beautiful, intuitive workspace for notes, ideas, and collaboration. 
              Everything you need to capture and organize your thoughts.
            </Text>
            
            <Box 
              bg="white" 
              p={8} 
              borderRadius="2xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.200"
              display={{ base: "none", lg: "block" }}
            >
              <VStack align="start" spacing={5}>
                <Heading size="lg" color="gray.800">Why Choose MindSpace?</Heading>
                <Text fontSize="lg" color="gray.600">• Rich text editor with real-time collaboration</Text>
                <Text fontSize="lg" color="gray.600">• Auto-save and version history</Text>
                <Text fontSize="lg" color="gray.600">• Organize with tags and folders</Text>
                <Text fontSize="lg" color="gray.600">• Secure cloud storage</Text>
                <Text fontSize="lg" color="gray.600">• Access from any device</Text>
              </VStack>
            </Box>
          </Box>

          {/* Right Side - Login Form */}
          <Box
            flex={{ base: "1", lg: "0.8" }}
            maxW="500px"
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
                    Welcome Back
                  </Heading>
                  <Text color="gray.500" fontSize="lg">
                    Sign in to access your workspace
                  </Text>
                </Box>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <VStack spacing={6}>
                    {/* Username Field */}
                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontWeight="600" fontSize="md" mb={2}>
                        Username
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="lg"
                        height="56px"
                        borderRadius="lg"
                        borderColor="gray.300"
                        _hover={{ borderColor: "blue.400" }}
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.15)",
                        }}
                        fontSize="md"
                        paddingX={4}
                      />
                    </FormControl>

                    {/* Password Field */}
                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontWeight="600" fontSize="md" mb={2}>
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          size="lg"
                          height="56px"
                          borderRadius="lg"
                          borderColor="gray.300"
                          _hover={{ borderColor: "blue.400" }}
                          _focus={{
                            borderColor: "blue.500",
                            boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.15)",
                          }}
                          fontSize="md"
                          paddingX={4}
                          paddingRight="60px"
                        />
                        <InputRightElement 
                          height="56px"
                          width="4.5rem"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            _hover={{ bg: "transparent" }}
                            h="100%"
                            w="100%"
                          >
                            {showPassword ? (
                              <ViewOffIcon color="gray.500" boxSize={5} />
                            ) : (
                              <ViewIcon color="gray.500" boxSize={5} />
                            )}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    {/* Forgot Password Link */}
                    <Box w="full" textAlign="right">
                      <Link
                        color="blue.500"
                        fontSize="md"
                        fontWeight="600"
                        _hover={{ color: "blue.600", textDecoration: "underline" }}
                      >
                        Forgot password?
                      </Link>
                    </Box>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      w="full"
                      colorScheme="blue"
                      size="lg"
                      height="56px"
                      fontSize="lg"
                      fontWeight="600"
                      borderRadius="lg"
                      isLoading={isLoading}
                      loadingText="Signing in..."
                      _hover={{
                        bg: "blue.600",
                        transform: "translateY(-2px)",
                        boxShadow: "xl"
                      }}
                      transition="all 0.3s"
                      mt={4}
                    >
                      Sign In
                    </Button>
                  </VStack>
                </form>

                {/* Create Account Link */}
                <Box textAlign="center" pt={6}>
                  <Text color="gray.600" fontSize="lg">
                    Don't have an account?{" "}
                    <Link
                      color="blue.500"
                      fontWeight="700"
                      fontSize="lg"
                      _hover={{ color: "blue.600", textDecoration: "underline" }}
                      onClick={() => navigate("/register")}
                    >
                      Create one now
                    </Link>
                  </Text>
                </Box>

                {/* Demo Note */}
                <Box
                  p={5}
                  bg="blue.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="blue.200"
                  textAlign="center"
                >
                  <Text fontSize="md" color="blue.700">
                    <Text as="span" fontWeight="700" fontSize="lg">✨ Demo:</Text> Use any username/password or create a new account
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Footer */}
            <Box textAlign="center" mt={8}>
              <Text color="gray.500" fontSize="md">
                © {new Date().getFullYear()} MindSpace. All rights reserved.
              </Text>
              <Text color="gray.400" fontSize="sm" mt={2}>
                Secure login with JWT authentication
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}