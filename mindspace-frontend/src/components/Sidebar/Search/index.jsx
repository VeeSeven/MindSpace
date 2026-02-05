import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup size="md">
      <InputLeftElement pointerEvents="none">
        <FiSearch color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        bg="white"
        borderColor="gray.300"
      />
    </InputGroup>
  );
};