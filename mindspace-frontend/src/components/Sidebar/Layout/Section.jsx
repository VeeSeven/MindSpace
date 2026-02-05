import { Box, Collapse, Button, HStack } from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

export const Section = ({ 
  title = "",
  children, 
  collapsible = false, 
  defaultCollapsed = false,
  ...props 
}) => {
  if (!props) {
    console.error("Section component called without props");
    return null;
  }
  
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <Box {...props}>
      {title && (
        <HStack 
          spacing={2} 
          mb={2} 
          cursor={collapsible ? "pointer" : "default"}
          onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
          _hover={collapsible ? { opacity: 0.8 } : undefined}
        >
          {collapsible && (
            isCollapsed ? <FiChevronRight size="14px" /> : <FiChevronDown size="14px" />
          )}
          <span 
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#4a5568",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}
          >
            {title}
          </span>
        </HStack>
      )}
      
      <Collapse in={!isCollapsed}>
        {children}
      </Collapse>
    </Box>
  );
};