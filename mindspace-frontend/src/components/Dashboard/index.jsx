import { Box, Flex } from "@chakra-ui/react";
import Topbar from "../Topbar";
import { DashboardContent } from "./DashboardContent";

export default function Dashboard() {
  return (
    <Box 
      minHeight="100vh" 
      bgGradient="linear(to-br, gray.50, blue.50)"
      overflow="hidden"
    >
      <Topbar />
      
      <Flex pt="60px" height="calc(100vh - 60px)">
        <DashboardContent />
      </Flex>
    </Box>
  );
}