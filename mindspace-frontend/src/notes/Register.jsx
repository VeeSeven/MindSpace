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
  Progress
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validatePassword = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "green";
    if (passwordStrength >= 50) return "yellow";
    if (passwordStrength >= 25) return "orange";
    return "red";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are identical.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      return;
    }

    if (passwordStrength < 50) {
      toast({
        title: "Weak password",
        description: "Please choose a stronger password.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      return;
    }

    setIsLoading(true);

    const success = await registerUser({ username, password, password2, email });

    if (success) {
      toast({
        title: "Account created successfully! 🎉",
        description: "Welcome to MindSpace! Please login with your credentials.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      });
      navigate("/login");
    } else {
      toast({
        title: "Registration failed",
        description: "Username or email might already exist.",
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
          {/* Left Side - Info */}
          <Box
            flex="1"
            maxW="600px"
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading 
              size="4xl" 
              color="teal.600" 
              fontWeight="800"
              letterSpacing="tight"
              mb={6}
              lineHeight="1.2"
            >
              Start Your Productivity Journey
            </Heading>
            
            <Text fontSize="2xl" color="gray.600" mb={8} lineHeight="1.6">
              Join thousands of users who organize their thoughts, ideas, and projects 
              with MindSpace. Your personal workspace awaits.
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
                <Heading size="lg" color="gray.800">What You'll Get</Heading>
                <Text fontSize="lg" color="gray.600">• Unlimited notes and organization</Text>
                <Text fontSize="lg" color="gray.600">• Rich text editor with markdown support</Text>
                <Text fontSize="lg" color="gray.600">• Real-time auto-save and sync</Text>
                <Text fontSize="lg" color="gray.600">• Tag and folder organization</Text>
                <Text fontSize="lg" color="gray.600">• Access from any device</Text>
              </VStack>
            </Box>
          </Box>

          {/* Right Side - Registration Form */}
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
                    Create Account
                  </Heading>
                  <Text color="gray.500" fontSize="lg">
                    Join MindSpace in seconds
                  </Text>
                </Box>

                {/* Registration Form */}
                <form onSubmit={handleRegister}>
                  <VStack spacing={6}>
                    {/* Username Field */}
                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontWeight="600" fontSize="md" mb={2}>
                        Username
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="lg"
                        height="56px"
                        borderRadius="lg"
                        borderColor="gray.300"
                        _hover={{ borderColor: "teal.400" }}
                        _focus={{
                          borderColor: "teal.500",
                          boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.15)",
                        }}
                        fontSize="md"
                        paddingX={4}
                      />
                    </FormControl>

                    {/* Email Field */}
                    <FormControl>
                      <FormLabel color="gray.700" fontWeight="600" fontSize="md" mb={2}>
                        Email Address (Optional)
                      </FormLabel>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="lg"
                        height="56px"
                        borderRadius="lg"
                        borderColor="gray.300"
                        _hover={{ borderColor: "teal.400" }}
                        _focus={{
                          borderColor: "teal.500",
                          boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.15)",
                        }}
                        fontSize="md"
                        paddingX={4}
                      />
                      <Text fontSize="sm" color="gray.500" mt={2}>
                        For password recovery and notifications
                      </Text>
                    </FormControl>

                    {/* Password Field */}
                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontWeight="600" fontSize="md" mb={2}>
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={password}
                          onChange={handlePasswordChange}
                          size="lg"
                          height="56px"
                          borderRadius="lg"
                          borderColor="gray.300"
                          _hover={{ borderColor: "teal.400" }}
                          _focus={{
                            borderColor: "teal.500",
                            boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.15)",
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
                      
                      {/* Password Strength */}
                      {password && (
                        <Box mt={4}>
                          <Box display="flex" justifyContent="space-between" mb={2}>
                            <Text fontSize="md" color="gray.600" fontWeight="600">
                              Password strength:
                            </Text>
                            <Text 
                              fontSize="md" 
                              fontWeight="700"
                              color={
                                passwordStrength >= 75 ? "green.600" : 
                                passwordStrength >= 50 ? "yellow.600" : 
                                passwordStrength >= 25 ? "orange.600" : "red.600"
                              }
                            >
                              {passwordStrength >= 75 ? "Strong" : 
                               passwordStrength >= 50 ? "Moderate" : 
                               passwordStrength >= 25 ? "Weak" : "Very weak"}
                            </Text>
                          </Box>
                          <Progress 
                            value={passwordStrength} 
                            size="md" 
                            colorScheme={getPasswordStrengthColor()}
                            borderRadius="full"
                            height="8px"
                          />
                          <Text fontSize="sm" color="gray.500" mt={3}>
                            • At least 8 characters<br/>
                            • Include uppercase & lowercase letters<br/>
                            • Include numbers & symbols
                          </Text>
                        </Box>
                      )}
                    </FormControl>

                    {/* Confirm Password Field */}
                    <FormControl isRequired>
                      <FormLabel color="gray.700" fontWeight="600" fontSize="md" mb={2}>
                        Confirm Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter your password"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                          size="lg"
                          height="56px"
                          borderRadius="lg"
                          borderColor="gray.300"
                          _hover={{ borderColor: "teal.400" }}
                          _focus={{
                            borderColor: "teal.500",
                            boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.15)",
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            _hover={{ bg: "transparent" }}
                            h="100%"
                            w="100%"
                          >
                            {showConfirmPassword ? (
                              <ViewOffIcon color="gray.500" boxSize={5} />
                            ) : (
                              <ViewIcon color="gray.500" boxSize={5} />
                            )}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {password && password2 && password !== password2 && (
                        <Text color="red.500" fontSize="sm" mt={2}>
                          ✗ Passwords do not match
                        </Text>
                      )}
                    </FormControl>

                    {/* Terms */}
                    <Box 
                      p={5} 
                      bg="gray.50" 
                      borderRadius="lg" 
                      border="1px solid" 
                      borderColor="gray.200"
                      mt={4}
                    >
                      <Text fontSize="md" color="gray.600">
                        By creating an account, you agree to our{" "}
                        <Link color="teal.500" fontWeight="700">Terms of Service</Link>{" "}
                        and{" "}
                        <Link color="teal.500" fontWeight="700">Privacy Policy</Link>.
                      </Text>
                    </Box>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      w="full"
                      colorScheme="teal"
                      size="lg"
                      height="56px"
                      fontSize="lg"
                      fontWeight="600"
                      borderRadius="lg"
                      isLoading={isLoading}
                      loadingText="Creating account..."
                      _hover={{
                        bg: "teal.600",
                        transform: "translateY(-2px)",
                        boxShadow: "xl"
                      }}
                      transition="all 0.3s"
                      mt={6}
                    >
                      Create Account
                    </Button>
                  </VStack>
                </form>

                {/* Already have account */}
                <Box textAlign="center" pt={6}>
                  <Text color="gray.600" fontSize="lg">
                    Already have an account?{" "}
                    <Link
                      color="teal.500"
                      fontWeight="700"
                      fontSize="lg"
                      _hover={{ color: "teal.600", textDecoration: "underline" }}
                      onClick={() => navigate("/login")}
                    >
                      Sign in here
                    </Link>
                  </Text>
                </Box>

                {/* Features Note */}
                <Box
                  p={5}
                  bg="teal.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="teal.200"
                  textAlign="center"
                >
                  <Text fontSize="md" color="teal.700" fontWeight="600" mb={2}>
                    ✨ All features are free for personal use
                  </Text>
                  <Box display="flex" justifyContent="center" flexWrap="wrap" gap={4} mt={3}>
                    <Text fontSize="md" color="teal.600">✓ Unlimited notes</Text>
                    <Text fontSize="md" color="teal.600">✓ Rich editor</Text>
                    <Text fontSize="md" color="teal.600">✓ Auto-save</Text>
                    <Text fontSize="md" color="teal.600">✓ Cloud sync</Text>
                  </Box>
                </Box>
              </VStack>
            </Box>

            {/* Footer */}
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
}