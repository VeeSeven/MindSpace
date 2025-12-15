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
  Progress,
  Divider,
  Icon,
  FormErrorMessage,
  Tooltip
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon, AtSignIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
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
      bgGradient="linear(to-br, green.50, teal.50)"
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
            {/* Header */}
            <VStack spacing={3}>
              <Heading 
                size="xl" 
                color="teal.600" 
                fontWeight="800"
                letterSpacing="tight"
              >
                Join MindSpace
              </Heading>
              <Text color="gray.500" fontSize="md" textAlign="center">
                Create your account and start organizing your thoughts
              </Text>
            </VStack>

            <Divider />

            {/* Registration Form */}
            <form onSubmit={handleRegister}>
              <VStack spacing={5}>
                {/* Username Field */}
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="600">
                    Username
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "teal.400" }}
                      _focus={{
                        borderColor: "teal.500",
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                      pl={12}
                    />
                    <InputRightElement 
                      pointerEvents="none" 
                      children={<Icon as={FaUser} color="gray.400" />}
                      h="full"
                      mr={3}
                    />
                  </InputGroup>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    This will be your unique identifier
                  </Text>
                </FormControl>

                {/* Email Field */}
                <FormControl>
                  <FormLabel color="gray.700" fontWeight="600">
                    Email Address (Optional)
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "teal.400" }}
                      _focus={{
                        borderColor: "teal.500",
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                      pl={12}
                    />
                    <InputRightElement 
                      pointerEvents="none" 
                      children={<EmailIcon color="gray.400" />}
                      h="full"
                      mr={3}
                    />
                  </InputGroup>
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    For password recovery and notifications
                  </Text>
                </FormControl>

                {/* Password Field */}
                <FormControl isRequired>
                  <FormLabel color="gray.700" fontWeight="600">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={handlePasswordChange}
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "teal.400" }}
                      _focus={{
                        borderColor: "teal.500",
                        boxShadow: "0 0 0 1px teal.500",
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
                      children={<LockIcon color="gray.400" />}
                      h="full"
                      mr={12}
                    />
                  </InputGroup>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <Box mt={2}>
                      <Progress 
                        value={passwordStrength} 
                        size="sm" 
                        colorScheme={getPasswordStrengthColor()}
                        borderRadius="full"
                      />
                      <Text fontSize="xs" color="gray.500" mt={1}>
                        {passwordStrength >= 75 ? "Strong" : 
                         passwordStrength >= 50 ? "Moderate" : 
                         passwordStrength >= 25 ? "Weak" : "Very weak"}
                      </Text>
                    </Box>
                  )}
                  
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    • At least 8 characters<br/>
                    • Include uppercase & lowercase<br/>
                    • Include numbers & symbols
                  </Text>
                </FormControl>

                {/* Confirm Password Field */}
                <FormControl isRequired isInvalid={password && password2 && password !== password2}>
                  <FormLabel color="gray.700" fontWeight="600">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "teal.400" }}
                      _focus={{
                        borderColor: "teal.500",
                        boxShadow: "0 0 0 1px teal.500",
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        _hover={{ bg: "transparent" }}
                      >
                        {showConfirmPassword ? (
                          <ViewOffIcon color="gray.500" />
                        ) : (
                          <ViewIcon color="gray.500" />
                        )}
                      </Button>
                    </InputRightElement>
                    <InputRightElement 
                      pointerEvents="none" 
                      children={<LockIcon color="gray.400" />}
                      h="full"
                      mr={12}
                    />
                  </InputGroup>
                  {password && password2 && password !== password2 && (
                    <FormErrorMessage>
                      Passwords do not match
                    </FormErrorMessage>
                  )}
                </FormControl>

                {/* Terms & Conditions */}
                <Box 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="lg" 
                  border="1px solid" 
                  borderColor="gray.200"
                >
                  <Text fontSize="sm" color="gray.600">
                    By creating an account, you agree to our{" "}
                    <Link color="teal.500" fontWeight="600">Terms of Service</Link>{" "}
                    and{" "}
                    <Link color="teal.500" fontWeight="600">Privacy Policy</Link>.
                  </Text>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  w="full"
                  colorScheme="teal"
                  size="lg"
                  fontSize="md"
                  fontWeight="600"
                  py={6}
                  borderRadius="lg"
                  isLoading={isLoading}
                  loadingText="Creating account..."
                  isDisabled={passwordStrength < 50}
                  _hover={{
                    bg: "teal.600",
                    transform: "translateY(-2px)",
                    boxShadow: "lg"
                  }}
                  transition="all 0.3s"
                >
                  Create Account
                </Button>
              </VStack>
            </form>

            {/* Already have account */}
            <Box textAlign="center" pt={4}>
              <Text color="gray.600" fontSize="sm">
                Already have an account?{" "}
                <Link
                  color="teal.500"
                  fontWeight="700"
                  _hover={{ color: "teal.600", textDecoration: "underline" }}
                  onClick={() => navigate("/login")}
                >
                  Sign in here
                </Link>
              </Text>
            </Box>

            {/* Features List */}
            <Box
              bg="teal.50"
              p={4}
              borderRadius="lg"
              borderLeft="4px solid"
              borderColor="teal.400"
            >
              <Heading size="sm" color="teal.700" mb={2}>
                What you get with MindSpace:
              </Heading>
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" color="teal.600">✓ Rich text editor with formatting</Text>
                <Text fontSize="sm" color="teal.600">✓ Organize notes with tags</Text>
                <Text fontSize="sm" color="teal.600">✓ Auto-save functionality</Text>
                <Text fontSize="sm" color="teal.600">✓ Secure cloud storage</Text>
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Footer */}
        <Box textAlign="center" mt={8}>
          <Text color="gray.500" fontSize="sm">
            © {new Date().getFullYear()} MindSpace. All rights reserved.
          </Text>
          <Text color="gray.400" fontSize="xs" mt={2}>
            Your data is encrypted and secure
          </Text>
        </Box>
      </Container>
    </Flex>
  );
}