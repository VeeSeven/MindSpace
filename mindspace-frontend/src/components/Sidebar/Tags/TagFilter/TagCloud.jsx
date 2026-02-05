import { Wrap } from "@chakra-ui/react";
import { TagBadge } from "../TagBadge";

export const TagCloud = ({ 
  tags, 
  selectedTags, 
  onTagClick,
  maxTags = 10 
}) => {
  const displayedTags = tags.slice(0, maxTags);

  return (
    <Wrap spacing={1}>
      {displayedTags.map(tagName => (
        <TagBadge
          key={tagName}
          tag={tagName} 
          onClick={() => onTagClick(tagName)}
          isSelected={selectedTags.includes(tagName)}
          size="sm"
          maxWidth="110px"
        />
      ))}
      
      {tags.length > maxTags && (
        <TagBadge
          tag={`+${tags.length - maxTags} more`}
          size="sm"
          maxWidth="100px"
          opacity={0.7}
          cursor="default"
        />
      )}
    </Wrap>
  );
};