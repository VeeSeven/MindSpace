import { HStack, Wrap } from "@chakra-ui/react";
import { TagBadge } from "../../Tags/TagBadge";

export const NoteTags = ({ tags, onTagClick }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <Wrap spacing={1}>
      {tags.slice(0, 3).map(tag => (
        <TagBadge
          key={typeof tag === 'object' ? tag.id : tag}
          tag={tag}
          onClick={onTagClick}
          size="xs"
          maxWidth="100px"
        />
      ))}
      
      {tags.length > 3 && (
        <TagBadge
          tag={`+${tags.length - 3} more`}
          size="xs"
          maxWidth="80px"
          opacity={0.7}
          cursor="default"
        />
      )}
    </Wrap>
  );
};