import { VStack, Box } from "@chakra-ui/react";
import { NoteListItem } from "../NoteListItem";

export const NoteTree = ({ 
  filteredTree, 
  selectedNoteId, 
  onSelectNote, 
  onRenameNote, 
  onDeleteNote,
  expandedFolders = [], 
  onToggleExpand,
  onCreateNote,
  onTagClick,
}) => {

  if (!filteredTree || !Array.isArray(filteredTree) || filteredTree.length === 0) {
    return null;
  }

  const safeExpandedFolders = Array.isArray(expandedFolders) ? expandedFolders : [];

  const renderTree = (items, depth = 0) => {
    if (!items || !Array.isArray(items)) return null;
    
    return items.map(item => {
      if (!item || !item.id) return null;
      
      const isExpanded = safeExpandedFolders.includes(item.id);
      const hasChildren = item.children && Array.isArray(item.children) && item.children.length > 0;
      
      return (
        <Box key={item.id}>
          <NoteListItem
            note={item}
            isSelected={selectedNoteId === item.id}
            onSelect={onSelectNote}
            onRename={onRenameNote}
            onDelete={onDeleteNote}
            depth={depth}
            isExpanded={isExpanded}
            onToggleExpand={() => onToggleExpand && onToggleExpand(item.id)}
            children={item.children || []}
            onAddChildNote={onCreateNote}
            onTagClick={onTagClick}
          />
          
          {isExpanded && hasChildren && (
            <Box ml={`${(depth + 1) * 20}px`}>
              {renderTree(item.children, depth + 1)}
            </Box>
          )}
        </Box>
      );
    });
  };

  return (
    <VStack align="stretch" spacing={1}>
      {renderTree(filteredTree)}
    </VStack>
  );
};