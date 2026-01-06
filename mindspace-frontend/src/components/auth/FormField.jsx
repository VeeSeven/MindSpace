import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Box,
  Progress
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  isRequired = true,
  isPassword = false,
  showPassword,
  onTogglePassword,
  helperText,
  ...props
}) => {
  return (
    <FormControl isRequired={isRequired} {...props}>
      <FormLabel color="gray.700" fontWeight="600" fontSize="md" mb={2}>
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
          paddingRight={isPassword ? "60px" : "4"}
          {...props}
        />
        {isPassword && (
          <InputRightElement height="56px" width="4.5rem">
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePassword}
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
        )}
      </InputGroup>
      {helperText && (
        <Text fontSize="sm" color="gray.500" mt={2}>
          {helperText}
        </Text>
      )}
    </FormControl>
  );
};

export const PasswordField = ({
  label,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  showStrength = false,
  strength = 0,
  ...props
}) => {
  const getStrengthColor = () => {
    if (strength >= 75) return "green";
    if (strength >= 50) return "yellow";
    if (strength >= 25) return "orange";
    return "red";
  };

  const getStrengthText = () => {
    if (strength >= 75) return "Strong";
    if (strength >= 50) return "Moderate";
    if (strength >= 25) return "Weak";
    return "Very weak";
  };

  return (
    <Box>
      <FormField
        label={label}
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        isPassword={true}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        {...props}
      />
      
      {showStrength && value && (
        <Box mt={4}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Text fontSize="md" color="gray.600" fontWeight="600">
              Password strength:
            </Text>
            <Text 
              fontSize="md" 
              fontWeight="700"
              color={
                strength >= 75 ? "green.600" : 
                strength >= 50 ? "yellow.600" : 
                strength >= 25 ? "orange.600" : "red.600"
              }
            >
              {getStrengthText()}
            </Text>
          </Box>
          <Progress 
            value={strength} 
            size="md" 
            colorScheme={getStrengthColor()}
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
    </Box>
  );
};