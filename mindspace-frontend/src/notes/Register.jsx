import { useContext } from "react";
import { Button, VStack, Box, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useAuthForm } from "../hooks/useAuthForm";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
import { FormContainer } from "../components/auth/FormContainer";
import { FormField, PasswordField } from "../components/auth/FormField";
import { InfoPanel } from "../components/auth/InfoPanel";
import { FormCard } from "../components/auth/FormContainer";

export default function Register() {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { strength, calculateStrength } = usePasswordStrength();

  const { 
    formData, 
    isLoading, 
    showPassword, 
    showConfirmPassword, 
    handleChange, 
    handleSubmit, 
    setShowPassword,
    setShowConfirmPassword,
    showToast,
    setFormData
  } = useAuthForm(
    { username: "", email: "", password: "", password2: "" },
    async (data) => {
      if (data.password !== data.password2) {
        showToast("Passwords don't match", "Please make sure both passwords are identical.", "error");
        return;
      }

      if (strength < 50) {
        showToast("Weak password", "Please choose a stronger password.", "warning");
        return;
      }

      const success = await registerUser(data);

      if (success) {
        showToast("Account created successfully! 🎉", "Welcome to MindSpace! Please login with your credentials.", "success");
        navigate("/login");
      } else {
        showToast("Registration failed", "Username or email might already exist.", "error");
      }
    }
  );

  const handlePasswordChange = (e) => {
    handleChange("password")(e);
    calculateStrength(e.target.value);
  };

  const features = [
    "Unlimited notes and organization",
    "Rich text editor with markdown support",
    "Real-time auto-save and sync",
    "Tag and folder organization",
    "Access from any device"
  ];

  return (
    <FormContainer
      title="Start Your Productivity Journey"
      subtitle="Join thousands of users who organize their thoughts, ideas, and projects with MindSpace. Your personal workspace awaits."
      footerText="Already have an account?"
      footerLink={{
        text: "Sign in here",
        onClick: () => navigate("/login")
      }}
      colorScheme="teal"
      rightContent={
        <InfoPanel
          title="What You'll Get"
          features={features}
          color="teal"
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormField
            label="Username"
            value={formData.username}
            onChange={handleChange("username")}
            placeholder="Choose a username"
          />

          <FormField
            label="Email Address"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            isRequired={false}
            type="email"
            helperText="For password recovery and notifications"
          />

          <PasswordField
            label="Password"
            value={formData.password}
            onChange={handlePasswordChange}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            showStrength={true}
            strength={strength}
          />

          <PasswordField
            label="Confirm Password"
            value={formData.password2}
            onChange={handleChange("password2")}
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            helperText={formData.password && formData.password2 && formData.password !== formData.password2 ? "✗ Passwords do not match" : ""}
          />

          <FormCard>
            <Text fontSize="md" color="gray.600">
              By creating an account, you agree to our{" "}
              <Link color="teal.500" fontWeight="700">Terms of Service</Link>{" "}
              and{" "}
              <Link color="teal.500" fontWeight="700">Privacy Policy</Link>.
            </Text>
          </FormCard>

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
    </FormContainer>
  );
}