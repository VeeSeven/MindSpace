import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup size="md">
      <Input
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        bg="white"
      />
      <InputRightElement>
        <SearchIcon color="gray.400" />
      </InputRightElement>
    </InputGroup>
  );
};