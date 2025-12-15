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
  Icon,
  Container
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
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
      bgGradient="linear(to-br, blue.50, purple.50)"
      py={10}
    >
      <Container maxW="md">
        <Box
          bg="white"
          p={8}
          borderRadius="2xl"
          boxShadow="xl"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack spacing={6} align="stretch">
            {/* Logo/Header */}
            <VStack spacing={3}>
              <Heading 
                size="xl" 
                color="blue.600" 
                fontWeight="800"
                letterSpacing="tight"
              >
                Welcome Back
              </Heading>
              <Text color="gray.500" fontSize="md">
                Sign in to your MindSpace account
              </Text>
            </VStack>

            {/* Social Login Buttons */}
            <VStack spacing={3}>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Icon as={FcGoogle} boxSize={5} />}
                size="lg"
                fontSize="md"
                py={6}
                borderRadius="lg"
                borderColor="gray.300"
                _hover={{ bg: "gray.50", transform: "translateY(-1px)" }}
                transition="all 0.2s"
              >
                Continue with Google
              </Button>
              
              <Button
                w="full"
                variant="outline"
                leftIcon={<Icon as={FaGithub} boxSize={5} />}
                size="lg"
                fontSize="md"
                py={6}
                borderRadius="lg"
                borderColor="gray.300"
                _hover={{ bg: "gray.50", transform: "translateY(-1px)" }}
                transition="all 0.2s"
              >
                Continue with GitHub
              </Button>
            </VStack>

            {/* Custom Divider with "or" text */}
            <Box position="relative" py={2}>
              <Box 
                height="1px" 
                width="100%" 
                bg="gray.300" 
                my={2}
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                bg="white"
                px={4}
              >
                <Text color="gray.400" fontSize="sm" fontWeight="medium">
                  or
                </Text>
              </Box>
            </Box>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                {/* Username Field */}
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="600">
                    Username
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "blue.400" }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px blue.500",
                      }}
                      pl={12}
                    />
                    <InputRightElement 
                      pointerEvents="none" 
                      h="full"
                      mr={3}
                    >
                      <EmailIcon color="gray.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* Password Field */}
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="600">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "blue.400" }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px blue.500",
                      }}
                      pl={12}
                    />
                    <InputRightElement 
                      h="full"
                      mr={3}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        _hover={{ bg: "transparent" }}
                      >
                        {showPassword ? (
                          <ViewOffIcon color="gray.500" />
                        ) : (
                          <ViewIcon color="gray.500" />
                        )}
                      </Button>
                    </InputRightElement>
                    <InputRightElement 
                      pointerEvents="none" 
                      h="full"
                      mr={12}
                    >
                      <LockIcon color="gray.400" />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* Forgot Password Link */}
                <Box w="full" textAlign="right">
                  <Link
                    color="blue.500"
                    fontSize="sm"
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
                  fontSize="md"
                  fontWeight="600"
                  py={6}
                  borderRadius="lg"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  _hover={{
                    bg: "blue.600",
                    transform: "translateY(-2px)",
                    boxShadow: "lg"
                  }}
                  transition="all 0.3s"
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            {/* Footer */}
            <Box textAlign="center" pt={4}>
              <Text color="gray.600" fontSize="sm">
                Don't have an account?{" "}
                <Link
                  color="blue.500"
                  fontWeight="700"
                  _hover={{ color: "blue.600", textDecoration: "underline" }}
                  onClick={() => navigate("/register")}
                >
                  Create one now
                </Link>
              </Text>
            </Box>

            {/* Demo Credentials Note */}
            <Box
              bg="blue.50"
              p={4}
              borderRadius="lg"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Text fontSize="sm" color="gray.700">
                <Text as="span" fontWeight="700">Demo:</Text> Use any username/password 
                (or create an account)
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Footer */}
        <Box textAlign="center" mt={8}>
          <Text color="gray.500" fontSize="sm">
            © {new Date().getFullYear()} MindSpace. All rights reserved.
          </Text>
          <Text color="gray.400" fontSize="xs" mt={2}>
            Secure login with JWT authentication
          </Text>
        </Box>
      </Container>
    </Flex>
  );
}