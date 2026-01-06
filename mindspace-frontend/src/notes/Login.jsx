import { useContext } from "react";
import { Button, VStack, Box, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useAuthForm } from "../hooks/useAuthForm";
import { FormContainer } from "../components/auth/FormContainer";
import { FormField, PasswordField } from "../components/auth/FormField";
import { InfoPanel } from "../components/auth/InfoPanel";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { 
    formData, 
    isLoading, 
    showPassword, 
    handleChange, 
    handleSubmit, 
    setShowPassword,
    showToast 
  } = useAuthForm(
    { username: "", password: "" },
    async (data) => {
      const success = await loginUser(data.username, data.password);
      
      if (success) {
        showToast("Welcome back!", "Successfully logged in.", "success");
        navigate("/");
      } else {
        showToast("Login failed", "Invalid username or password.", "error");
      }
    }
  );

  const features = [
    "Rich text editor with real-time collaboration",
    "Auto-save and version history",
    "Organize with tags and folders",
    "Secure cloud storage",
    "Access from any device"
  ];

  return (
    <FormContainer
      title="Organize Your Thoughts with MindSpace"
      subtitle="A beautiful, intuitive workspace for notes, ideas, and collaboration. Everything you need to capture and organize your thoughts."
      footerText="Don't have an account?"
      footerLink={{
        text: "Create one now",
        onClick: () => navigate("/register")
      }}
      colorScheme="blue"
      rightContent={
        <InfoPanel
          title="Why Choose MindSpace?"
          features={features}
          color="blue"
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormField
            label="Username"
            value={formData.username}
            onChange={handleChange("username")}
            placeholder="Enter your username"
          />

          <PasswordField
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

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
    </FormContainer>
  );
}