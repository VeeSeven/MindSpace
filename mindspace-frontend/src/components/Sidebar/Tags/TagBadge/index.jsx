import { Tag, TagLabel, TagCloseButton, Tooltip } from "@chakra-ui/react";
import { TagColor } from "./TagColor";

export const TagBadge = ({ 
  tag, 
  onClick, 
  onRemove, 
  size = "sm", 
  isSelected = false,
  showRemove = false,
  showCount = false,
  maxWidth = "120px",
  ...props
}) => {
  if (!tag) return null;
  const tagName = typeof tag === 'object' ? tag.name : tag;
  const tagId = typeof tag === 'object' ? tag.id : tag; 
  const tagColor = typeof tag === 'object' ? tag.color : 'gray';
  const noteCount = typeof tag === 'object' ? (tag.note_count || 0) : 0;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) onClick(tag);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove(tag);
  };

  const content = (
    <Tag
      key={tagId} 
      size={size}
      colorScheme={isSelected ? "blue" : "gray"}
      bg={tagColor && !isSelected ? TagColor.getBg(tagColor) : undefined}
      color={tagColor && !isSelected ? TagColor.getColor(tagColor) : undefined}
      border={isSelected ? "2px solid" : "1px solid"}
      borderColor={isSelected ? "blue.400" : "gray.200"}
      cursor={onClick ? "pointer" : "default"}
      maxWidth={maxWidth}
      onClick={handleClick}
      _hover={{
        transform: onClick ? "translateY(-1px)" : "none",
        boxShadow: onClick ? "sm" : "none",
        bg: onClick && !isSelected 
          ? (tagColor ? TagColor.getHoverBg(tagColor) : "gray.100") 
          : undefined,
      }}
      transition="all 0.2s ease"
      {...props}
    >
      <TagLabel isTruncated>
        {tagName}
        {showCount && noteCount > 0 && ` (${noteCount})`}
      </TagLabel>
      
      {showRemove && onRemove && (
        <TagCloseButton 
          onClick={handleRemove}
          _hover={{ bg: "red.100", color: "red.600" }}
        />
      )}
    </Tag>
  );

  if (showCount) {
    return (
      <Tooltip 
        label={`${noteCount} note${noteCount !== 1 ? 's' : ''} tagged`}
        placement="top"
        hasArrow
      >
        {content}
      </Tooltip>
    );
  }

  return content;
};