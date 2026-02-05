import { HStack, Select, Text } from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

export const SearchFilters = ({ 
  sortBy, 
  setSortBy,
  sortOrder, 
  setSortOrder 
}) => {
  return (
    <HStack spacing={3}>
      <HStack spacing={1} align="center">
        <FiFilter size="14px" color="#718096" />
        <Text fontSize="xs" color="gray.600">Sort:</Text>
      </HStack>
      
      <Select 
        size="xs" 
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        width="120px"
      >
        <option value="updated_at">Last Updated</option>
        <option value="created_at">Created Date</option>
        <option value="title">Title</option>
      </Select>
      
      <Select 
        size="xs" 
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        width="90px"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </Select>
    </HStack>
  );
};