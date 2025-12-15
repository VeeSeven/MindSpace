import {
  Flex,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Topbar() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Flex
      height="60px"
      width="100%"
      bg="white"
      color="gray.800"
      alignItems="center"
      justifyContent="space-between"
      px="6"
      position="fixed"
      top="0"
      left="0"
      zIndex="100"
      boxShadow="sm"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      {/* Left: App Name */}
      <Text fontSize="xl" fontWeight="bold" letterSpacing="wide">
        MindSpace
      </Text>

      {/* Right: User Dropdown */}
      <Menu>
        <MenuButton>
          <HStack spacing={2}>
            <Avatar size="sm" name={user?.username} bg="blue.500" />
            <Text fontWeight="medium">{user?.username}</Text>
            <ChevronDownIcon />
          </HStack>
        </MenuButton>

        <MenuList
          bg="white"
          color="gray.800"
          borderRadius="md"
          boxShadow="lg"
          minW="200px"
          py="2"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack align="stretch" spacing={1}>
            <Box px="3" py="2">
              <Text fontWeight="bold">Account</Text>
              <Text fontSize="sm" color="gray.600">
                {user?.email}
              </Text>
            </Box>

            <Divider borderColor="gray.200" />

            <MenuItem
              _hover={{ bg: "gray.100" }}
              onClick={() => alert("Profile feature coming soon!")}
            >
              Profile
            </MenuItem>

            <MenuItem
              _hover={{ bg: "red.50", color: "red.600" }}
              onClick={logoutUser}
            >
              Logout
            </MenuItem>
          </VStack>
        </MenuList>
      </Menu>
    </Flex>
  );
}